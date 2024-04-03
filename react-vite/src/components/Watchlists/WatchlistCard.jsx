import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CiCircleRemove, CiSettings } from "react-icons/ci";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditWatchlistModal from "../EditWatchlistModal/EditWatchlistModal";
import DeleteWatchlistModal from "../DeleteWatchlistModal";

function WatchlistCard({watchlist}) {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open)
    return (
        <div className="watchlist">
            <div className="watchlist-title">
                <NavLink to={`/watchlists/${watchlist.list_number}`}>{watchlist.name}</NavLink>
                <div className="edit-watchlist">
                <OpenModalMenuItem
                    itemText={<CiSettings />}
                    modalComponent={<EditWatchlistModal watchlist={watchlist}/>}
                />
                <OpenModalMenuItem
                    itemText={<CiCircleRemove />}
                    modalComponent={<DeleteWatchlistModal watchlist={watchlist}/>}
                />
                </div>
                <button onClick={toggle}>{ open ? (<FaChevronUp />) : (<FaChevronDown />) }</button>
            </div>
            {open && (<div className="watchlist-info">
                {watchlist.stocks?.map((stock, index) => (
                    <div className="watchlist-stock" key={index}>
                        {stock?.ticker} | {stock?.name} | {currencyFormat.format(stock?.price)}
                    </div>
                ))}
            </div>)}
        </div>
    )
}

export default WatchlistCard;
