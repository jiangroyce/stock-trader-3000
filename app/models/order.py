import datetime as dt
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__ = 'orders'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock_ticker = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=False)
    order_number = db.Column(db.Integer)
    cost_basis = db.Column(db.Float)
    quantity = db.Column(db.Float)
    createdAt = db.Column(db.DateTime, default=dt.datetime.now())
