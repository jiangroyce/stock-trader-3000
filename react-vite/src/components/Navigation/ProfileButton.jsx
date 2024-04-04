import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";
import { clearPortfolio } from "../../redux/portfolio";
import { clearScreeners } from "../../redux/screener";
import { clearStocks } from "../../redux/stock";
import { clearWatchlists } from "../../redux/watchlist";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(clearPortfolio());
    dispatch(clearScreeners());
    dispatch(clearWatchlists());
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button onClick={toggleMenu} className="profile-button">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <h2>{user.name}</h2>
              <li><NavLink to="/account/summary" onClick={closeMenu}>Account</NavLink></li>
              <li><NavLink to="/account/transfers" onClick={closeMenu}>Transfers</NavLink></li>
              <li><NavLink to="/account/strategies" onClick={closeMenu}>Strategies</NavLink></li>
              <li><NavLink to="/account/history" onClick={closeMenu}>History</NavLink></li>
              <li><button onClick={logout}>Log Out</button></li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
