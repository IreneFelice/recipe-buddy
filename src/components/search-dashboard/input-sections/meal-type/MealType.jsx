// Checkbox: MealType select (breakfast, dinner, lunch)
function MealType({ setValue, register }) {
    const mealTypes = ["breakfast", "lunch", "dinner"];

    return (
        <div>
            {mealTypes.map((meal) => (
                <div key={meal}>
                    <label htmlFor={`mealType-${meal}`}>{meal}</label>
                    <input
                        type="checkbox"
                        id={`mealType-${meal}`}
                        value={meal}
                        {...register("mealType")}
                    />
                </div>
            ))}
        </div>
    );
}

export default MealType;

