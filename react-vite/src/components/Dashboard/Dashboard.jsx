import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Navigate, useNavigate, Link } from "react-router-dom";
import "./Dashboard.css"
import Watchlists from "../Watchlists";
import PortfolioChart from "./PortfolioChart";
import { fetchWatchlists } from "../../redux/watchlist";
import { fetchAllScreeners } from "../../redux/screener";
import Loading from "../Loading";
import { MoverCarousel } from "./MoverCarousel";
import { MarketCarousel } from "./MarketCarousel";
import { useData } from "../../context/DataContext";


function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loaded, loadData } = useData();
    const user = useSelector((state) => state.session.user);
    const watchlists = useSelector((state) => state.watchlists);
    const portfolioData = useSelector((state) => state.portfolio.history);
    const markets = useSelector((state) => state.markets.markets);
    const value = useSelector((state) => state.portfolio.portfolio_value);
    const cash = useSelector((state) => state.portfolio.purchasing_power);
    const gl = useSelector((state) => state.portfolio.day_gl);
    const ret = useSelector((state) => state.portfolio.day_ret);
    const news = useSelector((state) => state.markets.news);
    const movers = useSelector((state) => state.stocks.movers);
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
    document.title = "Dashboard | Stonk Trader 3000"
    useEffect(() => {
        if (!loaded) {
            loadData();
        }
        const loadOtherData = async () => {
            await dispatch(fetchWatchlists());
            await dispatch(fetchAllScreeners());
        }
        loadOtherData();
    }, [dispatch])

    if (!loaded) return <Loading />
    return (
        <div className="dashboard">
            { user ? portfolioData && markets && (
            <>
                <div className="dashboard-left">
                    <div className="portfolio-container">
                        <PortfolioChart portfolio={portfolioData} value={value} cash={cash} gl={gl} ret={ret}/>
                    </div>
                    <div className="cash-container">
                        <div>Buying Power</div>
                        <div>{currencyFormat.format(cash)}</div>
                    </div>
                    <div className="daily-movers-container">
                        <h2>Daily Movers</h2>
                        <h5>Stocks making the biggest moves today</h5>
                        <div className="daily-movers">
                            <MoverCarousel movers={movers} />
                        </div>
                    </div>
                    <div className="market-snapshot-container">
                        <h2>News</h2>
                        <MarketCarousel markets={markets} />
                        <div className="news-cards">
                            {news?.map((article, index) => (
                                <Link key={index} className="news-card" to={article.link} target="_blank">
                                    <h5 className="news-title">{article.publisher}  <span className="news-date">{article.date}</span></h5>
                                    <div className="news-info">
                                        <h3>{article.title}</h3>
                                        {article.thumbnail ? <img src={article.thumbnail} alt="news-thumbnail"/> : <div className="empty"/>}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
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
