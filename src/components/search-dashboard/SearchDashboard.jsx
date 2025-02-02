import { useForm } from "react-hook-form";
import './SearchDashboard.css';
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import createSearchQuery from "../../helpers/createSearchQuery.js";

function SearchDashboard({ passUrl }) {
    const { register, handleSubmit, setValue} = useForm({
        defaultValues: {
            mealType: [],
            diet: [],
            difficulty: { time: "0-15", ingr: "1-5" }
        }
    });

    const excludedFood = "eggplant";

    const handleSearchSubmit = (data) => {
        console.log(data, "=data");
        const fullUrlInput = createSearchQuery({
            mealTypeParams: data.mealType,
            dietParams: data.diet,
            difficulty: data.difficulty,
            excludedFood,
        });
        console.log("url: ", fullUrlInput);
        passUrl(fullUrlInput);
    };

    return (
        <div className="dashboard-outer-container">
            <form onSubmit={handleSubmit(handleSearchSubmit)}>
                <MealType register={register} />
                <MultiselectDiet register={register} />
                <DifficultySlider setValue={setValue} />
                <button type="submit">Search recipes</button>
            </form>
        </div>
    );
}

export default SearchDashboard;