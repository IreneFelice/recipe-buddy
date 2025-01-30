import React, {useEffect, useState} from 'react';
import './MultiselectDiet.css';

//----- Dropdown diet-selector -----//
// API name for dietParams is health!

// Available health options from API:
//
// alcohol-cocktail
// alcohol-free
// celery-free
// crustacean-free
// dairy-free
// DASH
// egg-free
// fish-free
// fodmap-free
// gluten-free
// immuno-supportive
// keto-friendly
// kidney-friendly
// kosher
// low-fat-abs
// low-potassium
// low-sugar
// lupine-free
// Mediterranean
// mollusk-free
// mustard-free
// no-oil-added
// paleo
// peanut-free
// pescatarian
// pork-free
// red-meat-free
// sesame-free
// shellfish-free
// soy-free
// sugar-conscious
// sulfite-free
// tree-nut-free
// vegan
// vegetarian
// wheat-free

function MultiselectDiet({passParams}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dietParams = selectedOptions.map((dietOption) => dietOption.toLowerCase()).join('&health=');


    const options = ['vegetarian', 'vegan', 'gluten-free'];

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

    useEffect(() => {
        passParams(dietParams);
    }, [dietParams]);

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