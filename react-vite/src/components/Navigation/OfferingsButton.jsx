import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

function OfferingsButton({className}) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
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

  return (
    <>
      <a onClick={toggleMenu} className="offerings-button">
        What We Offer{showMenu ? <FaChevronUp /> : <FaChevronDown />}
      </a>
      {showMenu && (
        <ul className={className} ref={ulRef}>
            <NavLink to="/about">About Stonk Trader</NavLink>
            <NavLink to="/about/trading">Mock Trading</NavLink>
            <NavLink to="/about/research">Research</NavLink>
            <NavLink to="/about/future">Coming Soon</NavLink>
        </ul>
      )}
    </>
  );
}

export default OfferingsButton;
