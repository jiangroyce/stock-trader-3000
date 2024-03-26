from .db import db, environment, SCHEMA, add_prefix_for_prod

class Screener(db.Model):
    __tablename__ = 'screeners'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String, nullable=False)
    params = db.Column(db.JSON, nullable=False)