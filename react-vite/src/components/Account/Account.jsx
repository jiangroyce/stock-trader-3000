import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import AccountNavBar from "./AccountNavBar";
import "./Account.css"
function Account() {
    const user = useSelector(state => state.session.user)
    return (
        <div className="account-page">
            <h1>{user.name}</h1>
            <AccountNavBar/>
            <Outlet />
        </div>
        )
}

export default Account;
