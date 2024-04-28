import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import ProfileButton from "./ProfileButton";
import OfferingsButton from "./OfferingsButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const loggedIn = useSelector((state) => state.session.user);

  return (
    <>
      {loggedIn ?
        <div className="nav-bar">
          <div className="nav-bar-left">
            <NavLink className="landing-logo" to="/"><img src="/stonks-logo.png" alt="stonks-logo" width="50px"/></NavLink>
          </div>
          <div className="nav-bar-middle">
            <SearchBar />
          </div>
          <div className="nav-bar-right">
            <OfferingsButton className={"offerings-dropdown-logged-in"} />
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
            <NavLink to={"/account/positions"}>Positions</NavLink>
            {/* <NavLink to={"/account/screeners"}>Screeners</NavLink>
            <NavLink to={"/account/strategies"}>Strategies</NavLink> */}
            <ProfileButton />
          </div>
        </div> :
        <div className="nav-bar">
          <div className="nav-bar-left">
            <NavLink className="landing-logo" to="/">Stonk Trader<img src="/stonks-logo.png" alt="stonks-logo" width="50px"/></NavLink>
            <OfferingsButton className={"offerings-dropdown"} />
          </div>
          <div className="logged-out">
            <OpenModalMenuItem
              className="log-in"
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className="log-out"
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
        </div>
      }
    </>
  );
}

export default Navigation;
