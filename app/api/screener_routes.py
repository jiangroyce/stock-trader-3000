from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, Screener
from sqlalchemy import and_
import pandas as pd

screener_routes = Blueprint('screener', __name__)

@screener_routes.route("/current")
@login_required
def getScreeners():
    """
    Get All Screeners of Current user
    """
    screeners = Screener.query.filter_by(user_id=current_user.id).all()
    defaults = Screener.query.filter_by(user_id=1).all()
    screeners.extend(defaults)
    return jsonify([screener.to_dict() for screener in screeners])

@screener_routes.route("/apply/<int:id>")
@login_required
def applyScreener(id):
    screener = Screener.query.get(id)
    conditions = []

    def floatConditions(key, value):
        ps = value.split(" ")
        op = ps[0] # < >
        cond = float(ps[1])
        if op == ">":
            conditions.append((getattr(Stock, key) > cond))
        elif op == "<":
            conditions.append((getattr(Stock, key) < cond))
        elif op == "=":
            conditions.append((getattr(Stock, key) == cond))
    def stringConditions(key, value):
            conditions.append((getattr(Stock, key).in_(value.split(" "))))

    for key, value in screener.params.items():
        if key == "price":
            floatConditions(key, value)
        if key == "market_cap":
            floatConditions(key, value)
        if key == "shares_outstanding":
            floatConditions(key, value)
        if key == "past_year_return":
            floatConditions(key, value)
        if key == "past_outperformance":
            floatConditions(key, value)
        if key == "trailing_pe":
            floatConditions(key, value)
        if key == "forward_pe":
            floatConditions(key, value)
        if key == "pb":
            floatConditions(key, value)
        if key == "dividend_yield":
            floatConditions(key, value)
        if key == "recommendation":
            stringConditions(key, value)
        if key == "target_mean":
            floatConditions(key, value)
        if key == "short_interest":
            floatConditions(key, value)
        if key == "fifty_two_high":
            floatConditions(key, value)
        if key == "distance_to_52_high":
            floatConditions(key, value)
        if key == "fifty_two_low":
            floatConditions(key, value)
        if key == "distance_to_52_low":
            floatConditions(key, value)
        if key == "industry":
            stringConditions(key, value)
        if key == "sector":
            stringConditions(key, value)
        if key == "past_day_return":
            floatConditions(key, value)
        if key == "past_month_return":
            floatConditions(key, value)
        if key == "avg_volume":
            floatConditions(key, value)
    stocks = Stock.query.filter(and_(*conditions))
    return jsonify([stock.to_dict() for stock in stocks])
