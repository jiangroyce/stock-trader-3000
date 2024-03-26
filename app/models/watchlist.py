from .db import db, environment, SCHEMA, add_prefix_for_prod

class Watchlist(db.Model):
    __tablename__ = 'watchlists'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock_ticker = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=False)
    name = db.Column(db.String, nullable=False)
