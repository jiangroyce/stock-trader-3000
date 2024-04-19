import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolioHistory } from "../../redux/portfolio";
import { fetchWatchlists } from "../../redux/watchlist";
import { NavLink, Navigate } from "react-router-dom";
import "./Dashboard.css"
import Watchlists from "../Watchlists";
import PortfolioChart from "./PortfolioChart";
import { fetchAllScreeners } from "../../redux/screener";
import Loading from "../Loading";
import { fetchAllMarkets } from "../../redux/market";


function Dashboard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const watchlists = useSelector((state) => state.watchlists);
    const portfolioData = useSelector((state) => state.portfolio.history);
    const markets = useSelector((state) => state.markets.markets)
    const [loaded, setLoaded] = useState(false);
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
    document.title = "Dashboard | Stonk Trader 3000"
    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchPortfolioHistory());
            await dispatch(fetchWatchlists());
            await dispatch(fetchAllScreeners());
            await dispatch(fetchAllMarkets());
            setLoaded(true)
        }
        loadData();
    }, [dispatch])

    if (!loaded) return <Loading />
    return (
        <div className="dashboard">
            { user ? portfolioData && markets && (
            <>
                <div className="dashboard-left">
                    <div className="portfolio-container">
                        <h2>Portfolio</h2>
                        <PortfolioChart portfolio={portfolioData} />
                    </div>
                    <div className="market-snapshot-container">
                        <h2>Market Snapshot</h2>
                        <div className="market-snapshot-cards">
                            {markets?.map((market) => (
                                <div className="market-snapshot">
                                    <h3>{market.name}</h3>
                                    <p className={market.past_day_return > 0 ? "win" : "lose"}>{market.price}</p>
                                    <p className={market.past_day_return > 0 ? "win" : "lose"}>{(market.past_day_return * 100)?.toFixed(2)}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="daily-movers-container">
                        <h2>Daily Movers</h2>
                        <div className="daily-movers">
                            <div className="daily-mover-info">
                                GME | +420%
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="dashboard-right">
                    <Watchlists watchlists={watchlists}/>
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
