import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import 'react-range-slider-input/dist/style.css';


function FilterCard({title, options, callback, filters, setFilters, attr, setSelected, selected, setAllStocks, allStocks, min, max}) {
    const [open, setOpen] = useState(false);
    const [custom, setCustom] = useState(selected[attr]?.startsWith("custom"));
    const [value, setValue] = useState(selected[attr]?.startsWith("custom")? [selected[attr].split(" ")[1], selected[attr].split(" ")[2]] : [min, max])

    const toggle = () => setOpen(!open);

    const handleSelect = (e) => {
        if (isNaN(e.target.value)) {
            if (e.target.value != "custom") {
                setCustom(false)
                setValue([min, max])
                setAllStocks(allStocks)
                setFilters(
                    {
                        ...filters,
                        [attr]: callback(e.target.value)
                    })
                setSelected({
                    ...selected,
                    [attr]: e.target.value
                })
            } else {
                setSelected({
                    ...selected,
                    [attr]: e.target.value
                })
                setCustom(true)
            }
        } else null
    };
    const setMin = (e) => {
        const val = [...value]
        val[0] = e.target.value
        setValue(val)
    }
    const setMax = (e) => {
        const val = [...value]
        val[1] = e.target.value
        setValue(val)
    }
    const handleRange = (e) => {
        e.preventDefault();
        setSelected({
            ...selected,
            [attr]: `custom ${value[0]} ${value[1]}`
        })
        setFilters(
            {
                ...filters,
                [attr]: callback(`custom ${value[0]} ${value[1]}`)
            })
    }
    return (
        <div className="filter-card">
            <div className="filter-header">
                {title}
                <button onClick={toggle}>{ open ? (<FaChevronUp />) : (<FaChevronDown />) }</button>
            </div>
            {open && <fieldset onChange={e => handleSelect(e)}>
                {options}
                    {custom && (
                        <div className="custom-actions">
                            <div className="custom-inputs">
                                <input type="number" value={value[0]} onChange={(e) => setMin(e)} min={min} max={value[1]}/>
                                <input type="number" value={value[1]} onChange={(e) => setMax(e)} min={min} max={value[0]}/>
                            </div>
                        <RangeSlider
                        min={min} max={max} step={(max-min)/100} value={value} onInput={setValue}/>
                        <button onClick={e => handleRange(e)}>Apply</button>
                        </div>

                    )}
                </fieldset>}
        </div>
    )
}

export default FilterCard;
