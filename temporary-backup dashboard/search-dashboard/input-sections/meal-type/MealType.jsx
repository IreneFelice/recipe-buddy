import styles from './MealType.module.css';

// Checkbox: MealType select (breakfast, dinner, lunch)
function MealType({ setValue, register }) {
    const mealTypes = ['breakfast', 'lunch', 'dinner'];

    return (
        <div className={styles['mealtype-checkbox']}>
            {mealTypes.map((meal) => (
                <div key={meal}>
                    <input
                        type='checkbox'
                        id={`mealType-${meal}`}
                        value={meal}
                        className={styles['meal-input']}
                        {...register('mealType')}
                    />
                    <label htmlFor={`mealType-${meal}`}>{meal}</label>
                </div>
            ))}
        </div>
    );
}

export default MealType;

