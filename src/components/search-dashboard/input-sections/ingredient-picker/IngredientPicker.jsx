import {useState} from "react";
import ingredientList from '/src/constants/ingredientList.js';
import styles from './IngredientPicker.module.css';
import CustomButton from '../../../button/CustomButton.jsx';

function IngredientPicker({toggleFavorite}) {
    const [availableIngredients, setAvailableIngredients] = useState(ingredientList);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [excludedIngredients, setExcludedIngredients] = useState([]);
    const [isFavoriteActive, toggleIsFavoriteActive] = useState(true);
    const [isDislikeActive, toggleIsDislikeActive] = useState(false);

    const handleSelect = (ingredient) => {
        if (selectedIngredients.includes(ingredient) || selectedIngredients.length >= 5) return;
        setSelectedIngredients([...selectedIngredients, ingredient]);
        setAvailableIngredients(availableIngredients.filter(item => item !== ingredient));
    };

    const handleRemove = (ingredient) => {
        setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
        setAvailableIngredients([...availableIngredients, ingredient]);
    };

    function handleButtonFav() {
        if (isFavoriteActive === false) {
            toggleIsFavoriteActive(!isFavoriteActive);
            toggleIsDislikeActive(!isDislikeActive);
        }
    }

    function handleButtonDislike() {
        if (isDislikeActive === false) {
            toggleIsDislikeActive(!isDislikeActive);
            toggleIsFavoriteActive(!isFavoriteActive);
        }
    }

    return (
        <div className={styles['picker-outer-container']}>
            <div className={styles['button-container']}>
                <CustomButton text='favorites' color={isFavoriteActive ? ('mint') : ('blue')}
                              onClick={handleButtonFav}/>
                <CustomButton text='disLike' color={isDislikeActive ? ('red') : ('blue')}
                              onClick={handleButtonDislike}/>
            </div>
            <div className={styles['picker-inner-container']}>
                {/* Selected ingredients */}
                {isFavoriteActive ? (
                    <div className={styles['column-fav-ingredients']}>

                        <ul className="space-y-2">
                            {selectedIngredients.map((ingredient) => (
                                <li key={ingredient}
                                    className="p-2 border rounded flex justify-between items-center bg-gray-200">
                                    {ingredient}
                                    <button className="ml-4 text-red-500" onClick={() => handleRemove(ingredient)}>✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>) : (
                    <div className={styles['column-placeholder']}><p>Click one of the buttons above to select your
                        favorite ingredients, or tell which ingredients you DON'T want to find.</p></div>)}

                {/* all available Ingredient */}
                <div className={styles['column-all-ingredients']}>

                    <ul className="grid grid-cols-2 gap-2">
                        {availableIngredients.map((ingredient) => (
                            <li key={ingredient}
                                className={styles['p-2 border rounded cursor-pointer hover:bg-gray-100']}
                                onClick={() => handleSelect(ingredient)}>
                                <p>{ingredient}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default IngredientPicker;
