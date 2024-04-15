from app.models import db, Transfer, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text
import datetime as dt


# Adds a demo transfer, you can add other transfers here if you want
def seed_transfers():
    demo1 = Transfer(
        portfolio_id=2, quantity=20000, createdAt=dt.datetime(2023, 2, 6))
    demo2 = Transfer(
        portfolio_id=2, quantity=75000, createdAt=dt.datetime(2024, 3, 4))
    demo3 = Transfer(
        portfolio_id=2, quantity=-45000, createdAt=dt.datetime(2024, 4, 10))
    p1 = Portfolio.query.get(2)
    p1.cash += 20000
    p1.cash += 75000
    p1.cash -= 45000
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the transfers table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transfers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transfers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transfers"))

    db.session.commit()
