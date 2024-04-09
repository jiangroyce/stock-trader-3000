import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function FilterCard({title, options, callback, filters, setFilters, attr, setSelected, selected, setAllStocks}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [custom, setCustom] = useState(false);

    const toggle = () => setOpen(!open);

    const handleSelect = (e) => {
        setAllStocks([])
        setFilters(
            {
                ...filters,
                [attr]: callback(e.target.value)
            })
        setSelected({
            ...selected,
            [attr]: e.target.value
        })
    }
    return (
        <div className="filter-card">
            <div className="filter-header">
                {title}
                <button onClick={toggle}>{ open ? (<FaChevronUp />) : (<FaChevronDown />) }</button>
            </div>
            {open && <fieldset onChange={e => handleSelect(e)}>{options}</fieldset>}
        </div>
    )
}

export default FilterCard;


                            {/* <button onClick={() => {
                                setFilters([...filters, f.avg_volume("<", 1000000)])
                            }}>Under 1,000,000</button> */}
