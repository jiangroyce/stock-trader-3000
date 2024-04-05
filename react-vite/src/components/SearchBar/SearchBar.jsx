import "./SearchBar.css"
import { FaSearch, FaPlus } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStocks } from "../../redux/stock";
import { fetchAllScreeners } from "../../redux/screener";
import { NavLink } from "react-router-dom";

function SearchBar() {
    const searchRef = useRef();
    const dispatch = useDispatch();
    const stocks = useSelector(state => state.stocks.stocks);
    const screeners = useSelector(state => state.screeners.screeners)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("");
    const [tickers, setTickers] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        if (!open) return;

        const closeMenu = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [open]);

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

    const handleExit = () => {
        setInput("");
        setOpen(false)
    }

    useEffect(() => {
        dispatch(fetchAllStocks());
        dispatch(fetchAllScreeners());
    }, [dispatch]);

    return (
        <div className="search-container">
            <div className="search-bar" ref={searchRef}>
                <FaSearch />
                <input
                    onFocus={() => setOpen(true)}
                    placeholder="Search Stocks"
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                    />
            </div>
            {!input ? (open && (<div className="search-results">
                <h2>Stock Screeners</h2>
                <div className="results-container">
                    <NavLink onClick={handleExit} to={`/screener`}><FaPlus />Custom Screener</NavLink>
                    {screeners?.map((screener, index) => (<NavLink onClick={handleExit} key={index} to={`/screener?id=${screener.id}`}>{screener.name}</NavLink>))}
                </div>
            </div>)) :
            (open && (<div className="search-results">
                {input && (<h2>Matched Tickers: </h2>)}
                {tickers?.map((result, index) => (
                    <NavLink onClick={handleExit} key={index} to={`/stocks/${result.ticker}`}>
                        <div>{result.ticker}</div>
                        <div>{result.name}</div>
                    </NavLink>
                ))}
                {input && (<h2>Matched Names: </h2>)}
                {companies?.map((result, index) => (
                    <NavLink onClick={handleExit} key={index} to={`/stocks/${result.ticker}`}>
                        <div>{result.ticker}</div>
                        <div>{result.name}</div>
                    </NavLink>
                ))}
            </div>))}
        </div>
    )
}

export default SearchBar
