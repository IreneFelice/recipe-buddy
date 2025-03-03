import {useForm} from "react-hook-form";
import {useState} from 'react';
import styles from './SearchDashboard.module.css';
import MultiselectDiet from "./input-sections/multiselect-diet/MultiselectDiet.jsx";
import MealType from "./input-sections/meal-type/MealType.jsx";
import DifficultySlider from "./input-sections/difficulty-slider/DifficultySlider.jsx";
import createSearchQuery from "../../helpers/createSearchQuery.js";
import HealthSlider from './input-sections/health-slider/HealthSlider.jsx';
// import dashboardBorder from '../../assets/dashboard-border.png';
import dashboardBackground from '../../assets/dashboard-background.png';
import CustomButton from '../button/CustomButton.jsx';

function SearchDashboard({passUrl}) {
    const {register, handleSubmit, setValue} = useForm({
        defaultValues: {
            mealType: [],
            diet: [],
            difficulty: {time: '0-15', ingr: '1-5'},
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

    return (<>

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
                                            {/*< ingredient picker />*/}
                                            <p>Test Object 1</p>
                                        </section>
                                        <div className={styles['dashboard-inner-container-4']}>
                                        <section className={styles['third-section']}>
                                            <MultiselectDiet register={register}/>
                                        </section>
                                        <section className={styles['fourth-section']}>
                                            {/*< special diet />*/}
                                            <p>Test Object 2</p>
                                        </section>
                                    </div>
                                    </div>
                                    <section className={styles['fifth-section']}>
                                        <DifficultySlider setValue={setValue}/>
                                    </section>
                                </div>
                                <section className={styles['sixth-section']}>
                                    <HealthSlider setValue={setValue}/>
                                </section>
                            </div>

                            <div className={styles['button-container']}>
                                <CustomButton color='mint' type='submit' text={searchedResults ? "Search again" : "Search recipes!"}/>
                                {/*<button type='submit'>{searchedResults ? "Search again" : "Search recipes!"}</button>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchDashboard;