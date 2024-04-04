import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStocks } from "../../redux/stock";
import { fetchAllScreeners } from "../../redux/screener";
import { NavLink } from "react-router-dom";
import "./Screener.css"

function AllStocksPage() {
    const stocks = useSelector((state) => state.stocks.stocks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStocks());
    }, [dispatch]);

    return (
        <div className="screener-page">
            <div className="filters">
                Filters
            </div>
            <div className="all-stocks">
                {stocks?.map((stock) => (
                    <div className="stock-card" key={stock.ticker}>
                        {stock.name}
                    </div>
                ))}
            </div>
        </div>
        )
}

export default AllStocksPage
