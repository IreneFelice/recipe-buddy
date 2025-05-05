import styles from './SearchResults.module.css';
import {useContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {SavedRecipesContext} from '../../context/SavedRecipesContext.jsx';
import CustomButton from '../buttons/button/CustomButton.jsx';
import IconSaved from '../../assets/icon-saved.svg';
import IconLoading from '../../assets/icon-loading.svg';
import {useNavigate} from 'react-router-dom';


function SearchResults({fullUrl, setFullUrl, onFirstResultsShown}) {
    const {
        savedBookRecipes,
        saveRecipe,
        prepareError,
        toggleReload,
        recipeError
    } = useContext(SavedRecipesContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const errorRef = useRef(null);
    const resultsRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [loadingSaveItems, setLoadingSaveItems] = useState({});

    const [searchResults, setSearchResults] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });
    const [zeroFound, toggleZeroFound] = useState(false);
    const maxTotal = 9;


    function handleReload() {
        setError('');
        toggleReload((prev) => !prev);
    }

    useEffect(() => {
        if (searchResults.length > 0 && onFirstResultsShown) {
            onFirstResultsShown();
        }
    }, [searchResults]);

    useEffect(() => {
        if (recipeError) {
            setError(recipeError);
        }
    }, [recipeError]);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [error]);

    /*** get max 6 new search results, when fullUrl received ***/
    useEffect(() => {
        if (!fullUrl) {
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;
        const timeOutLoading = setTimeout(() => {
            controller.abort();
            setLoading(false);
            setError("The search engine wasn't working, maybe try again?");
        }, 5000);

        async function getRecipes() {
            try {
                setError(''); //reset error
                setLoading(true);

                const response = await axios.get(fullUrl, {signal});
                const recipes = response.data.hits || [];

                // pick only 6 results:
                const slicedRecipes = recipes.slice(0, 6);
                setSearchResults(slicedRecipes);
                sessionStorage.setItem('searchResults', JSON.stringify(slicedRecipes));

                setFullUrl(''); // reset fullUrl
                clearTimeout(timeOutLoading);
                setLoading(false);
                toggleZeroFound(slicedRecipes.length === 0); // if 0 results, toggle zeroFound true:
            } catch (error) {
                console.error("Failed search request:", error);
                clearTimeout(timeOutLoading);
                setLoading(false);
                setError("The search engine was glitching, maybe try again?");
            }
        }

        void getRecipes();
        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);

    async function handleSaveRecipe(newRecipe) {
        setError('');
        if (savedBookRecipes.length > maxTotal + 1) {
            return;
        }
        setLoadingSaveItems((prevState) => ({
            ...prevState,
            [newRecipe.uri]: true
        }));

        try {
            await saveRecipe(newRecipe);
            //     catch block is redundant here
        } finally {
            setLoadingSaveItems((prev) => ({
                ...prev,
                [newRecipe.uri]: false
            }));
        }
    }

    return (
        <div className={styles['results-outer-container']}>
            <section ref={resultsRef} id="search-results">
                {searchResults.length > 0 && <h3>Found recipes:</h3>}
                {loading && <p>Loading...</p>}
                {zeroFound && !loading &&
                    <p className={styles['no-results-message']}>Sorry! No recipes found that match your wishes. Maybe
                        your settings are too special. Try to be easier on the dashboard 💜</p>}
                {error && <p className={styles['error-message']} ref={errorRef}>{error}</p>}
            </section>

            <div className={styles['results-inner-container']}>
                {searchResults.length > 0 && (
                    <>
                        <section
                            className={styles['results-container']}
                        >

                            {/*RESULT LIST*/}
                            <ul>
                                {searchResults.map(({recipe}) => (
                                    <li className={styles['result-block-container']}
                                        key={recipe.uri}
                                    >
                                        {/*OVERLAY IMAGE WHEN LOADING*/}
                                        {loadingSaveItems[recipe.uri] && (
                                            <div className={styles["saved-loading-overlay"]}>
                                                <img src={IconLoading} alt="loading-icon"
                                                     className={styles["loading-icon"]}/>
                                            </div>)}

                                        {/*OVERLAY IMAGE WHEN SAVED*/}
                                        {savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) && (
                                            <div className={styles["saved-overlay"]}>
                                                <img src={IconSaved} alt="saved-icon"
                                                     className={styles["saved-icon"]}/>
                                            </div>)}
                                        {/*SINGLE RESULT DETAILS*/}
                                        <div className={styles['result-block']}>
                                            <h5>{recipe.label}</h5>
                                            <img src={recipe.image} alt={recipe.label}
                                                 className={styles['result-image']}/>
                                            <p>
                                                <a href={recipe.url} target='_blank' rel='noopener noreferrer'>View
                                                    Recipe</a>
                                            </p>
                                        </div>
                                        {/*SAVE BUTTON*/}
                                        <CustomButton
                                            text={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) ? "Saved!" : "Save Recipe"}
                                            color={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || ((maxTotal - savedBookRecipes.length) === 0) || prepareError ? "grey" : "mint"}
                                            onClick={() => handleSaveRecipe({title: recipe.label, uri: recipe.uri})}
                                            disabled={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || (maxTotal - savedBookRecipes.length) === 0 || prepareError}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                        {/*BRIDGE TO RECIPE BOOK*/}
                        <section className={styles['manage-results-container']}>
                            {/*IF RECIPE BOOK IS READY*/}
                            {!prepareError && (
                                <>
                                    <p>You have <strong>{savedBookRecipes.length}</strong> recipes saved in your Recipe
                                        Book!</p>

                                    {/*IF RECIPE BOOK FULL:*/}
                                    {(maxTotal - savedBookRecipes.length) === 0 ? (
                                        <p><strong>Your Recipe Book is full. Delete old recipes first.</strong></p>
                                    ) : (
                                        // INFO AMOUNT OF RECIPES THAT CAN BE SAVED:
                                        <>
                                            <p>Your Recipe Book can hold <strong>{maxTotal}</strong> recipes.</p>
                                            <p>So you can
                                                save <strong>{maxTotal - savedBookRecipes.length}</strong> more.</p>
                                        </>
                                    )}
                                </>)}
                            {prepareError && (
                                <div>
                                    <p>Your Recipe Book is not ready at this moment...</p>
                                    <p>So you can't save new recipes just yet.</p>
                                    <p>Please try again later.</p>

                                </div>
                            )}
                            {prepareError &&
                                <CustomButton text="Reload" color="mint" onClick={handleReload}/>}
                            <CustomButton
                                text="View Recipe Book"
                                color="purple"
                                onClick={() => navigate('/recipe-book')}
                            />
                        </section>

                    </>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
