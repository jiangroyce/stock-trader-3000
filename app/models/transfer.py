import datetime as dt
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transfer(db.Model):
    __tablename__ = 'transfers'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    quantity = db.Column(db.Float)
    createdAt = db.Column(db.DateTime, default=dt.datetime.now())
    portfolio = db.relationship("Portfolio", back_populates="transfers")

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            "quantity": self.quantity,
            "placed_on": self.createdAt
        }
