from app.models import db, Order, Stock, Portfolio, environment, SCHEMA
import datetime as dt
import math
from sqlalchemy.sql import text


# Adds a demo Order, you can add other Orders here if you want
def seed_orders():
    portfolio = Portfolio.query.get(2)
    aapl = Stock.query.get("AAPL")
    msft = Stock.query.get("MSFT")
    tsla = Stock.query.get("TSLA")
    date1 = dt.datetime(2023, 2, 8)
    aapl_price1 = list(filter(lambda tick: tick["Date"] == date1.strftime("%Y-%m-%d"), aapl.history))[0]["Close"]
    date2 = dt.datetime(2023, 9, 26)
    msft_price1 = list(filter(lambda tick: tick["Date"] == date2.strftime("%Y-%m-%d"), msft.history))[0]["Close"]
    date3 = dt.datetime(2023, 12, 28)
    aapl_price2 = list(filter(lambda tick: tick["Date"] == date3.strftime("%Y-%m-%d"), aapl.history))[0]["Close"]
    date4 = dt.datetime(2024, 1, 18)
    tsla_price1 = list(filter(lambda tick: tick["Date"] == date4.strftime("%Y-%m-%d"), tsla.history))[0]["Close"]
    date5 = dt.datetime(2024, 3, 5)
    tsla_price2 = list(filter(lambda tick: tick["Date"] == date5.strftime("%Y-%m-%d"), tsla.history))[0]["Close"]
    date6 = dt.datetime(2024, 4, 4)
    tsla_price3 = list(filter(lambda tick: tick["Date"] == date6.strftime("%Y-%m-%d"), tsla.history))[0]["Close"]
    demo1 = Order(
        portfolio_id=2, stock_ticker='AAPL', order_number=1, cost_basis=aapl_price1, quantity=math.floor(7000/aapl_price1), createdAt=date1)
    portfolio.cash -= demo1.cost_basis * demo1.quantity
    bobbie1 = Order(
        portfolio_id=2, stock_ticker='MSFT', order_number=2, cost_basis=msft_price1, quantity=math.floor(6000/msft_price1), createdAt=date2)
    portfolio.cash -= bobbie1.cost_basis * bobbie1.quantity
    demo2 = Order(
        portfolio_id=2, stock_ticker='AAPL', order_number=3, cost_basis=aapl_price2, quantity=-math.floor(7000/aapl_price1), createdAt=date3)
    portfolio.cash -= demo2.cost_basis * demo2.quantity
    marnie2 = Order(
        portfolio_id=2, stock_ticker='TSLA', order_number=4, cost_basis=tsla_price1, quantity=math.floor(5000/tsla_price1), createdAt=date4)
    portfolio.cash -= marnie2.cost_basis * marnie2.quantity
    bobbie2 = Order(
        portfolio_id=2, stock_ticker='TSLA', order_number=5, cost_basis=tsla_price2, quantity=math.floor(10000/tsla_price2), createdAt=date5)
    portfolio.cash -= bobbie2.cost_basis * bobbie2.quantity
    demo3 = Order(
        portfolio_id=2, stock_ticker='TSLA', order_number=6, cost_basis=tsla_price3, quantity=-math.floor(10000/tsla_price2), createdAt=date6)
    portfolio.cash -= demo3.cost_basis * demo3.quantity
    db.session.add(demo1)
    db.session.add(bobbie1)
    db.session.add(demo2)
    db.session.add(marnie2)
    db.session.add(bobbie2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the orders table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
