import datetime as dt
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order(db.Model):
    __tablename__ = 'orders'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    stock_ticker = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=False)
    order_number = db.Column(db.Integer)
    cost_basis = db.Column(db.Float)
    quantity = db.Column(db.Float)
    createdAt = db.Column(db.DateTime, default=dt.datetime.now())

    portfolio = db.relationship("Portfolio", back_populates="orders")
    stock = db.relationship("Stock")

    def to_dict(self):
        return {
            'order_number': self.order_number,
            'portfolio_id': self.portfolio_id,
            'stock_ticker': self.stock_ticker,
            'cost_basis': self.cost_basis,
            "quantity": self.quantity,
            "placed_on": self.createdAt,
            "stock": self.stock.to_dict()
        }
