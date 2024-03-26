from .db import db, environment, SCHEMA, add_prefix_for_prod

class Stock(db.Model):
    __tablename__ = 'stocks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    ticker = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    sector = db.Column(db.String)
    market_cap = db.Column(db.Float)
    shares_outstanding = db.Column(db.Float)
    data = db.Column(db.JSON)

    def to_dict(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'price': self.price,
            'sector': self.sector,
            "market_cap": self.market_cap,
            "shares_outstanding": self.shares_outstanding
        }
