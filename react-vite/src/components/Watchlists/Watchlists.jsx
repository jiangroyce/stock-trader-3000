import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateWatchlistModal from "../CreateWatchlistModal";
import WatchlistCard from "./WatchlistCard";
import "./Watchlists.css";

function Watchlists({watchlists}) {
    return (
        <div className="watchlists-container">
            <div className="watchlists-header">
                <h2>Watchlists</h2>
                <OpenModalMenuItem
                    itemText="+"
                    modalComponent={<CreateWatchlistModal />}
                />
            </div>
            {Object.values(watchlists)?.map((watchlist, index) => (
                <WatchlistCard watchlist={watchlist} key={index} />
            ))
            }
        </div>
    )
}

export default Watchlists
