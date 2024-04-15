from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, Order, Transfer, Stock, db
from app.forms import CashForm
import pandas as pd

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
        cash = ("-", "Cash", portfolio.cash, 1, 1, portfolio.cash, 0, 0, 1)
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
        response.append(("-", "Cash", portfolio.cash, 1, 1))
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
        totals = pd.DataFrame([totals], columns=response.columns)
        final = pd.concat([response, totals])
        return final
def getHistory(portfolio):
    data_columns = ["date", "ticker", "cost_basis", "quantity"]
    orders = pd.DataFrame([(order.createdAt, order.stock_ticker, order.cost_basis, order.quantity) for order in portfolio.orders], columns=data_columns)
    transfers = [(transfer.createdAt, transfer.quantity) for transfer in portfolio.transfers]
    start_date = transfers[0][0]
    stocks = list[set(order.stock_ticker for order in portfolio.orders)]
    stock_data = pd.DataFrame()
    for stock in stocks:
        data = pd.DataFrame(Stock.query.get(stock).history)
        data = data.loc[pd.to_datetime(data["Date"]) >= start_date]
        stock_data["Date"] = data.Date
        stock_data[stock] = data.Close

    result_columns = ["date", "portfolio_value"]
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
    response = calc_response(portfolio)
    return response.to_json(orient="records")
