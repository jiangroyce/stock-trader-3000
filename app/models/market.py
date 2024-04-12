import json
import pandas as pd
from io import StringIO
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Market(db.Model):
    __tablename__ = 'markets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    past_year_return = db.Column(db.Float)
    fifty_two_high = db.Column(db.Float)
    distance_to_52_high = db.Column(db.Float)
    fifty_two_low = db.Column(db.Float)
    distance_to_52_low = db.Column(db.Float)
    past_day_return = db.Column(db.Float)
    past_month_return = db.Column(db.Float)
    _info = db.Column(db.JSON)
    _history = db.Column(db.JSON)

    @property
    def history(self):
        return json.loads(self._history)

    @history.setter
    def history(self, history_df):
        self._history = history_df.to_json(orient="records")
        try:
            self.past_day_return = history_df["Close"].iloc[-1]/history_df["Close"].iloc[-2] - 1
        except:
            pass
        try:
            self.past_month_return = history_df["Close"].iloc[-1]/history_df["Close"].iloc[-21] - 1
        except:
            pass
        try:
            self.past_year_return = history_df["Close"].iloc[-1]/history_df["Close"].iloc[-253] - 1
        except:
            pass

    @property
    def info(self):
        return json.loads(self._info)

    @info.setter
    def info(self, info):
        self._info = json.dumps(info)
        try:
            self.price = info["previousClose"]
        except:
            pass
        try:
            self.past_year_return = info["52WeekChange"]
        except:
            pass
        try:
            self.fifty_two_high = info["fiftyTwoWeekHigh"]
        except:
            pass
        try:
            self.distance_to_52_high = info["fiftyTwoWeekHigh"]/info["previousClose"] - 1
        except:
            pass
        try:
            self.fifty_two_low = info["fiftyTwoWeekLow"]
        except:
            pass
        try:
            self.distance_to_52_low = info["fiftyTwoWeekLow"]/info["previousClose"] - 1
        except:
            pass

    # def to_dict(self):
    #     return {
    #         'ticker': self.ticker,
    #         'name': self.name,
    #         'price': self.price,
    #         'sector': self.sector,
    #         "market_cap": self.market_cap,
    #         "shares_outstanding": self.shares_outstanding,
    #     }
    watchlists = db.relationship("Watchlist", back_populates="market")

    def full_details(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'price': self.price,
            "info": self.info,
            "history": self.history,
        }

    def to_dict(self):
        return {
            "ticker" : self.ticker,
            "name" : self.name,
            "price" : self.price,
            "fifty_two_high" : self.fifty_two_high,
            "distance_to_52_high" : self.distance_to_52_high,
            "fifty_two_low" : self.fifty_two_low,
            "distance_to_52_low" : self.distance_to_52_low,
            "past_day_return" : self.past_day_return,
            "past_month_return" : self.past_month_return
        }
