import "./SearchBar.css"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
function SearchBar() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);

    const fetchData = async (value) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        const results = await data.filter(user => {
            return value && user && user.name && user.name.toLowerCase().includes(value)
        });
        setResults(results)
    }

    const handleInput = (value) => {
        setInput(value);
        fetchData(value)
    }
    return (
        <div className="search-bar-container">
            <div className="input-container">
                <FaSearch />
                <input
                    placeholder="Search Stocks"
                    value={input}
                    onChange={(e) => handleInput(e.target.value)}
                    />
                </div>
            <div className="search-results">
                {results?.map((result, index) => (
                    <div key={index}>{result.name}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
