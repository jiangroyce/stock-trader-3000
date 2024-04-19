import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStock } from "../../redux/stock";
import { fetchShares } from "../../redux/portfolio";
import OrderForm from "../OrderForm";
import OpenModalButton from "../OpenModalButton";
import AddToWatchlistModal from "../AddToWatchlistModal";
import StockChart from "./StockChart";
import "./StockDetails.css"
import Loading from "../Loading";

function StockDetails() {
    const { ticker } = useParams();
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const stock = useSelector((state) => state.stocks)[ticker];
    const portfolio = useSelector(state => state.portfolio);
    const ownedShares = portfolio[ticker];
    const [isLoaded, setIsLoaded] = useState(false)
    const ref = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchStock(ticker));
            await dispatch(fetchShares(ticker));
            setIsLoaded(true)
        }
        loadData();
    }, [dispatch, ticker])

    document.title = `${ticker} - $${stock?.price} Stonk Trader 3000`
    if (!isLoaded) return <Loading />
    else return (
        <>
        { stock && (
            <div className="stock-details-page">
                <div className="stock-details" ref={ref}>
                    <h1>{stock.name}</h1>
                    <h2>{currencyFormat.format(stock.price)}</h2>
                    <StockChart stock={stock} />
                    <div className="stock-about">
                        <h2>About</h2>
                        <div className="stock-about-content">{stock.info.longBusinessSummary}</div>
                        <div className="stock-info">
                            <div className="stock-info-card">
                                <h3>CEO</h3>
                                <div>{stock.info.companyOfficers[0].name}</div>
                            </div>
                            <div className="stock-info-card">
                                <h3>Employees</h3>
                                <div>{stock.info.fullTimeEmployees?.toLocaleString()}</div>
                            </div>
                            <div className="stock-info-card">
                                <h3>Headquarters</h3>
                                <div>{stock.info.city}, {stock.info.country}</div>
                            </div>
                            <div className="stock-info-card">
                            <h3>Industry</h3>
                            <div>{stock.info.industry}</div>
                        </div>
                        <div className="stock-info-card">
                            <h3>Sector</h3>
                            <div>{stock.info.sector}</div>
                        </div>
                        </div>
                    </div>
                    <div className="stock-statistics-container">
                        <h2>Key Statistics</h2>
                        <div className="stock-statistics">
                            <div className="stock-stat-card">
                                <h3>Market cap</h3>
                                <div>{currencyFormat.format(stock.market_cap/1000)}B</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Price-Earnings Ratio</h3>
                                <div>{stock.info.trailingPE?.toFixed(2)}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Dividend Yield</h3>
                                <div>{stock.info.dividendYield ? (stock.info.dividendYield * 100).toFixed(1) + "%" : "-"}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Avg Volume</h3>
                                <div>{stock.info.averageVolume.toLocaleString("en", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0})}
                                </div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Daily High</h3>
                                <div>{currencyFormat.format(stock.info.dayHigh)}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Daily Low</h3>
                                <div>{currencyFormat.format(stock.info.dayLow)}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Open Price</h3>
                                <div>{currencyFormat.format(stock.info.open)}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>52 Week High</h3>
                                <div>{currencyFormat.format(stock.info.fiftyTwoWeekHigh)}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>52 Week Low</h3>
                                <div>{currencyFormat.format(stock.info.fiftyTwoWeekLow)}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stock-actions">
                    <OrderForm stock={stock} ownedShares={ownedShares} />
                    <OpenModalButton
                        buttonText="Add to Watchlist"
                        modalComponent={<AddToWatchlistModal stock={stock} ticker={ticker}/>}
                    />
                </div>
            </div>
        )}
        </>

    )
}

export default StockDetails
