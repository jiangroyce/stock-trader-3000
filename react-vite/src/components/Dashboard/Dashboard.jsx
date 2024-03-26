import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolio } from "../../redux/portfolio";
import "./Dashboard.css"


function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const portfolio = useSelector((state) => state.portfolio.portfolio)
    useEffect(() => {
        dispatch(fetchPortfolio());
    }, [dispatch])
    return (
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
                        {portfolio?.map((order) => (
                            <tr>
                                <th scope="row">{order.ticker}</th>
                                <td>{order.name}</td>
                                <td>$ {order.price.toFixed(2)}</td>
                                <td>{order.quantity}</td>
                                <td>$ {order["GL%"] ? order["GL$"] : "-"}</td>
                                <td>{order["GL%"] ? (order["GL%"] * 100).toFixed(2) + "%": "-"}</td>
                                <td>$ {order.value.toFixed(2).toLocaleString()}</td>
                                <td>{(order.portfolio_weight * 100).toFixed(2)}%</td>
                                <td>$ {order.cost_basis.toFixed(2)}</td>
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
                    <button>+</button>
                </div>
                <div className="watchlist">
                    <div className="watchlist-title">
                        <h3>My List 1</h3>
                        <button>Expand</button>
                    </div>
                    <div className="watchlist-info">
                        <div className="watchlist-stock">
                            TSLA | chart | $180 | +5%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
