from .db import db, environment, SCHEMA, add_prefix_for_prod
import json
import pandas as pd
class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    cash = db.Column(db.Float)
    order_number = db.Column(db.Integer, default = 1)
    _history = db.Column(db.JSON)
    value = db.Column(db.Float)
    transfers = db.relationship("Transfer", back_populates="portfolio")
    orders = db.relationship("Order", back_populates="portfolio")

    @property
    def history(self):
        return self._history

    @history.setter
    def history(self, df):
        self._history = df.to_json(orient="records")
