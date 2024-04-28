import OpenModalButton from "../OpenModalButton";
import CreateWatchlistModal from "../CreateWatchlistModal";
import WatchlistCard from "./WatchlistCard";
import { FaPlus } from "react-icons/fa";
import "./Watchlists.css";

function Watchlists({watchlists}) {
    return (
        <div className="watchlists-container">
            <div className="watchlists-header">
                <h2>Watchlists</h2>
                <OpenModalButton
                    buttonText={<FaPlus />}
                    modalComponent={<CreateWatchlistModal />}
                />
            </div>
            <div className="watchlist-cards">
                {Object.entries(watchlists)?.map(([key, watchlist], index) => {
                if (key != "lists") return (<WatchlistCard watchlist={watchlist} key={index} />)})}
            </div>
        </div>
    )
}

export default Watchlists
