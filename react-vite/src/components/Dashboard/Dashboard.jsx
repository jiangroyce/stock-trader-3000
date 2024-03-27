import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolio } from "../../redux/portfolio";
import { fetchWatchlists } from "../../redux/watchlist";
import { Navigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateWatchlistModal from "../CreateWatchlistModal";
import "./Dashboard.css"


function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const portfolio = useSelector((state) => state.portfolio.portfolio)
    const watchlists = useSelector((state) => state.watchlist.watchlists)
    useEffect(() => {
        dispatch(fetchPortfolio());
        dispatch(fetchWatchlists());
    }, [dispatch])
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})

    return (
        <div className="dashboard">
            { user ? (
            <>
                <div className="dashboard-left">
                    <div className="portfolio-container">
                        <h2>Portfolio</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Ticker</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Last Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total $ Change</th>
                                    <th scope="col">Total % Change</th>
                                    <th scope="col">Current Value</th>
                                    <th scope="col">% of Portfolio</th>
                                    <th scope="col">Avg Cost Basis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {portfolio?.map((order, index) => (
                                    <tr key={index}>
                                        <th scope="row">{order.ticker}</th>
                                        <td>{order.name}</td>
                                        <td>{order.price? currencyFormat.format(order.price): "-"}</td>
                                        <td>{order.quantity || "-"}</td>
                                        <td>{order["GL%"] ? currencyFormat.format(order["GL$"]) : "-"}</td>
                                        <td>{order["GL%"] ? (order["GL%"] * 100).toFixed(2) + "%": "-"}</td>
                                        <td>{currencyFormat.format(order.value)}</td>
                                        <td>{(order.portfolio_weight * 100).toFixed(2)}%</td>
                                        <td>{order.cost_basis ? currencyFormat.format(order.cost_basis) : "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="market-snapshot-container">
                        <h2>Market Snapshot</h2>
                        <div className="market-snapshot">
                            <div className="market-info">S&P 500</div>
                        </div>
                    </div>
                    <div className="daily-movers-container">
                        <h2>Daily Movers</h2>
                        <div className="daily-movers">
                            <div className="daily-mover-info">
                                GME | +420%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-right">
                    <div className="watchlists-container">
                        <div className="watchlists-header">
                            <h2>Watchlists</h2>
                            <OpenModalMenuItem
                                itemText="+"
                                onItemClick={() => null}
                                modalComponent={<CreateWatchlistModal />}
                            />
                        </div>
                        {watchlists?.map((watchlist, index) => (
                            <div className="watchlist" key={index}>
                                <div className="watchlist-title">
                                    <h3>{watchlist.name}</h3>
                                    <button>Expand</button>
                                </div>
                                <div className="watchlist-info">
                                    {watchlist.stocks.map((stock, index) => (
                                        <div className="watchlist-stock" key={index}>
                                            {stock.ticker} | {stock.name} | {currencyFormat.format(stock.price)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </>) :
            (
                <Navigate to="/" />
            )
            }
        </div>
    )
}

export default Dashboard
