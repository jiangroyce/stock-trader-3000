import OpenModalButton from "../OpenModalButton";
import CreateWatchlistModal from "../CreateWatchlistModal";
import WatchlistCard from "./WatchlistCard";
import "./Watchlists.css";

function Watchlists({watchlists}) {
    return (
        <div className="watchlists-container">
            <div className="watchlists-header">
                <h2>Watchlists</h2>
                <OpenModalButton
                    buttonText="+"
                    modalComponent={<CreateWatchlistModal />}
                />
            </div>
            {Object.entries(watchlists)?.map(([key, watchlist], index) => {
                if (key != "lists") return (<WatchlistCard watchlist={watchlist} key={index} />)})
            }
        </div>
    )
}

export default Watchlists
