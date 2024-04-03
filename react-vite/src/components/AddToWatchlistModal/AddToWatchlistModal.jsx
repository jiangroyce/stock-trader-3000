import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlists, createWatchlist, addToList, deleteFromList } from "../../redux/watchlist";
import { FaLightbulb, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./AddToWatchlistModal.css";

export default function AddToWatchlistModal({stock, checkedLists}) {
    const dispatch = useDispatch();
    const [click, setClick] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const watchlists = useSelector(state => state.watchlists);
    const [lists, setLists] = useState(checkedLists || null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let item of lists) if (!checkedLists.includes(item)) {
            const payload = {
                name: watchlists[item].name,
                list_number: item,
                stock_ticker: stock.ticker
            };
            const response = await dispatch(addToList(payload));
            if (response?.errors) setErrors(response.errors);
        }
        for (let item of checkedLists) if (!lists.includes(item)) {
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
                setClick(false);
                setName("");
            }
        };
    };

    const handleCheck = async (e) => {
        const index = lists.indexOf(Number(e.target.value))
        if (index !== -1) {
            const newList = lists.splice(index, 1)
            setLists([...lists])
        } else {
            setLists([...lists, Number(e.target.value)])
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchWatchlists())
            setIsLoaded(true)
        }
        loadData()
    }, [dispatch]);

    // No checked lists with stock will cause always laoding
    if (!isLoaded || !lists) return <h1>Loading</h1>
    else return (
        <div className="preview-order">
            <h2>Add {stock.ticker} to Your Lists</h2>
            <div className={"create-watchlist " + (click ? "hidden" : "")} onClick={() => setClick(true)}>
                <FaPlus />
                Create New List
            </div>
            <div className={"create-watchlist " + (!click ? "hidden" : "")}>
            <form onSubmit={createList} onReset={() => {
                setClick(false);
                setName("");
                }}>
        <label>
          List name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <button type="reset">Cancel</button>
        <button type="submit">Create List</button>
      </form>
            </div>
            {Object.values(watchlists).map((watchlist, index) => {
                if (index < Object.values(watchlists).length - 1) return (
                    <div className="watchlist-card" key={index}>
                        <input type="checkbox"  value={watchlist.list_number} onChange={handleCheck} checked={lists?.includes(watchlist.list_number)}/>
                        <div className="watchlist-info-card">
                            <FaLightbulb />
                            <div className="watchlist-info">
                                <div className="watchlist-name">{watchlist?.name}</div>
                                <div className="watchlist-length">{watchlist?.stocks?.length} item(s)</div>
                            </div>
                        </div>
                    </div>
            )})}
            <button onClick={handleSubmit}>Save Changes</button>
        </div>
    )
}
