import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { putWatchlist, fetchWatchlists, fetchWatchlist } from "../../redux/watchlist";
import Watchlists from "../Watchlists";
import "./SingleWatchlist.css"

function SingleWatchlist() {
    const { listId } = useParams();
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const watchlists = useSelector((state) => state.watchlists);
    const watchlist = watchlists[listId] ? watchlists[listId] : null;
    const [name, setName] = useState(watchlist?.name);
    const [errors, setErrors] = useState({})

    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})


    useEffect(() => {
        dispatch(fetchWatchlists())
        dispatch(fetchWatchlist(listId)).then(setName(watchlist?.name))
    }, [dispatch, watchlist?.name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(putWatchlist({name, "list_number": listId}));
        if (response?.errors) {
            setErrors(response.errors)
        }
    }

    return (
        <>
        {watchlist && user && (
            <div className="single-watchlist">
                <div className="watchlist-details">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={handleSubmit}
                        />
                    <table className="watchlist-stocks">
                        <thead>
                            <tr>
                                <th scope="col">Ticker</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Sector</th>
                                <th scope="col">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist?.stocks?.map((stock, index) => (
                                <tr key={index}>
                                    <th scope="row">{stock?.ticker}</th>
                                    <td>{stock?.name}</td>
                                    <td>{stock?.price ? currencyFormat.format(stock.price): "-"}</td>
                                    <td>{stock?.sector}</td>
                                    <td>{stock?.market_cap ? currencyFormat.format(stock.market_cap) + "M": "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Watchlists watchlists = {watchlists} />
            </div>
        )}
        </>
    );
}

export default SingleWatchlist
