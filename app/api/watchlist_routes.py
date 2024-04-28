from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Watchlist, User, db
from app.forms import WatchlistForm, AddStockForm


watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route("/current")
@login_required
def watchlists():
    """
    Get all watchlists of current user
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
    defaults = Watchlist.query.filter_by(user_id=1).all()
    watchlists.extend(defaults)
    response = {}
    for watchlist in watchlists:
        if watchlist.list_number not in response:
            response[watchlist.list_number] = {"name": watchlist.name, "list_number": watchlist.list_number, "stocks": [watchlist.stock.full_details()] if watchlist.stock else []}
        else:
            response[watchlist.list_number]["stocks"].append(watchlist.stock.full_details() if watchlist.stock else None)
    return jsonify(response)

@watchlist_routes.route("/current/<ticker>")
@login_required
def getLists(ticker):
    watchlists = Watchlist.query.filter_by(user_id=current_user.id, stock_ticker=ticker).all()
    return jsonify([watchlist.list_number for watchlist in watchlists])

@watchlist_routes.route("/new-list", methods=["POST"])
@login_required
def newWatchlist():
    """
    Create new watchlist for current user
    """
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        newWatchlist = Watchlist(
            name=form.data["name"],
            user_id=user.id,
            list_number=user.list_number
        )
        user.list_number += 1
        db.session.add(newWatchlist)
        db.session.commit()
        return jsonify({"name": newWatchlist.name, "list_number": newWatchlist.list_number, "stocks": []}), 201
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@watchlist_routes.route("/add-stock", methods=["POST"])
@login_required
def addStock():
    """
    Add stock to a watchlist for current user
    """
    form = AddStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        newWatchlist = Watchlist(
            name=form.data["name"],
            list_number=form.data["list_number"],
            stock_ticker=form.data["stock_ticker"],
            user_id=user.id
        )
        db.session.add(newWatchlist)
        db.session.commit()
        return jsonify({"name": newWatchlist.name, "list_number": newWatchlist.list_number, "stock": newWatchlist.stock.to_dict()})
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@watchlist_routes.route("/remove-stock", methods=["POST"])
@login_required
def removeStock():
    """
    Remove stock to a watchlist for current user
    """
    form = AddStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(current_user.id)
        watchlist = Watchlist.query.filter_by(
            list_number=form.data["list_number"],
            stock_ticker=form.data["stock_ticker"],
            user_id=user.id
        ).first()
        db.session.delete(watchlist)
        db.session.commit()
        return jsonify({"message": "Successfully Deleted"})
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@watchlist_routes.route("/current/<int:id>")
@login_required
def getList(id):
    """
    Add stock to a watchlist for current user
    """
    user_id = current_user.id
    if id >= 20000:
        user_id = 1
    watchlists = Watchlist.query.filter_by(user_id=user_id, list_number=id).all()
    response = {}
    for watchlist in watchlists:
        if watchlist.list_number not in response:
            response[watchlist.list_number] = {"name": watchlist.name, "list_number": watchlist.list_number, "stocks": [watchlist.stock.to_dict()] if watchlist.stock else []}
        else:
            response[watchlist.list_number]["stocks"].append(watchlist.stock.to_dict() if watchlist.stock else None)
    return jsonify(response[id])

@watchlist_routes.route("/current/<int:id>", methods=["PUT"])
@login_required
def editList(id):
    """
    Edit watchlist for current user
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id, list_number=id).all()
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        response = {}
        for watchlist in watchlists:
            watchlist.name=form.data["name"]
            if watchlist.list_number not in response:
                response[watchlist.list_number] = {"name": watchlist.name, "list_number": watchlist.list_number, "stocks": [watchlist.stock.to_dict()] if watchlist.stock else []}
            else:
                response[watchlist.list_number]["stocks"].append(watchlist.stock.to_dict() if watchlist.stock else None)
        db.session.commit()
        return jsonify(response[id])
    return {'message': 'Bad Request', 'errors': form.errors}, 400

@watchlist_routes.route("/current/<int:id>", methods=["DELETE"])
@login_required
def deleteList(id):
    """
    Delete watchlist for current user
    """
    watchlists = Watchlist.query.filter_by(user_id=current_user.id, list_number=id).all()
    if not watchlists:
        return jsonify({'message': 'Bad Request', 'errors': {"404": "Watchlist Not Found"}}), 404
    for watchlist in watchlists:
        db.session.delete(watchlist)
    db.session.commit()
    return jsonify({"message": "Successfully deleted"})
