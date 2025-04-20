import {useState, useEffect} from 'react';
import styles from './MultiselectDiet.module.css';

// "Special Diet"

function MultiselectDiet({register, setValue, getValues}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const options = ['dairy-free', 'egg-free', 'fish-free', 'gluten-free', 'tree-nut-free', 'peanut-free', 'pork-free', 'sesame-free', 'shellfish-free'];
    let timer;

    function handleMouseEnter() {
        // Clear timeout when mouse enters
        if (timer) {
            clearTimeout(timer);
        }
    }

    function handleMouseLeave() {
        // Start timer when the mouse leaves
        timer = setTimeout(() => {
            setDropdownOpen(false); // Close dropdown after 5 seconds
        }, 5000);
    }

    function toggleDropdown() {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div
            className={styles['multi-select-dropdown']}
            onMouseEnter={handleMouseEnter} // Stop timer when mouse enters
            onMouseLeave={handleMouseLeave} // Start timer when mouse leaves
        >

            <div className={styles['dropdown-display']} onClick={toggleDropdown}>
                {/*Title Dropdown:*/}
                Special diet
                <span id='dropdown-arrow'>{dropdownOpen ? '▲' : '▼'}</span>
            </div>

            <div className={`${styles['dropdown-options']} ${dropdownOpen ? styles.open : ''}`}>
                {options.map((option) => (
                    <label key={option} className={styles['dropdown-single-option']}>
                        <input
                            type='checkbox'
                            id={option}
                            className={styles['checkbox']}
                            value={option}
                            onChange={(e) => {
                                const currentDiet = getValues('diet') || [];
                                const checked = e.target.checked;
                                const updatedDiet = checked
                                    ? [...new Set([...currentDiet, option])]
                                    : currentDiet.filter(dietElement => dietElement !== option); // delete when unchecked
                                setValue('diet', updatedDiet);
                            }}
                        />
                        <span className={styles['option-label']}>{option}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default MultiselectDiet;