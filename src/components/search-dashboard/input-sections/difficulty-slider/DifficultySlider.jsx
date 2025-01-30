import {useState} from "react";
import './DifficultySlider.css';

function DifficultySlider({onDifficultyChange}) {
    const [level, setLevel] = useState(1);

    const difficultyLevels = {
        1: {time: "0-15", ingr: "1-5"},
        2: {time: "15-30", ingr: "5-10"},
        3: {time: "30-45", ingr: "10-15"},
        4: {time: "45-60", ingr: "15-20"},
        5: {time: "60%2B", ingr: "15%2B"}, // "+" in url must be encoded as "%2B"
    };

    const handleChange = (event) => {
        const newLevel = Number(event.target.value);
        setLevel(newLevel);
        onDifficultyChange(difficultyLevels[newLevel]); // Update parent component
    };

    return (

        <div className="slider-container">
            <input
                type="range"
                min="1"
                max="5"
                value={level}
                onChange={handleChange}
                className="difficulty-slider"
            />
            <p>Difficulty <strong>{level}</strong> </p>
        </div>
    );
}

export default DifficultySlider;