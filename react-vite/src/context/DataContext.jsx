import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolioHistory } from "../redux/portfolio";
import { fetchAllMarkets, fetchAllNews } from "../redux/market";
import { fetchMovers } from "../redux/stock";
import { fetchAllStocks } from "../redux/stock";

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const loadData = async () => {
        await dispatch(fetchPortfolioHistory());
        await dispatch(fetchAllMarkets());
        await dispatch(fetchAllNews());
        await dispatch(fetchMovers());
        await dispatch(fetchAllStocks());
        setLoaded(true)
    }
    return (
        <DataContext.Provider
            value={{ loaded, setLoaded, loadData }}
        >
            {children}
        </DataContext.Provider>
    );
}
