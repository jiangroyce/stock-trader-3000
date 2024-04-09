import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlists, createWatchlist, addToList, deleteFromList, fetchListsWStocks } from "../../redux/watchlist";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState} from "react";
import "./AddToWatchlistModal.css";
import { useNavigate } from "react-router-dom";
import WatchlistCheckCard from "./WatchlistCheckCard";
import Loading from "../Loading";

export default function AddToWatchlistModal({stock, ticker}) {
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const watchlists = useSelector(state => state.watchlists);
    const [initialList, setInitialList] = useState(null);
    const [lists, setLists] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let item of lists) if (!initialList.includes(item)) {
            const payload = {
                name: watchlists[item].name,
                list_number: item,
                stock_ticker: stock.ticker
            };
            const response = await dispatch(addToList(payload));
            if (response?.errors) setErrors(response.errors);
        }
        for (let item of initialList) if (!lists.includes(item)) {
            const payload = {
                name: watchlists[item].name,
                list_number: item,
                stock_ticker: stock.ticker
            };
            const response = await dispatch(deleteFromList(payload));
            if (response?.errors) setErrors(response.errors);
        }
        closeModal();
    };

    const createList = async (e) => {
        e.preventDefault();
        setErrors({})
        setClick(false);

        const response = await dispatch(createWatchlist({name}));

        if (response?.errors) {
          setErrors(response.errors)
        } else {
            const payload = {
                name: response.name,
                list_number: response.list_number,
                stock_ticker: stock.ticker
            }
            const addToListResponse = await dispatch(addToList(payload));
            if (addToListResponse?.errors) setErrors(addToListResponse.errors);
            else {
                checkedLists.push(payload.list_number)
                setLists([...lists, payload.list_number])
                setName("");
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchWatchlists())
            const checkedLists = await dispatch(fetchListsWStocks(ticker));
            setLists([...checkedLists])
            setInitialList([...checkedLists])
            setIsLoaded(true)
        }
        loadData()
    }, [dispatch]);

    if (!isLoaded || lists === undefined) {
        return <Loading />}
    else return (
        <div className="add-stock-modal">
            <h2>Add {stock.ticker} to Your Lists</h2>
            <div className={"create-watchlist " + (click ? "hidden" : "")} onClick={() => setClick(true)}>
                <FaPlus />
                Create New List
            </div>
            <div className={"create-watchlist-form " + (!click ? "hidden" : "")}>
            <form onSubmit={createList} onReset={() => {
                setClick(false);
                setName("");
                }}>
                <label>
                List name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <div className="actions">
                    <button type="reset">Cancel</button>
                    <button type="submit">Create List</button>
                </div>
            </form>
            </div>
            {/* change to object.entries check key if number and less than 20000 */}
            <div className="watchlist-card-container">
                {Object.entries(watchlists).map(([id, watchlist], index) => {
                    if (id < 20000) return (
                        <WatchlistCheckCard watchlist={watchlist} lists={lists} setLists={setLists} key={index}/>
                )})}
            </div>
            <button onClick={handleSubmit}>Save Changes</button>
        </div>
    )
}
