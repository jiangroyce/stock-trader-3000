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
            {Object.values(watchlists)?.map((watchlist, index) => {
                if (index < Object.values(watchlists).length - 1) return (<WatchlistCard watchlist={watchlist} key={index} />)})
            }
        </div>
    )
}

export default Watchlists
