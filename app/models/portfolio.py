from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = 'portfolios'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    cash = db.Column(db.Float)
    order_number = db.Column(db.Integer, default = 1)
    transfers = db.relationship("Transfer", back_populates="portfolio")
    orders = db.relationship("Order", back_populates="portfolio")

    @property
    def value(self):
        data = sum([order.cost_basis * order.quantity for order in self.orders])
        return data + self.cash

    @property
    def history(self):
        pass
