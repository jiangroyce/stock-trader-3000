from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, Order, db
from app.forms import OrderForm
import pandas as pd

order_routes = Blueprint('orders', __name__)

@order_routes.route("/current", methods=["POST"])
@login_required
def place_order():
    """
    Place a new order to current user's portfolio
    """
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        portfolio = Portfolio.query.get(current_user.id)
        order_number = portfolio.order_number
        cost = form.data["cost_basis"] * form.data["quantity"]
        if abs(cost) > portfolio.cash:
            return {'message': 'Bad Request', 'errors': f"Order Value of {'${:,.2f}'.format(cost)} exceeds purchasing power"}, 403
        newOrder = Order(
            portfolio_id=portfolio.id,
            stock_ticker=form.data["stock_ticker"],
            order_number=order_number,
            cost_basis=form.data["cost_basis"],
            quantity=form.data["quantity"]
        )
        db.session.add(newOrder)
        portfolio.order_number += 1
        portfolio.cash -= cost
        db.session.commit()
        return jsonify(newOrder.to_dict())
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@order_routes.route("/current")
@login_required
def get_orders():
    orders = Order.query.filter_by(portfolio_id=current_user.id).all()
    response = sorted([order.to_dict() for order in orders], key=lambda d: d["order_number"], reverse=True)
    return jsonify({"orders": response})
