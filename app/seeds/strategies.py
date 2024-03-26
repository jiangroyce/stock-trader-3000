from app.models import db, Strategy, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo Strategy, you can add other Strategys here if you want
def seed_strategies():
    demo = Strategy(
        user_id=1, stock_ticker='AAPL', name='Big Tech', quantity=2, frequency=1/12)
    marnie = Strategy(
        user_id=1, stock_ticker='MSFT', name='Big Tech', quantity=2, frequency=1/12)
    bobbie = Strategy(
        user_id=1, stock_ticker='GOOG', name='Big Tech', quantity=2, frequency=1/12)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the strategies table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_strategies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.strategies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM strategies"))

    db.session.commit()
