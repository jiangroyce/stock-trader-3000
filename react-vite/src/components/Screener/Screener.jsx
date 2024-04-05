import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStocks } from "../../redux/stock";
import { fetchAllScreeners, fetchScreener } from "../../redux/screener";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddToWatchlistModal from "../AddToWatchlistModal";
import FilterCard from "./FilterCard";
import "./Screener.css"

function AllStocksPage() {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const location = useLocation();
    const id = location.search.split("id=")[1];
    const screeners = useSelector((state) => state.screeners);
    const screener = screeners?.screeners?.filter(item => item?.id == id)[0];
    const [isLoaded, setIsLoaded] = useState(false)
    const stocks = id ? screeners[+id] : useSelector((state) => state.stocks.stocks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllStocks());
        dispatch(fetchScreener(id ? +id : undefined)).then(() => setIsLoaded(true))
    }, [dispatch, id]);

    if (!isLoaded) return <h1>Loading</h1>
    else return (
        <div className="screener-page">
            <div className="filters">
                <h2>Filters</h2>
                <div className="filter-container">
                    <FilterCard
                        title={<h3>Average Volume</h3>}
                        options={
                        <>
                            <p>Under 50,000</p>
                            <p>Under 100,000</p>
                            <p>Under 200,000</p>
                            <p>Under 500,000</p>
                            <p>Under 1,000,000</p>
                            <p>Over 50,000</p>
                            <p>Over 100,000</p>
                            <p>Over 200,000</p>
                            <p>Over 500,000</p>
                            <p>Over 1,000,000</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Share Price</h3>}
                        options={
                        <>
                            <p>Under $10</p>
                            <p>Under $50</p>
                            <p>Under $100</p>
                            <p>Over $10</p>
                            <p>Over $50</p>
                            <p>Over $100</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>52 Week Range</h3>}
                        options={
                            <>
                                <p>High Within 1% of Current Price</p>
                                <p>High Within 5% of Current Price</p>
                                <p>High Within 20% of Current Price</p>
                                <p>High Within 40% of Current Price</p>
                                <p>Low Within 1% of Current Price</p>
                                <p>Low Within 5% of Current Price</p>
                                <p>Low Within 20% of Current Price</p>
                                <p>Low Within 40% of Current Price</p>
                                <p>Custom Range</p>
                            </>} />
                    <FilterCard
                        title={<h3>Daily % Change</h3>}
                        options={
                        <>
                            <p>Up more than 0%</p>
                            <p>Up more than 5%</p>
                            <p>Up more than 10%</p>
                            <p>Up more than 20%</p>
                            <p>Down more than 0%</p>
                            <p>Down more than 5%</p>
                            <p>Down more than 10%</p>
                            <p>Down more than 20%</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Monthly % Change</h3>}
                        options={
                            <>
                                <p>Up more than 0%</p>
                                <p>Up more than 5%</p>
                                <p>Up more than 10%</p>
                                <p>Up more than 20%</p>
                                <p>Up more than 30%</p>
                                <p>Down more than 0%</p>
                                <p>Down more than 5%</p>
                                <p>Down more than 10%</p>
                                <p>Down more than 20%</p>
                                <p>Down more than 30%</p>
                                <p>Custom Range</p>
                            </>} />
                    <FilterCard
                        title={<h3>Yearly % Change</h3>}
                        options={
                        <>
                            <p>Up more than 0%</p>
                            <p>Up more than 5%</p>
                            <p>Up more than 10%</p>
                            <p>Up more than 20%</p>
                            <p>Up more than 30%</p>
                            <p>Up more than 40%</p>
                            <p>Up more than 50%</p>
                            <p>Down more than 0%</p>
                            <p>Down more than 5%</p>
                            <p>Down more than 10%</p>
                            <p>Down more than 20%</p>
                            <p>Down more than 30%</p>
                            <p>Down more than 40%</p>
                            <p>Down more than 50%</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Yearly % Change Over Market</h3>}
                        options={
                        <>
                            <p>Up more than 0%</p>
                            <p>Up more than 5%</p>
                            <p>Up more than 10%</p>
                            <p>Up more than 20%</p>
                            <p>Up more than 30%</p>
                            <p>Up more than 40%</p>
                            <p>Up more than 50%</p>
                            <p>Down more than 0%</p>
                            <p>Down more than 5%</p>
                            <p>Down more than 10%</p>
                            <p>Down more than 20%</p>
                            <p>Down more than 30%</p>
                            <p>Down more than 40%</p>
                            <p>Down more than 50%</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Market Cap</h3>}
                        options={
                        <>
                            <p>Small Cap ($300M - $2B)</p>
                            <p>Mid Cap ($2B - $10B)</p>
                            <p>Large Cap ($10B+)</p>
                            <p>Mega Cap ($200B+)</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Sector</h3>}
                        options={
                        <>
                            {<p>Sector Name</p> /* sectors.map((sector, index) => (<p key={index}>sector</p>)) */}
                        </>} />
                    <FilterCard
                        title={<h3>Shares Outstanding</h3>}
                        options={
                        <>
                            <p>Under 1M</p>
                            <p>Under 5M</p>
                            <p>Under 20M</p>
                            <p>Under 50M</p>
                            <p>Under 100M</p>
                            <p>Over 1M</p>
                            <p>Over 5M</p>
                            <p>Over 20M</p>
                            <p>Over 50M</p>
                            <p>Over 100M</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Short Interest %</h3>}
                        options={
                        <>
                            <p>Under 1%</p>
                            <p>Under 5%</p>
                            <p>Under 10%</p>
                            <p>Over 1%</p>
                            <p>Over 5%</p>
                            <p>Over 10%</p>
                            <p>Over 15%</p>
                            <p>Over 20%</p>
                            <p>Custom Range</p>
                        </>}/>
                    <FilterCard
                        title={<h3>Analyst Ratings</h3>}
                        options={
                        <>
                            <p>Buy</p>
                            <p>Hold</p>
                            <p>Mixed</p>
                            <p>Sell</p>
                        </>} />
                    <FilterCard
                        title={<h3>Dividend Yield</h3>}
                        options={
                        <>
                            <p>None</p>
                            <p>2% or Less</p>
                            <p>Over 2%</p>
                            <p>Over 5%</p>
                            <p>Custom Range</p>
                        </>} />
                    <FilterCard
                        title={<h3>Trailing PE Ratio</h3>}
                        options={
                        <div>
                            <p>More than 0</p>
                            <p>More than 5</p>
                            <p>More than 15</p>
                            <p>More than 20</p>
                            <p>More than 50</p>
                            <p>Less than 20</p>
                            <p>Less than 50</p>
                            <p>Custom Range</p>
                        </div>} />
                    <FilterCard
                        title={<h3>Forward PE Ratio</h3>}
                        options={<div>
                            <p>More than 0</p>
                            <p>More than 5</p>
                            <p>More than 15</p>
                            <p>More than 20</p>
                            <p>More than 50</p>
                            <p>Less than 20</p>
                            <p>Less than 50</p>
                            <p>Custom Range</p>
                        </div>} />
                    <FilterCard
                        title={<h3>Price to Book Ratio</h3>}
                        options={<div>
                            <p>Less than 5</p>
                            <p>More than 5</p>
                            <p>Custom Range</p>
                        </div>} />
                </div>
            </div>
            <div className="all-stocks">
                <div className="screener-header">
                    <h2>{screener?.name}</h2>
                    {<p>{stocks?.length} items</p>}{/*· Updated */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Ticker</th>
                            <th scope="col">Name</th>
                            <th scope="col">1D % Change</th>
                            <th scope="col">Price</th>
                            <th scope="col">Avg Volume</th>
                            <th scope="col">Mkt Cap</th>
                            <th scope="col">1M % Change</th>
                            <th scope="col">1Y % Change</th>
                            <th scope="col">1Y % Change over Mkt</th>
                            <th scope="col">Watch</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stocks?.map((stock) => (
                        <tr className="stock-card" key={stock.ticker}>
                            <th scope="row">{stock.ticker}</th>
                            <td>{stock.name}</td>
                            <td>{(stock.past_day_return * 100).toFixed(2)}%</td>
                            <td>{currencyFormat.format(stock.price)}</td>
                            <td>{stock.avg_volume.toLocaleString("en", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })}</td>
                            <td>${stock.market_cap.toLocaleString("en", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                            })} M</td>
                            <td>{(stock.past_month_return * 100).toFixed(2)}%</td>
                            <td>{(stock.past_year_return * 100).toFixed(2)}%</td>
                            <td>{(stock.past_outperformance * 100).toFixed(2)}%</td>
                            <td>
                                <OpenModalButton
                                buttonText="+"
                                modalComponent={<AddToWatchlistModal stock={stock}/>}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        )
}

export default AllStocksPage
