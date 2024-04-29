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
    s1 = Watchlist(name='Banks', user_id=2, stock_ticker="JPM", list_number=1)
    s2 = Watchlist(name='Banks', user_id=2, stock_ticker="WFC", list_number=1)
    s3 = Watchlist(name='Banks', user_id=2, stock_ticker="C", list_number=1)
    s4 = Watchlist(name='Banks', user_id=2, stock_ticker="BAC", list_number=1)
    s5 = Watchlist(name='Banks', user_id=2, stock_ticker="BK", list_number=1)
    s6 = Watchlist(name='Banks', user_id=2, stock_ticker="CFG", list_number=1)
    s7 = Watchlist(name='Banks', user_id=2, stock_ticker="KEY", list_number=1)
    s8 = Watchlist(name='Banks', user_id=2, stock_ticker="SYF", list_number=1)
    d1 = Watchlist(name='Healthcare', user_id=2, stock_ticker="A", list_number=2)
    d2 = Watchlist(name='Healthcare', user_id=2, stock_ticker="ABBV", list_number=2)
    d3 = Watchlist(name='Healthcare', user_id=2, stock_ticker="ABT", list_number=2)
    d4 = Watchlist(name='Healthcare', user_id=2, stock_ticker="CI", list_number=2)
    d5 = Watchlist(name='Healthcare', user_id=2, stock_ticker="UNH", list_number=2)
    d6 = Watchlist(name='Healthcare', user_id=2, stock_ticker="ELV", list_number=2)
    d7 = Watchlist(name='Healthcare', user_id=2, stock_ticker="DOC", list_number=2)
    d8 = Watchlist(name='Healthcare', user_id=2, stock_ticker="MET", list_number=2)
    p1 = Watchlist(name='Stonks', user_id=2, stock_ticker="TSLA", list_number=3)
    p2 = Watchlist(name='Stonks', user_id=2, stock_ticker="NVDA", list_number=3)
    p3 = Watchlist(name='Stonks', user_id=2, stock_ticker="SMCI", list_number=3)
    p4 = Watchlist(name='Stonks', user_id=2, stock_ticker="INTC", list_number=3)
    p5 = Watchlist(name='Stonks', user_id=2, stock_ticker="AMD", list_number=3)
    p6 = Watchlist(name='Stonks', user_id=2, stock_ticker="TTWO", list_number=3)
    p7 = Watchlist(name='Stonks', user_id=2, stock_ticker="CRM", list_number=3)
    p8 = Watchlist(name='Stonks', user_id=2, stock_ticker="GOOG", list_number=3)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo2)
    db.session.add(marnie2)
    db.session.add(bobbie2)
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.add(s4)
    db.session.add(s5)
    db.session.add(s6)
    db.session.add(s7)
    db.session.add(s8)
    db.session.add(d1)
    db.session.add(d2)
    db.session.add(d3)
    db.session.add(d4)
    db.session.add(d5)
    db.session.add(d6)
    db.session.add(d7)
    db.session.add(d8)
    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    db.session.add(p6)
    db.session.add(p7)
    db.session.add(p8)
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
