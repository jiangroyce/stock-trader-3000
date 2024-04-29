from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, Order, Transfer, Stock, db
from app.forms import CashForm
import pandas as pd
import numpy as np
import json

portfolio_routes = Blueprint('portfolios', __name__)

def get_portfolio(portfolio):
    data_columns=["ticker", "name", "price", "cost_basis", "quantity"]
    data = [(order.stock_ticker, order.stock.name, order.stock.price, order.cost_basis, order.quantity) for order in portfolio.orders]
    data = pd.DataFrame(data, columns=data_columns)
    return data
def calc_response(portfolio):
    data = get_portfolio(portfolio)
    response_columns = data.columns.to_list() + ["value", "GL$", "GL%", "portfolio_weight"]
    if data.empty:
        cash = ("-", "Cash", 1, 1, portfolio.cash, portfolio.cash, 0, 0, 1)
        totals = ("-", "Total", 0, 0, 0, portfolio.cash, 0, 0, 1)
        totals = pd.DataFrame([cash, totals], columns=response_columns)
        return totals
    else:
        response = []
        cost = 0
        for ticker, group in data.groupby("ticker"):
            group["cost"] = group["cost_basis"] * group["quantity"]
            if group["quantity"].sum() == 0:
                continue
            avg_cost = group["cost"].sum() / group["quantity"].sum()
            cost += group["cost"].sum()
            response.append((ticker, group.name.iloc[0], group.price.iloc[0], avg_cost, group.quantity.sum()))
        response.append(("-", "Cash", 1, 1, portfolio.cash))
        cost += portfolio.cash
        response = pd.DataFrame(response, columns=data.columns)
        response["value"] = response["price"] * response["quantity"]
        response["GL$"] = (response["price"] - response["cost_basis"]) * response["quantity"]
        response["GL%"] = response["price"]/response["cost_basis"] - 1
        response["portfolio_weight"] = response["value"]/response["value"].sum()
        response.loc[response.name == "Cash", "GL$"] = 0
        response.loc[response.name == "Cash", "GL%"] = 0
        sums = response.sum(numeric_only=True)
        totals = ("-", "Total", 0, 0, 0, sums.value, sums["GL$"], sums.value/cost-1, sums.portfolio_weight)
        portfolio.value = sums.value
        db.session.commit()
        totals = pd.DataFrame([totals], columns=response.columns)
        final = pd.concat([response, totals])
        return final
def calc_history(portfolio):
    data_columns = ["Date", "ticker", "cost_basis", "quantity"]
    orders = pd.DataFrame([(order.createdAt, order.stock_ticker, order.cost_basis, order.quantity) for order in portfolio.orders], columns=data_columns)
    transfers = [(transfer.createdAt, transfer.quantity) for transfer in portfolio.transfers]
    start_date = transfers[0][0]
    transfers = pd.DataFrame(transfers, columns=["Date", 'quantity'])
    stocks = list(set(order.stock_ticker for order in portfolio.orders))
    stock_data = pd.DataFrame()
    for stock in stocks:
        data = pd.DataFrame(Stock.query.get(stock).history)
        data = data.loc[pd.to_datetime(data["Date"]) >= start_date]
        stock_data["Date"] = data.Date
        stock_data[stock] = data.Close
    for i, order in orders.iterrows():
        ticker = order.ticker
        stock_data.loc[stock_data["Date"] == order.Date.strftime("%Y-%m-%d"), f"{ticker}_quantity"] = order.quantity
    for i, transfer in transfers.iterrows():
        stock_data.loc[stock_data["Date"] == transfer.Date.strftime("%Y-%m-%d"), f"cash"] = transfer.quantity
    for stock in stocks:
        stock_data[f"{stock}_order"] = stock_data[stock] * -stock_data[f"{stock}_quantity"]
        stock_data[f"{stock}_gl"] = stock_data[stock].diff(1)
        stock_data[f"{stock}_return"] = np.log(stock_data[stock]/stock_data[stock].shift(1))
    stock_data = stock_data.fillna(0)
    for stock in stocks:
        stock_data[f"{stock}_cost_basis"] = stock_data[f"{stock}_order"].cumsum()
    quantity_columns = [col for col in stock_data.columns if 'quantity' in col]
    stock_data[quantity_columns] = stock_data[quantity_columns].cumsum() # updating quantity
    order_columns = [col for col in stock_data.columns if 'order' in col]
    change_columns = quantity_columns + order_columns + ["cash"]
    total_cash = 0
    total_value = 0
    for i, row in stock_data.iterrows():
        row_value = 0
        row_gl = 0
        row_cost_basis = 0
        if row[change_columns].any():
            total_cash += row.cash
            for stock in stocks:
                total_cash += row[f"{stock}_order"]
                row[f"{stock}_value"] = row[stock] * row[f"{stock}_quantity"]
                row_value += row[f"{stock}_value"]
                row_gl += row[f"{stock}_gl"] * row[f"{stock}_quantity"]
                row_cost_basis += min(row[f"{stock}_cost_basis"], 0)
            total_value = total_cash + row_value
        stock_data.loc[i, "total_cash"] = total_cash
        stock_data.loc[i, "value"] = row_value
        stock_data.loc[i, "total"] = total_value
        stock_data.loc[i, "gl"] = row_gl
        stock_data.loc[i, "cost_basis"] = row_cost_basis
    stock_data["cum_gl"] = stock_data["gl"].cumsum()
    stock_data["cum_ret"] = stock_data["value"]/-stock_data["cost_basis"] - 1
    portfolio.history = stock_data
    db.session.commit()
    return stock_data
