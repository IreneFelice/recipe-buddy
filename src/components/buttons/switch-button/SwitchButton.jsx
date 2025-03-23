import {useState} from 'react';
import styles from './SwitchButton.module.css';

function SwitchButton({name, onToggle}) {
    const [isOn, toggleIsOn] = useState(false);

        // onClick: when switch is used, change isOn state to opposite in this component and in Parent as well via onToggle.
    function toggleSwitch() {
        toggleIsOn(prevState => {
                // save new state for use as argument in parent,
                // because 'isOn' state updates only after function ends:
            const newState = !prevState;
            // is onToggle property added? Use newState as argument:
            if (onToggle) {
                onToggle(name, newState);
            }
            return newState;  // !prevState
        });
    }

    return (
        <div className={styles['switch-container']}>
            <button
                className={`${styles['switch-button']} ${isOn ? styles['isOn'] : ''}`}
                type='button'
                onClick={toggleSwitch}
                >
                <div className={styles['switch-thumb']}></div>
                <span className={`${styles.indicator} ${isOn ? styles['isOn'] : ''}`}></span>
            </button>
            <p>{name}</p>
        </div>
    );
};

export default SwitchButton;