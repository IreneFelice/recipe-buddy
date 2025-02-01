import { useState } from "react";
import './MultiselectDiet.css';

function MultiselectDiet({ register }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const options = ["vegetarian", "vegan", "gluten-free"];

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div className="multi-select-dropdown">
            <div className="dropdown-display" onClick={toggleDropdown}>
                {options.join(', ')} <span id="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </div>
            {dropdownOpen && (
                <div className="dropdown-options open">
                    {options.map((option) => (
                        <label key={option} className="dropdown-option">
                            <input type="checkbox" value={option} {...register("diet")} />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiselectDiet;