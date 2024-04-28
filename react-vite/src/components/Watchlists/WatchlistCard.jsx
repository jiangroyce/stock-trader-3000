import { FaChevronUp, FaChevronDown, FaLightbulb } from "react-icons/fa";
import { CiCircleRemove, CiSettings } from "react-icons/ci";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditWatchlistModal from "../EditWatchlistModal/EditWatchlistModal";
import DeleteWatchlistModal from "../DeleteWatchlistModal";
import MiniChart from "./MiniChart";

function WatchlistCard({watchlist}) {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open)
    return (
        <div className="watchlist">
            <div className="watchlist-card-header">
                <NavLink to={`/watchlists/${watchlist.list_number}`}><div className="watchlist-lightbulb"><FaLightbulb /></div>{watchlist.name}</NavLink>
                <div className="watchlist-header-right">
                    <div className={watchlist.list_number < 20000 ? "edit-watchlist" : "hidden"}>
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
            {open && (<div className="watchlist-stocks">
                {watchlist.stocks?.map((stock, index) => (
                    <NavLink to={`/stocks/${stock?.ticker}`} className="watchlist-stock" key={index}>
                        <div style={{fontWeight: "bold"}}>{stock?.ticker}</div>
                        <MiniChart stock={stock} />
                        <div className="watchlist-stock-price">
                            <div>{currencyFormat.format(stock?.price)}</div>
                            <div style={{color: stock.past_day_return > 0 ? "green" : "red"}}>{(stock.past_day_return * 100).toFixed(2)}%</div>
                        </div>
                    </NavLink>
                ))}
            </div>)}
        </div>
    )
}

export default WatchlistCard;
