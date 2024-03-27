from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Watchlist

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route("/current")
@login_required
def watchlists():
    """
    Get all watchlists of current user
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    response = {}
    for watchlist in watchlists:
        if watchlist.list_number not in response:
            response[watchlist.list_number] = {"name": watchlist.name, "stocks": [watchlist.stock.to_dict()]}
        else:
            response[watchlist.list_number]["stocks"].append(watchlist.stock.to_dict())
    return jsonify(list(response.values()))
