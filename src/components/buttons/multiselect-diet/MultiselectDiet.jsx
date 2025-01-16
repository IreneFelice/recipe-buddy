import React, { useState } from 'react';
import './MultiselectDiet.css';

const MultiselectDiet = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev); //switch open/closed
    };

    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            // delete selected option
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            // add selected option
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="multi-select-dropdown">
            <div className="dropdown-display" onClick={toggleDropdown}>
                {selectedOptions.length > 0
                    ? selectedOptions.join(', ')
                    : 'Select options...'}
                <span id="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </div>
            {dropdownOpen && (
                <div className={`dropdown-options ${dropdownOpen ? 'open' : ''}`}>
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`dropdown-option ${
                                selectedOptions.includes(option) ? 'selected' : ''
                            }`}
                            onClick={() => toggleOption(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiselectDiet;