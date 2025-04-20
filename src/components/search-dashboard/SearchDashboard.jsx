import {useForm} from "react-hook-form";
import {useEffect, useState} from 'react';
import styles from './SearchDashboard.module.css';
import CustomButton from '../buttons/button/CustomButton.jsx';
import createSearchQuery from "../../helpers/createSearchQuery.js";
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import VeggieCheck from './input-sections/veggie-check/VeggieCheck.jsx';
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import HealthSlider from './input-sections/health-slider/HealthSlider.jsx';
import IngredientPicker from './input-sections/ingredient-picker/IngredientPicker.jsx';


function SearchDashboard({passUrl}) {
    const {register, handleSubmit, setValue, getValues} = useForm({
        defaultValues: {
            mealType: [],
            diet: [],
            difficulty: {time: '0-15', ingr: '1-5'},
            healthy: {
                level: '3',
                label: "Not too (un)healthy",
                maxGI: '45',
                maxFASAT: '6',
                minFIBTG: '3',
                maxFAMS: '10'
            },
            includedFood: [],
            excludedFood: [],
        }
    });
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [excludedIngredients, setExcludedIngredients] = useState([]);
    const [searchedResults, toggleSearchedResults] = useState(false);

    useEffect(() => {
        setValue('includedFood', selectedIngredients);
        setValue('excludedFood', excludedIngredients);
        console.log("included, excluded: ", selectedIngredients, excludedIngredients);
    }, [selectedIngredients, excludedIngredients, setValue]);

    const handleSearchSubmit = (data) => {
        const fullUrlInput = createSearchQuery({
            mealTypeParams: data.mealType,
            dietParams: data.diet,
            difficulty: data.difficulty,
            healthy: data.healthy,
            includedFood: data.includedFood,
            excludedFood: data.excludedFood,
        });
        console.log("url: ", fullUrlInput);
        passUrl(fullUrlInput);
        toggleSearchedResults(true);
    };


    return (
        <>
            <h2>Search Dashboard</h2>
            <div className={styles['dashboard-outer-container']}>

                <form onSubmit={handleSubmit(handleSearchSubmit)} className={styles['form-grid-container']}>

                    <section className={styles.section1}>
                        <MealType
                            register={register}
                        />
                    </section>
                    <section className={styles.section2}>
                        <IngredientPicker
                            selectedIngredients={selectedIngredients}
                            setSelectedIngredients={setSelectedIngredients}
                            excludedIngredients={excludedIngredients}
                            setExcludedIngredients={setExcludedIngredients}
                        />
                    </section>
                    <section className={styles.section3}>
                        <MultiselectDiet
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </section>
                    <section className={styles.section4}>
                        <DifficultySlider
                            setValue={setValue}
                        />
                    </section>
                    <section className={styles.section5}>
                        <VeggieCheck
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                        />
                    </section>
                    <section className={styles.section6}>
                        <HealthSlider
                            setValue={setValue}
                            register={register}
                        />
                    </section>
                    <section className={styles.section7}>
                        <CustomButton
                            color='mint'
                            type='submit'
                            text={searchedResults ? 'Search again' : 'Search recipes!'}
                        />
                    </section>

                </form>
            </div>
        </>
    );
}

export default SearchDashboard;