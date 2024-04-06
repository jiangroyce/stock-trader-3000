import { FaChevronUp, FaChevronDown, FaLightbulb } from "react-icons/fa";
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
            <div className="watchlist-bar-header">
                <NavLink to={`/watchlists/${watchlist.list_number}`}><FaLightbulb />{watchlist.name}</NavLink>
                <div className="watchlist-right">
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
                    <button className="watchlist-expand" onClick={toggle}>{ open ? (<FaChevronUp />) : (<FaChevronDown />) }</button>
                </div>
            </div>
            {open && (<div className="watchlist-info">
                {watchlist.stocks?.map((stock, index) => (
                    <NavLink to={`/stocks/${stock?.ticker}`} className="watchlist-stock" key={index}>
                        <div>{stock?.ticker}</div>
                        <div>{stock?.name}</div>
                        <div>{currencyFormat.format(stock?.price)}</div>
                    </NavLink>
                ))}
            </div>)}
        </div>
    )
}

export default WatchlistCard;
