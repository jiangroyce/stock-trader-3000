import { NavLink } from "react-router-dom"
export default function AccountNavBar() {
    return (
        <ul className="account-navbar">
            <li className="account-navbar-item"><NavLink to="summary">Summary</NavLink></li>
            <li className="account-navbar-item"><NavLink to="transfers">Transfers</NavLink></li>
            <li className="account-navbar-item"><NavLink to="watchlists">Watchlists</NavLink></li>
            <li className="account-navbar-item"><NavLink to="screeners">Screeners</NavLink></li>
            <li className="account-navbar-item"><NavLink to="strategies">Strategies</NavLink></li>
            <li className="account-navbar-item"><NavLink to="history">History</NavLink></li>
        </ul>
    )
}