@portfolio_routes.route("/current")
@login_required
def portfolio():
    """
    Get all positions in current user's portfolio
    """
    portfolio = Portfolio.query.get(current_user.id)
    response = calc_response(portfolio)
    return response.to_json(orient="records")

@portfolio_routes.route("/current/value")
@login_required
def getValue():
    """
    Get Current User's Portfolio Value
    """
    portfolio = Portfolio.query.get(current_user.id)
    # response = calc_response(portfolio)
    return jsonify({"portfolio_value" : portfolio.value})

@portfolio_routes.route("/current/cash")
@login_required
def getCash():
    """
    Get Current User's Portfolio Cash Value
    """
    portfolio = Portfolio.query.get(current_user.id)
    return jsonify({"purchasing_power": portfolio.cash})

@portfolio_routes.route("/current/transfer", methods=["POST"])
@login_required
def addCash():
    """
    Get Current User's Portfolio Cash Value
    """
    portfolio = Portfolio.query.get(current_user.id)
    form = CashForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newTransfer = Transfer(portfolio_id=portfolio.id, quantity=form.data["quantity"])
        portfolio.cash += form.data["quantity"]
        db.session.add(newTransfer)
        db.session.commit()
        return jsonify({"purchasing_power": portfolio.cash})
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@portfolio_routes.route("/current/transfers")
@login_required
def getTransfers():
    """
    Get Current User's Transfer History
    """
    transfers = Transfer.query.filter_by(portfolio_id=current_user.id).all()
    response = sorted([transfer.to_dict() for transfer in transfers], key=lambda d: d["id"])
    return jsonify({"transfers": response})

@portfolio_routes.route("/current/<ticker>")
@login_required
def getShares(ticker):
    """
    Get # Shares of ticker in Current User's Portfolio
    """
    portfolio = Portfolio.query.get(current_user.id)
    data = calc_response(portfolio)
    response = data.loc[data.ticker==ticker, "quantity"]
    if response.empty:
        return jsonify({ticker: 0})
    else:
        return jsonify({ticker: response.iloc[0]})

@portfolio_routes.route("/current/history")
@login_required
def getHistory():
    """
    Get all positions in current user's portfolio
    """
    portfolio = Portfolio.query.get(current_user.id)
    if portfolio.history:
        response = pd.DataFrame(json.loads(portfolio.history))
    else:
        try:
            response = calc_history(portfolio)
        except Exception as e:
            print(str(e))
            return jsonify({"errors": str(e), "history": []})
    formated_res = response[["Date", "cum_gl", "cum_ret", "value", "gl"]]
    day_gl = response.iloc[-1].gl
    value = response.iloc[-1].value
    day_ret = day_gl/value
    cash = response.iloc[-1].total_cash
    return {"history": formated_res.to_json(orient="records"), "gl": day_gl, "value": value, "ret": day_ret, "cash": cash}
