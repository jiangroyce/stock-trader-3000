from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
import pandas as pd
import json


# Adds a demo user, you can add other stocks here if you want
def seed_stocks():
    data = pd.read_csv("app/seeds/stocks/sp-500-index-03-26-2024.csv")
    tickers = data.loc[:,"Symbol"].to_list()
    stocks = yf.Tickers(" ".join(tickers))
    # infotest = stocks.tickers["AAPL"].info
    # stonktest = Stock(ticker="AAPL", name=infotest["shortName"], price=infotest["currentPrice"], sector=infotest["sector"], market_cap=infotest["marketCap"]/1000000, shares_outstanding=infotest["sharesOutstanding"]/1000000, data=json.dumps(infotest))
    for ticker in tickers:
        info = stocks.tickers[ticker].info
        history = stocks.tickers[ticker].history(period="2y")
        try:
            dbinstance = Stock(ticker=ticker, name=info["shortName"], price=info["currentPrice"], sector=info["sector"], market_cap=info["marketCap"]/1000000, shares_outstanding=info["sharesOutstanding"]/1000000, info=json.dumps(info), history=json.dumps(history.to_json(orient="records")))
            db.session.add(dbinstance)
            db.session.commit()
        except:
            continue
    # for index, row in tickers.iterrows():
    #     ticker = row["Symbol"]
    #     info = yf.Tickers
    #     stock = Stock(ticker=row["Symbol"], name=row["Name"], price=row["Last"])
    #     db.session.add(stock)
    # db.session.commit()
    # aapl = Stock(
    #     ticker='AAPL', name='Apple Inc.', price=169.71, sector="Technology", market_cap=2620644.917248, shares_outstanding=15441899.520)
    # msft = Stock(
    #     ticker='MSFT', name='Microsoft Inc.', price=421.65, sector="Technology", market_cap=3133044.948992, shares_outstanding=7430439.936)
    # goog = Stock(
    #     ticker='GOOG', name='Alphabet Inc.', price=151.70, sector="Technology", market_cap=1878759.047168, shares_outstanding=5671000.064)

    # db.session.add(aapl)
    # db.session.add(msft)
    # db.session.add(goog)
    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the stocks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
