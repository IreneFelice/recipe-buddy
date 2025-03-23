import {useForm} from "react-hook-form";
import {useEffect, useState} from 'react';
import styles from './SearchDashboard.module.css';
import CustomButton from '../buttons/button/CustomButton.jsx';
import dashboardBackground from '../../assets/dashboard-background.png';
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
            healthy: {level: '3', label: "Not too (un)healthy", maxGI: '45', maxFASAT: '6', minFIBTG: '3', maxFAMS: '10'},
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
            <div className={styles['dashboard-outer-container']}>
                <h2>Search Dashboard</h2>
                <div className={styles['dashboard-border-image-container']}>
                    <img src={dashboardBackground} alt='animated border'/>
                </div>
                <div className={styles['input-outer-container']}>
                    <div className={styles['input-inner-container']}>
                        <form onSubmit={handleSubmit(handleSearchSubmit)}>
                            <section className={styles['first-section']}>
                                <MealType register={register}/>
                            </section>
                            <div className={styles['dashboard-inner-container-1']}>
                                <div className={styles['dashboard-inner-container-2']}>
                                    <div className={styles['dashboard-inner-container-3']}>
                                        <section className={styles['second-section']}>
                                            <IngredientPicker
                                                selectedIngredients={selectedIngredients}
                                                setSelectedIngredients={setSelectedIngredients}
                                                excludedIngredients={excludedIngredients}
                                                setExcludedIngredients={setExcludedIngredients}
                                            />
                                        </section>
                                        <div className={styles['dashboard-inner-container-4']}>
                                            <section className={styles['third-section']}>
                                                <MultiselectDiet register={register} setValue={setValue} getValues={getValues}/>
                                            </section>
                                            <section className={styles['fourth-section']}>
                                                <VeggieCheck register={register} setValue={setValue} getValues={getValues}/>
                                            </section>
                                        </div>
                                    </div>
                                    <section className={styles['fifth-section']}>
                                        <DifficultySlider setValue={setValue}/>
                                    </section>
                                </div>
                                <section className={styles['sixth-section']}>
                                    <HealthSlider setValue={setValue} register={register}/>
                                </section>
                            </div>

                            <div className={styles['button-container']}>
                                <CustomButton
                                    color='mint' type='submit'
                                    text={searchedResults ? "Search again" : "Search recipes!"}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDashboard;