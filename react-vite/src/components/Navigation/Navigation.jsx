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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.session.user);

  return (
    <ul className="nav-bar">
      <li className="landing-logo">
        <NavLink to="/"><h1>Stonk Trader 3000</h1></NavLink>
      </li>

      <li className="stock-search">
        <SearchBar />
      </li>

      {loggedIn ?
        (
          <li>
            <ProfileButton />
          </li>
        )  :
        (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </>
        )
      }

    </ul>
  );
}

export default Navigation;
