from flask import Blueprint, jsonify
from flask_login import login_required
import yfinance as yf
import datetime as dt
from app.models import Market

market_routes = Blueprint('markets', __name__)

@market_routes.route("/all")
@login_required
def getAllMarkets():
    """
    Get All Markets
    """
    markets = Market.query.all()
    return jsonify([market.to_dict() for market in markets][:4])

@market_routes.route("/news")
@login_required
def getMktNews():
    """
    Get News for Markets
    """
    markets = ["^GSPC", "^IXIC", "^DJI", "^RUT"]
    response = {}
    for market in markets:
        res = yf.Ticker(market)
        for article in res.news:
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
            response[article["uuid"]] = formatted_article
    return jsonify(list(response.values()))
