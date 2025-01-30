import {useState} from "react";
import './SearchDashboard.css';
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import createSearchQuery from "../../helpers/createSearchQuery.js";

function SearchDashboard({passUrl}) {

    const [mealTypeParams, setMealTypeParams] = useState('');
    const [dietParams, setDietParams] = useState('');
    const [difficulty, setDifficulty] = useState({time: "0-15", ingr: "1-5"});
    const excludedFood = "eggplant";

    // ------ (UN)HEALTHY -----//
    // Calories
    // glycemicIndex
    // nutrients[SUGAR]
    // nutrients[SUGAR.added]
    // nutrients[VITC] // Vitaminen-C-score (relatief, % van ADH)
    // nutrients[FASAT] (verzadigde vetzuren, niet gezond)
    // nutrients[FAMS] (monounsaturated fats, wel gezond!)
    // nutrients[FIBTG] (fiber/vezels)
    // nutrients[PROCNT] (protein)

    function handleSearchSubmit(e) {
        e.preventDefault();

        const fullUrlInput = createSearchQuery({
            mealTypeParams,
            dietParams,
            difficulty,
            excludedFood,
        });

        passUrl(fullUrlInput);
    }

    return (
        <div className="dashboard-outer-container">
            <form onSubmit={handleSearchSubmit}>
                <div className="input-container">
                    <MealType passParams={setMealTypeParams}/>
                    <MultiselectDiet passParams={setDietParams}/>
                    <DifficultySlider onDifficultyChange={setDifficulty}/>
                </div>
                <div className="button-container">
                    <button type="submit">Search recipes!</button>
                </div>
            </form>
        </div>
    )
}

export default SearchDashboard;