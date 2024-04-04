from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, Screener
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
