import { useSelector } from "react-redux";
import "./LandingPage.css";
import { NavLink, Navigate } from "react-router-dom";

function LandingPage() {
    const loggedIn = useSelector((state) => state.session.user)
    if (!loggedIn) {
        return (
        <>
            <h1>Welcome to Stonk Trader 3000</h1>
            <p>Please <NavLink to="/login">Login</NavLink> or <NavLink to="/signup">Sign up</NavLink> to get started!</p>
        </>
        )
    } else {
        return <Navigate to="/dashboard" />
    }
}

export default LandingPage
