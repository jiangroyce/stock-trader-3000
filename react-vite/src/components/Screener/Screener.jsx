import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStocks } from "../../redux/stock";
import { fetchScreener } from "../../redux/screener";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import AddToWatchlistModal from "../AddToWatchlistModal";
import FilterCard from "./FilterCard";
import { FaPlus } from "react-icons/fa";
import Loading from "../Loading";
import * as f from "./filters";
import "./Screener.css"

function AllStocksPage() {
    const navigate = useNavigate();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const location = useLocation();
    const id = +location.search.split("id=")[1];
    const screeners = useSelector((state) => state.screeners);
    const screener = screeners?.screeners?.filter(item => item?.id == id)[0];
    const [isLoaded, setIsLoaded] = useState(false);
    const [filters, setFilters] = useState({});
    const [selected, setSelected] = useState({});
    const [allStocks, setAllStocks] = useState([]);
    const stocks = id ? screeners[+id] : useSelector((state) => state.stocks.stocks);
    const applyFilters = (stocks, filters) => {
        Object.values(filters).forEach((filterCB) => {
            // console.log(typeof(filter))
            const res = stocks.filter((item) => filterCB(item))
            setAllStocks(res)
        })
    }
    const dispatch = useDispatch();

    useEffect(() => {
        setAllStocks(stocks)
    }, [stocks?.length])

    useEffect(() => {
        if (allStocks?.length) applyFilters(allStocks, filters)
        else applyFilters(stocks, filters)
    }, [filters])

    useEffect(() => {
        dispatch(fetchAllStocks());
        dispatch(fetchScreener(id ? +id : undefined)).then(() => setIsLoaded(true))
    }, [dispatch, id]);

    if (!isLoaded) return <Loading />
    else return (
        <div className="screener-page">
            <div className="filters">
                <h2>Filters</h2>
                <div className="filter-container">
                    <FilterCard
                        title={<h3>Average Volume</h3>}
                        attr={"avg_volume"}
                        callback={f.avg_volume}
                        filters={filters}
                        setFilters={setFilters}
                        setSelected={setSelected}
                        selected={selected}
                        setAllStocks={setAllStocks}
                        options={
                        <>
                            <div>
                                <input type="radio" name="avg_volume" value="< 50000" checked={selected.avg_volume == "< 50000"} id="< 50000"/>
                                <label htmlFor="< 50000">Under 50,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="< 100000" checked={selected.avg_volume == "< 100000"} id="< 100000" />
                                <label htmlFor="< 100000">Under 100,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="< 200000" checked={selected.avg_volume == "< 200000"} id="< 200000" />
                                <label htmlFor="< 200000">Under 200,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="< 500000" checked={selected.avg_volume == "< 500000"} id="< 500000" />
                                <label htmlFor="< 500000">Under 500,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="< 1000000" checked={selected.avg_volume == "< 1000000"} id="< 1000000" />
                                <label htmlFor="< 1000000">Under 1,000,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="> 50000" checked={selected.avg_volume == "> 50000"} id="> 50000" />
                                <label htmlFor="> 50000">Over 50,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="> 100000" checked={selected.avg_volume == "> 100000"} id="> 100000" />
                                <label htmlFor="> 100000">Over 100,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="> 200000" checked={selected.avg_volume == "> 200000"} id="> 200000" />
                                <label htmlFor="> 200000">Over 200,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="> 500000" checked={selected.avg_volume == "> 500000"} id="> 500000" />
                                <label htmlFor="> 500000">Over 500,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="> 1000000" checked={selected.avg_volume == "> 1000000"} id="> 1000000" />
                                <label htmlFor="> 1000000">Over 1,000,000</label>
                            </div>
                            <div>
                                <input type="radio" name="avg_volume" value="< 10000000" checked={selected.avg_volume == "< 10000000"} id="< 10000000" />
                                <label htmlFor="< 100000">Custom Range</label>
                            </div>
                        </>}
                         />
                    <FilterCard
                        title={<h3>Share Price</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under $10</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under $50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under $100</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over $10</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over $50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over $100</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>52 Week Range</h3>}
                        options={
                            <>
                                <input type="radio" name="avg_volume" /><label htmlFor="">High Within 1% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">High Within 5% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">High Within 20% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">High Within 40% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Low Within 1% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Low Within 5% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Low Within 20% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Low Within 40% of Current Price</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                            </>} />
                    <FilterCard
                        title={<h3>Daily % Change</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Monthly % Change</h3>}
                        options={
                            <>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 0%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 5%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 10%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 20%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 30%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 0%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 5%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 10%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 20%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 30%</label>
                                <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                            </>} />
                    <FilterCard
                        title={<h3>Yearly % Change</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 30%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 40%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 50%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 30%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 40%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 50%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Yearly % Change Over Market</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 30%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 40%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Up more than 50%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 0%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 30%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 40%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Down more than 50%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Market Cap</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Small Cap ($300M - $2B)</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Mid Cap ($2B - $10B)</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Large Cap ($10B+)</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Mega Cap ($200B+)</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Sector</h3>}
                        options={
                        <>
                            {<><input type="text" /><label htmlFor="">Sector Name</label> </>/* sectors.map((sector, index) => (<p key={index}>sector</label>)) */}
                        </>} />
                    <FilterCard
                        title={<h3>Shares Outstanding</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 1M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 5M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 20M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 50M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 100M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 1M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 5M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 20M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 50M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 100M</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Short Interest %</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 1%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Under 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 1%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 10%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 15%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 20%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>}/>
                    <FilterCard
                        title={<h3>Analyst Ratings</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Buy</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Hold</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Mixed</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Sell</label>
                        </>} />
                    <FilterCard
                        title={<h3>Dividend Yield</h3>}
                        options={
                        <>
                            <input type="radio" name="avg_volume" /><label htmlFor="">None</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">2% or Less</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 2%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Over 5%</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </>} />
                    <FilterCard
                        title={<h3>Trailing PE Ratio</h3>}
                        options={
                        <div>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 0</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 5</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 15</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 20</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Less than 20</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Less than 50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </div>} />
                    <FilterCard
                        title={<h3>htmlForward PE Ratio</h3>}
                        options={<div>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 0</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 5</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 15</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 20</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Less than 20</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Less than 50</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </div>} />
                    <FilterCard
                        title={<h3>Price to Book Ratio</h3>}
                        options={<div>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Less than 5</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">More than 5</label>
                            <input type="radio" name="avg_volume" /><label htmlFor="">Custom Range</label>
                        </div>} />
                </div>
            </div>
            <div className="all-stocks">
                <div className="screener-header">
                    <h2>{screener?.name || "All Stocks"}</h2>
                    {<p>{allStocks?.length} items</p>}{/*· Updated */}
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
                    {allStocks?.map((stock) => (
                        <tr className="stock-card" onClick={() => navigate(`/stocks/${stock.ticker}`)} key={stock.ticker}>
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
                                    buttonText={<FaPlus/>}
                                    modalComponent={<AddToWatchlistModal stock={stock} ticker={stock.ticker}/>}/>
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
