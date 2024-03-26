import "./Dashboard.css"

function Dashboard() {
    return (
        <>
        <div className="dashboard-left">
            <div className="portfolio-container">
                <h2>Portfolio</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Stock</th>
                            <th scope="col">Last Price</th>
                            <th scope="col">Today's $ Change</th>
                            <th scope="col">Today's % Change</th>
                            <th scope="col">Total $ Change</th>
                            <th scope="col">Total % Change</th>
                            <th scope="col">Current Value</th>
                            <th scope="col">% of Portfolio</th>
                            <th scope="col">Avg Cost Basis</th>
                        </tr>
                    </thead>
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
