import {useState} from "react";
import MultiselectDiet from "../buttons/multiselect-diet/MultiselectDiet.jsx";


function SearchDashboard({passUrl}) {
    const [selectedMealTypes, setSelectedMealTypes] = useState([]); // State voor geselecteerde maaltijdtypes
    const excludedFood = "eggplant";

    function handleSearchSubmit(e) {
        e.preventDefault();
        passUrl(fullUrlInput);
    }

    // meal type select (breakfast, dinner, etc)
    const handleMealTypeChange = (mealType) => {
        setSelectedMealTypes((prevMealTypes) => {
            if (prevMealTypes.includes(mealType)) {
                return prevMealTypes.filter((type) => type !== mealType);
            } else {
                return [...prevMealTypes, mealType];
            }
        });
    };

    const mealTypeParams = selectedMealTypes.map((mealType) => `mealType=${mealType.toLowerCase()}`).join('&');

    const baseUrl = 'https://api.edamam.com/api/recipes/v2';
    const queryParams = [
        'type=public',
        `app_id=${import.meta.env.VITE_API_ID}`,
        `app_key=${import.meta.env.VITE_API_KEY}`,
        mealTypeParams,
        'health=alcohol-free',
        `excluded=${excludedFood}`,
        'random=true',
        'field=uri',
        'field=label',
        'field=image',
        'field=images',
        'field=source',
        'field=url',
        'field=shareAs',
        'field=yield',
        'field=dietLabels',
        'field=healthLabels',
        'field=ingredients',
        'field=totalTime',
        'field=mealType',
        'field=tags'
    ].join('&');

    const fullUrlInput = `${baseUrl}?${queryParams}`;



    return (
    <>
        <form onSubmit={handleSearchSubmit}>
            <div>
                <label htmlFor="mealTypeBreakfast">Breakfast</label>
                <input
                    type="checkbox"
                    id="mealTypeBreakfast"
                    name="mealType"
                    value="Breakfast"
                    checked={selectedMealTypes.includes('Breakfast')}
                    onChange={() => handleMealTypeChange('Breakfast')}
                />
            </div>
            <div>
                <label htmlFor="mealTypeLunch">Lunch</label>
                <input
                    type="checkbox"
                    id="mealTypeLunch"
                    name="mealType"
                    value="Lunch"
                    checked={selectedMealTypes.includes('Lunch')}
                    onChange={() => handleMealTypeChange('Lunch')}
                />
            </div>
            <div>
                <label htmlFor="mealTypeDinner">Dinner</label>
                <input
                    type="checkbox"
                    id="mealTypeDinner"
                    name="mealType"
                    value="Dinner"
                    checked={selectedMealTypes.includes('Dinner')}
                    onChange={() => handleMealTypeChange('Dinner')}
                />
            </div>
            <p>{selectedMealTypes}</p>

            <MultiselectDiet />

        <button type="submit">Search recipes!</button>
    </form>
    </>

    )
}

export default SearchDashboard;