import {useState} from 'react';
import ingredientList from '/src/constants/ingredientList.js';
import styles from './IngredientPicker.module.css';
import CustomButton from '../../../buttons/button/CustomButton.jsx';

function IngredientPicker({ selectedIngredients, setSelectedIngredients, excludedIngredients, setExcludedIngredients }) {
    const [availableIngredients , setAvailableIngredients] = useState(ingredientList);
    const [isFavoriteActive, toggleIsFavoriteActive] = useState(true);
    const [isDislikeActive, toggleIsDislikeActive] = useState(false);

    function handleSelectFav (ingredient) {
        if (selectedIngredients.length >= 1) return;
        {setSelectedIngredients([...selectedIngredients, ingredient])}
        setAvailableIngredients(availableIngredients.filter(item => item !== ingredient));
    };

    function handleSelectDislike (ingredient) {
        if (excludedIngredients.length >= 5) return;
        {setExcludedIngredients([...excludedIngredients, ingredient])}
        setAvailableIngredients(availableIngredients.filter(item => item !== ingredient));
    };

    const handleRemove = (ingredient) => {
        if (isFavoriteActive) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));}
        else {setExcludedIngredients(excludedIngredients.filter(item => item !== ingredient))};
        setAvailableIngredients([...availableIngredients, ingredient]); //put back ingredient
    };

    function handleButtonFav() {
        if (isFavoriteActive === false) {
            toggleIsFavoriteActive(true);
            toggleIsDislikeActive(false);
        }
    }

    function handleButtonDislike() {
        if (isDislikeActive === false) {
            toggleIsDislikeActive(true);
            toggleIsFavoriteActive(false);
        }
    }

    return (
        <div className={styles['picker-outer-container']}>
            <div className={styles['button-container']}>
                    <CustomButton text='favorite' color={isFavoriteActive ? ('mint-active') : ('blue')}
                       onClick={handleButtonFav}/>
                    <CustomButton text='disLike' color={isDislikeActive ? ('red-active') : ('blue')}
                         onClick={handleButtonDislike}/>
            </div>
            <div className={styles['picker-inner-container']}>
                {/* Selected favorite ingredients */}
                {isFavoriteActive && (
                    <div className={styles['column-fav-ingredients']}>
                        <ul>
                            {selectedIngredients.map((ingredient) => (
                                <li key={ingredient}>

                                    <button type='button' className={styles['close-button']} onClick={() => handleRemove(ingredient)}>
                                        <p>X</p>
                                    </button>

                                    <p>{ingredient}</p>

                                </li>
                            ))}
                        </ul>
                        <p className={styles['instruction']}>Pick 1 favorite ingredient</p>
                    </div>)}

                {/* Selected disliked ingredients */}
                {isDislikeActive && (
                    <div className={styles['column-dislike-ingredients']}>
                        <ul>
                            {excludedIngredients.map((ingredient) => (
                                <li key={ingredient}>

                                    <button type='button' className={styles['close-button']} onClick={() => handleRemove(ingredient)}>
                                        <p>X</p>
                                    </button>

                                   <p>{ingredient}</p>

                                </li>
                            ))}
                        </ul>
                        <p className={styles['instruction']}>Pick max 5 ingredients</p>
                    </div>)
                }

                {/* all available Ingredient */}
                <div className={styles['column-all-ingredients']}>
                    <ul>
                        {availableIngredients.map((ingredient) => (
                            <li key={ingredient}
                                onClick={() =>  {isFavoriteActive ? (handleSelectFav(ingredient)) : (handleSelectDislike(ingredient))} }
                                >
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
