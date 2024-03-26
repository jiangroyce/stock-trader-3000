from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo Order, you can add other Orders here if you want
def seed_orders():
    demo1 = Order(
        portfolio_id=1, stock_ticker='AAPL', order_number=1, cost_basis=100.00, quantity=1)
    marnie1 = Order(
        portfolio_id=2, stock_ticker='AAPL', order_number=1, cost_basis=100.00, quantity=1)
    bobbie1 = Order(
        portfolio_id=3, stock_ticker='AAPL', order_number=1, cost_basis=100.00, quantity=1)
    demo2 = Order(
        portfolio_id=1, stock_ticker='MSFT', order_number=2, cost_basis=100.00, quantity=1)
    marnie2 = Order(
        portfolio_id=2, stock_ticker='MSFT', order_number=2, cost_basis=100.00, quantity=1)
    bobbie2 = Order(
        portfolio_id=3, stock_ticker='MSFT', order_number=2, cost_basis=100.00, quantity=1)
    demo3 = Order(
        portfolio_id=1, stock_ticker='GOOG', order_number=3, cost_basis=100.00, quantity=1)
    marnie3 = Order(
        portfolio_id=2, stock_ticker='GOOG', order_number=3, cost_basis=100.00, quantity=1)
    bobbie3 = Order(
        portfolio_id=3, stock_ticker='GOOG', order_number=3, cost_basis=100.00, quantity=1)

    db.session.add(demo1)
    db.session.add(marnie1)
    db.session.add(bobbie1)
    db.session.add(demo2)
    db.session.add(marnie2)
    db.session.add(bobbie2)
    db.session.add(demo3)
    db.session.add(marnie3)
    db.session.add(bobbie3)
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
