from app.models import db, Screener, environment, SCHEMA
from sqlalchemy.sql import text
import json


# Adds a demo user, you can add other users here if you want
def seed_screeners():
    demo = Screener(
        name='Technology Stocks (Default)', user_id=1, params={"sector": "technology "})
    marnie = Screener(
        name='Mega Cap Stocks (Default)', user_id=1, params={"market_cap": "> 200000"})
    johnson = Screener(
        name='Trillionaires (Default)', user_id=1, params={"market_cap": "> 1000000"})
    test = Screener(
        name='Winning Value Stocks (Default)', user_id=1, params={"trailing_pe": "< 20", "past_outperformance": "> 0"})
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(test)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the screeners table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_screeners():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.screeners RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM screeners"))

    db.session.commit()
