import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateWatchlistModal from "../CreateWatchlistModal";
import { CiCircleRemove, CiSettings } from "react-icons/ci";
import "./Watchlists.css"
import { NavLink } from "react-router-dom";
import EditWatchlistModal from "../EditWatchlistModal/EditWatchlistModal";
import DeleteWatchlistModal from "../DeleteWatchlistModal";
function Watchlists({watchlists}) {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})

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
                <div className="watchlist" key={index}>
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
                        <button>Expand</button>
                    </div>
                    <div className="watchlist-info">
                        {watchlist.stocks?.map((stock, index) => (
                            <div className="watchlist-stock" key={index}>
                                {stock?.ticker} | {stock?.name} | {currencyFormat.format(stock?.price)}
                            </div>
                        ))}
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Watchlists
