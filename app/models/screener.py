from .db import db, environment, SCHEMA, add_prefix_for_prod
import json

class Screener(db.Model):
    __tablename__ = 'screeners'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String, nullable=False)
    _params = db.Column(db.JSON, nullable=False)
    price = db.Column(db.String) # < >
    market_cap = db.Column(db.String) # < > sort
    shares_outstanding = db.Column(db.String) # < >
    past_year_return = db.Column(db.String) # sort < >
    past_outperformance = db.Column(db.String) # sort < >
    trailing_pe = db.Column(db.String) # < > sort
    forward_pe = db.Column(db.String) # < > sort
    pb = db.Column(db.String) # < > sort
    dividend_yield = db.Column(db.String) # < > sort
    recommendation = db.Column(db.String) # is in []
    target_mean = db.Column(db.String) #
    short_interest = db.Column(db.String) # < > sort
    fifty_two_high = db.Column(db.String)
    distance_to_52_high = db.Column(db.String) # sort < >
    fifty_two_low = db.Column(db.String)
    distance_to_52_low = db.Column(db.String) # sort < >
    industry = db.Column(db.String) # is in []
    sector = db.Column(db.String) # is in []
    past_day_return = db.Column(db.String) # < > sort
    past_month_return = db.Column(db.String) # < > sort
    avg_volume = db.Column(db.String) # < > sort

    @property
    def params(self):
        return json.loads(self._params)

    @params.setter
    def params(self, params):
        self._params = json.dumps(params)
        try:
            self.price = params["price"]
        except:
            pass
        try:
            self.market_cap = params["market_cap"]
        except:
            pass
        try:
            self.shares_outstanding = params["shares_outstanding"]
        except:
            pass
        try:
            self.past_year_return = params["past_year_return"]
        except:
            pass
        try:
            self.past_outperformance = params["past_outperformance"]
        except:
            pass
        try:
            self.trailing_pe = params["trailing_pe"]
        except:
            pass
        try:
            self.forward_pe = params["forward_pe"]
        except:
            pass
        try:
            self.pb = params["pb"]
        except:
            pass
        try:
            self.dividend_yield = params["dividend_yield"]
        except:
            pass
        try:
            self.recommendation = params["recommendation"]
        except:
            pass
        try:
            self.target_mean = params["target_mean"]
        except:
            pass
        try:
            self.short_interest = params["short_interest"]
        except:
            pass
        try:
            self.fifty_two_high = params["fifty_two_high"]
        except:
            pass
        try:
            self.distance_to_52_high = params["distance_to_52_high"]
        except:
            pass
        try:
            self.fifty_two_low = params["fifty_two_low"]
        except:
            pass
        try:
            self.distance_to_52_low = params["distance_to_52_low"]
        except:
            pass
        try:
            self.industry = params["industry"]
        except:
            pass
        try:
            self.sector = params["sector"]
        except:
            pass

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "params": self.params
        }
