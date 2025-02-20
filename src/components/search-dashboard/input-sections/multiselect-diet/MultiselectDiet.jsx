import { useState } from 'react';
import styles from './MultiselectDiet.module.css';

function MultiselectDiet({ register }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const options = ['vegetarian', 'vegan', 'gluten-free'];

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div className={styles['multi-select-dropdown']}>
            <div className={styles['dropdown-display']} onClick={toggleDropdown}>
                Click to choose diet wishes <span id='dropdown-arrow'>{dropdownOpen ? '▲' : '▼'}</span>
            </div>
            {dropdownOpen && (
                <div className={`${styles['dropdown-options']} ${styles.open}`}>
                    {options.map((option) => (
                        <label key={option} className={styles['dropdown-option']}>
                            <input type='checkbox' value={option} {...register('diet')} />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiselectDiet;