import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function FilterCard({title, options}) {

    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open)
    return (
        <div className="filter-card">
            <div className="filter-header">
                {title}
                <button onClick={toggle}>{ open ? (<FaChevronUp />) : (<FaChevronDown />) }</button>
            </div>
            {open && <div>{options}</div>}
        </div>
    )
}

export default FilterCard;
