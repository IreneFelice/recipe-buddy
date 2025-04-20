import styles from './DifficultySlider.module.css';
import {useState} from 'react';

function DifficultySlider({setValue}) {
    const [level, setLevel] = useState(1);

    const difficultyLevels = {
        1: {time: '0-15', ingr: '1-5'},
        2: {time: '15-30', ingr: '5-10'},
        3: {time: '30-45', ingr: '10-15'},
        4: {time: '45-60', ingr: '15-20'},
        5: {time: '60%2B', ingr: '15%2B'}
    };

    const handleChange = (event) => {
        const newLevel = Number(event.target.value);
        setLevel(newLevel);
        setValue('difficulty', difficultyLevels[newLevel]);
    };

    const sliderClassName = `difficulty-slider level-${level}`;

    return (
        <div className={styles['slider-container']}>
            <p>Easy</p>
            <input
                type='range'
                min='1'
                max='5'
                defaultValue={1}
                onChange={handleChange}
                className={sliderClassName}
            />
            <p>Difficult</p>
        </div>
    );
}

export default DifficultySlider;
