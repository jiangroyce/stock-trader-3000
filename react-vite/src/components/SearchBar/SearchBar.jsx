import "./SearchBar.css"
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStocks } from "../../redux/stock";
import { NavLink } from "react-router-dom";

function SearchBar() {
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks.stocks)
    const [input, setInput] = useState("");
    const [tickers, setTickers] = useState([]);
    const [companies, setCompanies] = useState([]);

    const handleTickers = (value) => {
        const res = stocks?.filter(stock => value && stock && stock.ticker.toLowerCase().startsWith(value.toLowerCase())).slice(0, 5);
        setTickers(res);
    };

    const handleCompanies = (value) => {
        const res = stocks?.filter(stock => value && stock && stock.name.toLowerCase().startsWith(value.toLowerCase())).slice(0, 5);
        setCompanies(res);
    }

    const handleInput = (value) => {
        setInput(value);
        handleTickers(value);
        handleCompanies(value);
    };

    useEffect(() => {
        dispatch(fetchAllStocks());
    }, [dispatch]);

    return (
        <div className="search-bar-container">
            <FaSearch />
            <input
                placeholder="Search Stocks"
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                />
            {input && (<div className="search-results">
                {input && (<h2>Matched Tickers: </h2>)}
                {tickers?.map((result, index) => (
                    <NavLink onClick={() => setInput("")} key={index} to={`/stocks/${result.ticker}`}>{result.name} ({result.ticker})</NavLink>
                ))}
                {input && (<h2>Matched Names: </h2>)}
                {companies?.map((result, index) => (
                    <NavLink onClick={() => setInput("")} key={index} to={`/stocks/${result.ticker}`}>{result.name} ({result.ticker})</NavLink>
                ))}
            </div>)}
        </div>
    )
}

export default SearchBar
