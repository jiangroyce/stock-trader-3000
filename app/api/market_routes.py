from flask import Blueprint, jsonify
from flask_login import login_required
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
