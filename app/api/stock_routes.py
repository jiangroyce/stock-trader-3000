from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, Order
import pandas as pd

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route("/<ticker>")
@login_required
def getStock(ticker):
    """
    Get Details for given Stock
    """
    stock = Stock.query.get(ticker)
    return jsonify(stock.full_details())

@stock_routes.route("/all")
@login_required
def getAllStock():
    """
    Get All Stocks
    """
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks])
