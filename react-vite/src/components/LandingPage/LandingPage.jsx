import { useSelector } from "react-redux";
import "./LandingPage.css";
import { NavLink, Navigate } from "react-router-dom";

function LandingPage() {
    const loggedIn = useSelector((state) => state.session.user)
    if (!loggedIn) {
        return (
        <div className="landing-page">
            <img src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" alt="stonks-logo" />
            <h1>Welcome to Stonk Trader 3000</h1>
            <p>Please Login or Sign up to get started!</p>
            <p>Or check out what we offer!</p>
        </div>
        )
    } else {
        return <Navigate to="/dashboard" />
    }
}

export default LandingPage
