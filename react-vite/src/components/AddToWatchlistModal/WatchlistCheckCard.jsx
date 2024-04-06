import { useRef } from "react"
import { FaLightbulb } from "react-icons/fa"

function WatchlistCheckCard({watchlist, lists, setLists}) {
    const checkRef = useRef(null);
    const handleCheck = async (e) => {
        const index = lists.indexOf(Number(e.target.value))
        if (index !== -1) {
            const newList = lists.splice(index, 1)
            setLists([...lists])
        } else {
            setLists([...lists, Number(e.target.value)])
        }
    }
    const handleClick = async () => {
        const prevState = checkRef.current.checked
        checkRef.current.checked = !prevState
        const index = lists.indexOf(Number(checkRef.current.value))
        if (index !== -1) {
            const newList = lists.splice(index, 1)
            setLists([...lists])
        } else {
            setLists([...lists, Number(checkRef.current.value)])
        }
    }
    return (
        <div className="watchlist-card">
            <input type="checkbox" ref={checkRef} value={watchlist.list_number} onChange={handleCheck} checked={lists?.includes(watchlist.list_number)}/>
            <div className="watchlist-info-card" onClick={handleClick}>
                <FaLightbulb />
                <div className="watchlist-info">
                    <div className="watchlist-name">{watchlist?.name}</div>
                    <div className="watchlist-length">{watchlist?.stocks?.length} item(s)</div>
                </div>
            </div>
        </div>
    )
}

export default WatchlistCheckCard
