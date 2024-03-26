import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  return (
    <ul>
      <li>
        <NavLink to="/"><img className="landing-logo" src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" alt="stonk-trader-logo" /></NavLink>
      </li>

      <li className="stock-search">
        <FaSearch />
        <input type="search" placeholder="Search for stocks"/>
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
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )
      }

    </ul>
  );
}

export default Navigation;
