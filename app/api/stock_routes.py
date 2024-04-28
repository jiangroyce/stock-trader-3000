from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, Order
import pandas as pd
import yfinance as yf
import datetime as dt
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

@stock_routes.route("/<ticker>/data")
@login_required
def getStockData(ticker):
    """
    Get YF Data for given Stock
    """
    stock = yf.Ticker(ticker)
    # daily = stock.history(period="1d", interval="1m")
    # weekly = stock.history(period="5d", interval="60m")
    news = stock.news
    # response = {"1d": daily.to_json(orient="records"), "1w": weekly.to_json(orient="records"), "news": {}}
    response = {"news" : {}}
    for article in news:
        if article["publisher"] in ["Motley Fool", "Insider Monkey"]:
            continue
        formatted_article = {}
        formatted_article["title"] = article["title"]
        formatted_article["publisher"] = article["publisher"]
        formatted_article["link"] = article["link"]
        formatted_article["date"] = dt.datetime.fromtimestamp(article["providerPublishTime"]).strftime("%Y-%m-%d")
        try:
            formatted_article["thumbnail"] = article["thumbnail"]["resolutions"][1]["url"]
        except:
            formatted_article["thumbnail"] = None
        response["news"][article["uuid"]] = formatted_article
    response["news"] = list(response["news"].values())
    return jsonify(response)
