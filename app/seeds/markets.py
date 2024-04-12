from app.models import db, Market, environment, SCHEMA
from sqlalchemy.sql import text
import yfinance as yf
import pandas as pd
import json

markets = ["^GSPC", "^DJI", "^IXIC", "^RUT", "CL=F", "GC=F", "NG=F", "^FTSE", "^FCHI", "^GDAXI", "^N100", "000001.SS", "^N225", "^HSI", "^AXJO", "^ADOW", "BTC-USD", "ETH-USD"]

currencies = ["EURUSD=X", "GBP=X", "JPY=X", "CNH=F", "HKD=X", "AUD=X"]

rates = ["^IRX", "^FVX", "^TNX", "^TYX"]

sectors = ["XLE", "XLU", "XLK", "XLB", "XLP", "XLY", "XLI", "XLC", "XLV", "XLF", "XLRE"]

all = markets + currencies + rates + sectors

def seed_markets():
    for ticker in all:
        try:
            response = yf.Ticker(ticker)
            info = response.info
            history = response.history(period="2y").reset_index()
            history["Date"] = history["Date"].dt.strftime("%Y-%m-%d")
            dbinstance = Market(ticker=ticker, name=info["longName"], info=info, history=history)
            db.session.add(dbinstance)
            print(dbinstance)
            db.session.commit()
        except:
            continue
    # test = "^GSPC"
    # response = yf.Ticker(test)
    # dbinstance = Market(ticker=test, name=response.info["longName"], info=response.info, history=response.history)
    # db.session.add(dbinstance)
    # db.session.commit()

def undo_markets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.markets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM markets"))

    db.session.commit()
