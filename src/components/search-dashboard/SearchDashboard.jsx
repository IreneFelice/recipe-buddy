import { useForm } from "react-hook-form";
import styles from './SearchDashboard.module.css';
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import createSearchQuery from "../../helpers/createSearchQuery.js";
import HealthSlider from './input-sections/health-slider/HealthSlider.jsx';
import {useState} from 'react';

function SearchDashboard({ passUrl }) {
    const { register, handleSubmit, setValue} = useForm({
        defaultValues: {
            mealType: [],
            diet: [],
            difficulty: { time: '0-15', ingr: '1-5' },
            healthy: {},
        }
    });

    const excludedFood = "eggplant";
    const [searchedResults, toggleSearchedResults] = useState(false);

    const handleSearchSubmit = (data) => {
        const fullUrlInput = createSearchQuery({
            mealTypeParams: data.mealType,
            dietParams: data.diet,
            difficulty: data.difficulty,
            excludedFood,
        });
        console.log("url: ", fullUrlInput);
        passUrl(fullUrlInput);
        toggleSearchedResults(true);
    };

    return (
        <div className={styles['dashboard-outer-container']}>
            <form onSubmit={handleSubmit(handleSearchSubmit)}>
                <MealType register={register} />
                <MultiselectDiet register={register} />
                <DifficultySlider setValue={setValue} />
                <HealthSlider setValue={setValue} />
                <div className={styles['button-container']}>
                <button type='submit'>{searchedResults ? "Search again" : "Search recipes!"}</button>
                </div>
            </form>
        </div>
    );
}

export default SearchDashboard;