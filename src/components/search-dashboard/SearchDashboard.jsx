import {useState} from "react";
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";

function SearchDashboard({passUrl}) {

    //----- DIET PREFERENCES ------//
    const [mealTypeParams, setMealTypeParams] = useState('');
    const [dietParams, setDietParams] = useState('');
    const excludedFood = "eggplant";

    console.log("mealTypeParams: ", mealTypeParams);
    // console.log("excludedFood: ", excludedFood);
    console.log("dietParams: ", dietParams);

    //------ DIFFICULTY -------//
    // ingr (number of ingredients)
    // time

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
        const baseUrl = 'https://api.edamam.com/api/recipes/v2';
        const queryParams = [
            'type=public',
            `app_id=${import.meta.env.VITE_API_ID}`,
            `app_key=${import.meta.env.VITE_API_KEY}`,
            'random=true',
            `mealType=${mealTypeParams}`,
            `excluded=${excludedFood}`,
            `health=${dietParams}`,
            'health=alcohol-free',
            'field=uri',
            'field=label',
            'field=image',
            'field=source',
            'field=url',
            // 'field=ingredientLines',
            // 'field=healthLabels',
            'field=ingredients',
            // 'field=totalTime',
            // 'field=mealType',
            // 'field=glycemicIndex',
            // 'field=calories',
            // 'field=inflammatoryIndex',
            // 'field=totalNutrients',
            // 'field=digest',
            // 'field=externalId',
        ].join('&');

        const fullUrlInput = `${baseUrl}?${queryParams}`;
        console.log("queryParams:", queryParams);
        passUrl(fullUrlInput);
    }

    return (
        <>
            <form onSubmit={handleSearchSubmit}>
                <MealType passParams={setMealTypeParams}/>
                <MultiselectDiet passParams={setDietParams}/>

                <button type="submit">Search recipes!</button>

            </form>
        </>

    )
}

export default SearchDashboard;