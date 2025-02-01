import { useForm } from "react-hook-form";
import './SearchDashboard.css';
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import createSearchQuery from "../../helpers/createSearchQuery.js";

function SearchDashboard({ passUrl }) {
    const { register, handleSubmit, setValue} = useForm({
        defaultValues: {
            meal: [],
            diet: [],
            difficulty: { time: "0-15", ingr: "1-5" }
        }
    });

    const excludedFood = "eggplant";

    const onSearchSubmit = (data) => {
        console.log(data, "=data");
        const fullUrlInput = createSearchQuery({
            mealTypeParams: data.meal,
            dietParams: data.diet,
            difficulty: data.difficulty,
            excludedFood,
        });

        passUrl(fullUrlInput);
    };

    return (
        <div className="dashboard-outer-container">
            <form onSubmit={handleSubmit(onSearchSubmit)}>
                <div className="input-container">
                    <MealType register={register} />
                    <MultiselectDiet register={register} />
                    <DifficultySlider setValue={setValue} />
                </div>
                <div className="button-container">
                    <button type="submit">Search recipes!</button>
                </div>
            </form>
        </div>
    );
}

export default SearchDashboard;