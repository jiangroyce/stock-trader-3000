import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import ProfileButton from "./ProfileButton";
import { FaSearch } from "react-icons/fa";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const loggedIn = useSelector((state) => state.session.user);

  return (
    <ul className="nav-bar">
      <li className="landing-logo">
        <NavLink to="/"><h1>Stonk Trader 3000</h1></NavLink>
      </li>

      {loggedIn ?
        (
          <>
          <SearchBar />
          <li>
            <ProfileButton />
          </li>
          </>
        )  :
        (
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
        )
      }

    </ul>
  );
}

export default Navigation;
