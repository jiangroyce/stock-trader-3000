from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, Order
import pandas as pd
from sqlalchemy import and_

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

@stock_routes.route("/sectors")
@login_required
def getAllSectors():
    """
    Get All Sectors
    """
    stocks = Stock.query.all()
    sectors = set([stock.sector for stock in stocks])
    return jsonify(list(sectors))

@stock_routes.route("/movers")
@login_required
def getDailyMovers():
    """
    Gets Daily Movers
    """
    stocks=Stock.query.all()
    stocks.sort(key=lambda stock: stock.past_day_return, reverse=True)
    winners = stocks[0:5]
    losers = stocks[-6:-1]
    return jsonify({"winners": [stock.to_dict() for stock in winners], "losers": [stock.to_dict() for stock in losers]})
