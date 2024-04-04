from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo Watchlist, you can add other Watchlists here if you want
def seed_watchlists():
    demo = Watchlist(
        name='Big Tech (Default)', user_id=1, stock_ticker='AAPL', list_number=20000)
    marnie = Watchlist(
        name='Big Tech (Default)', user_id=1, stock_ticker='MSFT', list_number=20000)
    bobbie = Watchlist(
        name='Big Tech (Default)', user_id=1, stock_ticker='GOOG', list_number=20000)
    demo2 = Watchlist(
        name='Big Pharma (Default)', user_id=1, stock_ticker='PFE', list_number=20001)
    marnie2 = Watchlist(
        name='Big Pharma (Default)', user_id=1, stock_ticker='JNJ', list_number=20001)
    bobbie2 = Watchlist(
        name='Big Pharma (Default)', user_id=1, stock_ticker='LLY', list_number=20001)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo2)
    db.session.add(marnie2)
    db.session.add(bobbie2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the watchlists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
