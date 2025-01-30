import {useEffect, useState} from "react";

// Checkbox: Meal type select (breakfast, dinner, lunch)

function MealType({passParams}) {
    const [selectedMealTypes, setSelectedMealTypes] = useState([]);
    const mealTypeParams = selectedMealTypes.map((mealType) => mealType.toLowerCase()).join('&mealType=');

    const handleMealTypeChange = (mealType) => {
        setSelectedMealTypes((prevMealTypes) => {
            if (prevMealTypes.includes(mealType)) {
                return prevMealTypes.filter((type) => type !== mealType);
            } else {
                return [...prevMealTypes, mealType];
            }
        });
    };

    useEffect(() => {
        passParams(mealTypeParams);
    }, [mealTypeParams]);


    return (
        <>
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
        </>)
}

export default MealType;