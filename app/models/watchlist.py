from .db import db, environment, SCHEMA, add_prefix_for_prod

class Watchlist(db.Model):
    __tablename__ = 'watchlists'
    constraints = [
        db.UniqueConstraint('user_id', 'list_number', 'stock_ticker')
    ]
    if environment == "production":
        constraints.append({'schema': SCHEMA})
    __table_args__ = tuple(constraints)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock_ticker = db.Column(db.String, db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=True)
    list_number = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)

    stock = db.relationship("Stock", back_populates="watchlists")

    def to_dict(self):
        return {
            "name": self.name,
            "stock_ticker": self.stock_ticker,
            "list_number": self.list_number,
            "stock": self.stock.to_dict()
        }
