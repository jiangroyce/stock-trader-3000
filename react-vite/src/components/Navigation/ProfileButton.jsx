import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle, FaSmileBeam, FaMoneyBill, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { ImLoop2 } from "react-icons/im";
import { thunkLogout } from "../../redux/session";
import { NavLink, useNavigate } from "react-router-dom";
import { clearPortfolio } from "../../redux/portfolio";
import { clearScreeners } from "../../redux/screener";
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

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(clearPortfolio());
    await dispatch(clearScreeners());
    await dispatch(clearWatchlists());
    await dispatch(thunkLogout());
    navigate("/")
    closeMenu();
  };

  return (
    <>
      <a onClick={toggleMenu} className="profile-button">
        Account
      </a>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <h2>{user.name}</h2>
              __________________________________________
              <li><NavLink to="/account/positions" onClick={closeMenu}><FaSmileBeam />Account</NavLink></li>
              <li><NavLink to="/account/transfers" onClick={closeMenu}><FaMoneyBill />Transfers</NavLink></li>
              <li><NavLink to="/account/strategies" onClick={closeMenu}><ImLoop2 />Strategies</NavLink></li>
              <li><NavLink to="/account/history" onClick={closeMenu}><FaHistory />History</NavLink></li>
              __________________________________________
              <li><a onClick={logout}><FaSignOutAlt />Log Out</a></li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
