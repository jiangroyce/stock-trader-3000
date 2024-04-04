import json
import pandas as pd
from io import StringIO
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Stock(db.Model):
    __tablename__ = 'stocks'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    ticker = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Float)
    market_cap = db.Column(db.Float)
    shares_outstanding = db.Column(db.Float)
    past_year_return = db.Column(db.Float)
    past_outperformance = db.Column(db.Float)
    trailing_pe = db.Column(db.Float)
    forward_pe = db.Column(db.Float)
    pb = db.Column(db.Float)
    dividend_yield = db.Column(db.Float)
    recommendation = db.Column(db.String)
    target_mean = db.Column(db.Float)
    short_interest = db.Column(db.Float)
    fifty_two_high = db.Column(db.Float)
    distance_to_52_high = db.Column(db.Float)
    fifty_two_low = db.Column(db.Float)
    distance_to_52_low = db.Column(db.Float)
    industry = db.Column(db.String)
    sector = db.Column(db.String)
    past_day_return = db.Column(db.Float)
    past_month_return = db.Column(db.Float)
    avg_volume = db.Column(db.Float)
    _info = db.Column(db.JSON)
    _history = db.Column(db.JSON)

    @property
    def history(self):
        return json.loads(self._history)

    @history.setter
    def history(self, history_df):
        self._history = history_df.to_json(orient="records")
        self.past_day_return = history_df["Close"].iloc[-1]/history_df["Close"].iloc[-2] - 1
        self.past_month_return = history_df["Close"].iloc[-1]/history_df["Close"].iloc[-21] - 1
        self.avg_volume = history_df["Volume"].mean()

    @property
    def info(self):
        return json.loads(self._info)

    @info.setter
    def info(self, info):
        self._info = json.dumps(info)
        try:
            self.price = info["currentPrice"]
        except:
            pass
        try:
            self.market_cap = info["marketCap"]/1000000
        except:
            pass
        try:
            self.shares_outstanding = info["sharesOutstanding"]/1000000
        except:
            pass
        try:
            self.past_year_return = info["52WeekChange"]
        except:
            pass
        try:
            self.past_outperformance = info["52WeekChange"] - info["SandP52WeekChange"]
        except:
            pass
        try:
            self.trailing_pe = info["trailingPE"]
        except:
            pass
        try:
            self.forward_pe = info["forwardPE"]
        except:
            pass
        try:
            self.pb = info["priceToBook"]
        except:
            pass
        try:
            self.dividend_yield = info["dividendYield"]
        except:
            pass
        try:
            self.recommendation = info["recommendationKey"]
        except:
            pass
        try:
            self.target_mean = info["targetMeanPrice"]
        except:
            pass
        try:
            self.short_interest = info["sharesShort"] / info["sharesOutstanding"]
        except:
            pass
        try:
            self.fifty_two_high = info["fiftyTwoWeekHigh"]
        except:
            pass
        try:
            self.distance_to_52_high = info["fiftyTwoWeekHigh"]/info["currentPrice"] - 1
        except:
            pass
        try:
            self.fifty_two_low = info["fiftyTwoWeekLow"]
        except:
            pass
        try:
            self.distance_to_52_low = info["fiftyTwoWeekLow"]/info["currentPrice"] - 1
        except:
            pass
        try:
            self.industry = info["industryKey"]
        except:
            pass
        try:
            self.sector = info["sectorKey"]
        except:
            pass

    watchlists = db.relationship("Watchlist", back_populates="stock")

    def to_dict(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'price': self.price,
            'sector': self.sector,
            "market_cap": self.market_cap,
            "shares_outstanding": self.shares_outstanding,
            "avg_volume": self.avg_volume,
            "1d_return": self.past_day_return,
            "1m_return": self.past_month_return,
            "1y_return": self.past_year_return,
            "1y_performance": self.past_year_vs_market,
            "pe": self.pe,
            "recommendation": self.recommendation
        }

    def full_details(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'price': self.price,
            'sector': self.sector,
            "market_cap": self.market_cap,
            "shares_outstanding": self.shares_outstanding,
            # "info": json.loads(self.info),
            # "history": json.loads(self.history),
            "avg_volume": self.avg_volume,
            "1d_return": self.past_day_return,
            "1m_return": self.past_month_return,
            "1y_return": self.past_year_return,
            "1y_performance": self.past_year_vs_market,
            "pe": self.pe,
            "recommendation": self.recommendation
        }
