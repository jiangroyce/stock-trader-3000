import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Plot from "react-plotly.js";
import "./StockDetails.css"
import { fetchStock } from "../../redux/stock";
function StockDetails() {
    const { ticker } = useParams();
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const stock = useSelector((state) => state.stocks)[ticker];

    const [isLoaded, setIsLoaded] = useState(false)
    const [orderType, setOrderType] = useState("Buy");
    const [quantityType, setQuantityType] = useState("Shares");
    const [quantity, setQuantity] = useState(0);
    const [orderLimit, setOrderLimit] = useState("Market");
    const [orderConditions, setOrderConditions] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);

    let total = quantityType == "Shares" ? quantity * stock?.price : quantity;

    const ref = useRef(null);
    const data = stock?.history;
    const [x, open, high, low, close] = [[],[],[],[],[]];
    data?.forEach(({ Date, Open, High, Low, Close }) => {
        x.push(Date);
        open.push(Number(Open));
        high.push(Number(High));
        low.push(Number(Low));
        close.push(Number(Close));
    })

    const calcTotal = (total) => setOrderTotal(total)
    const previewOrder = async (e) => {
        e.preventDefault();

    }

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchStock(ticker))
            setIsLoaded(true)
        }
        loadData();
    }, [dispatch, ticker])

    document.title = `${ticker} - $${stock?.price} Stonk Trader 3000`
    if (!isLoaded) return <h1>Loading</h1>
    else return (
        <>
        { stock && data && (
            <div className="stock-details-page">
                <div className="stock-details" ref={ref}>
                    <h1>{stock.name}</h1>
                    <h2>{currencyFormat.format(stock.price)}</h2>
                    <Plot
                        className="stock-chart"
                        data={[
                            {
                                x,
                                open,
                                high,
                                low,
                                close,
                                increasing: {line: {color: 'green'}},
                                decreasing: {line: {color: 'red'}},
                                line: {color: 'black'},
                                type: 'candlestick',
                                xaxis: 'x',
                                yaxis: 'y'
                            }]}
                        useResizeHandler={true}
                        layout={ {
                            margin: {
                                t: 0,
                                b: 0,
                                l: 50,
                                r: 0
                            },
                            hovermode: "x",
                            xaxis: {
                                autorange: true,
                                rangeslider: {
                                    visible: false
                                },
                                rangeselector: {
                                    x: -0.02,
                                    y: -0.1,
                                    buttons:
                                    [{
                                        step: 'month',
                                        stepmode: 'backward',
                                        count: 1,
                                        label: "1M"
                                    },
                                    {
                                        step: 'month',
                                        stepmode: 'backward',
                                        count: 6,
                                        label: "6M"
                                    },
                                    {
                                        step: 'year',
                                        stepmode: 'backward',
                                        count: 1,
                                        label: "1Y"
                                    },
                                    {
                                        step: 'all',
                                        label: "2Y"
                                    },
                                ]}
                            },
                            yaxis: {
                                tickprefix: "$ "
                            }
                        } }
                    />
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
                                <div>{stock.info.fullTimeEmployees.toLocaleString()}</div>
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
                            <div>{stock.sector}</div>
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
                                <div>{stock.info.trailingPE}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Dividend Yield</h3>
                                <div>{stock.info.dividendYield ? (stock.info.dividendYield * 100).toFixed(1) + "%" : "-"}</div>
                            </div>
                            <div className="stock-stat-card">
                                <h3>Avg Volume</h3>
                                <div>{stock.info.averageVolume}</div>
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
                    <form className="order-form" onSubmit={previewOrder}>
                        <div className="order-header">
                            <h2>Trade {ticker}</h2>
                            <div>Buying Power:</div>
                        </div>
                        <div className="order-types">
                            <div className={"order-type-button " + (orderType == "Buy" ? "selected" : "")} onClick={()=>setOrderType("Buy")}>Buy</div>
                            <div className={"order-type-button " + (orderType == "Sell" ? "selected" : "")} onClick={()=>setOrderType("Sell")}>Sell</div>
                        </div>
                        <div className="order-quantity">
                            <div className="order-types">
                            <div className={"order-type-button " + (quantityType == "Shares" ? "selected" : "")} onClick={()=>setQuantityType("Shares")}>Shares</div>
                            <div className={"order-type-button " + (quantityType == "Dollars" ? "selected" : "")} onClick={()=>setQuantityType("Dollars")}>Dollars</div>
                            </div>
                            <input
                                type="number"
                                placeholder={quantityType == "Shares" ? "# of Shares" : "$ Dollars"}
                                onBlur={() => calcTotal(total)}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <div className="order-limit">
                            <div className="order-types">
                                <div className={"order-type-button " + (orderLimit == "Market" ? "selected" : "")} onClick={()=>setOrderLimit("Market")}>Market</div>
                                <div className={"order-type-button " + (orderLimit == "Limit" ? "selected" : "")} onClick={()=>setOrderLimit("Limit")}>Limit</div>
                            </div>
                            <label>Time in Force<select/></label>
                            <label>Conditions<select/></label>
                        </div>
                        <div className="order-value">
                            Estimated Value: $ {orderTotal.toFixed(2)}
                        </div>
                        <button>Preview Order</button>
                    </form>
                    <button>Add to Watchlist</button>
                </div>
            </div>
        )}
        </>

    )
}

export default StockDetails
