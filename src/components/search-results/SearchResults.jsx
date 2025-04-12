import styles from './SearchResults.module.css';
import {useContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';
import CustomButton from '../buttons/button/CustomButton.jsx';
import IconSaved from '../../assets/icon-saved.svg';
import {useNavigate} from 'react-router-dom';
import storeToUserInfo from '../../helpers/recipeService.js';

function SearchResults({fullUrl, setFullUrl}) {
    const {userRequest} = useContext(AuthContext);
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    /** 6 search results temporarily saved in sessionStorage: **/
    const [searchResults, setSearchResults] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });

    /***** recipes saved in Backend (or sessionStorage) state gets loaded at mounting phase: **/
    const [savedBookRecipes, setSavedBookRecipes] = useState(() => {
        const cached = sessionStorage.getItem('savedBookRecipes');
        return cached ? JSON.parse(cached) : [];
    });

    /******* checks for UI ********/
    const [zeroFound, toggleZeroFound] = useState(false);
    const maxTotal = 9;

    /****** error (and such) handling ********/
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

////////////////////////////////////////////////////////////////////////////


    /*** Get Backend recipes at mounting ***/
    useEffect(() => {
        if (savedBookRecipes.length > 0) return;
        const getSavedBookRecipes = async () => {

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(userRequest, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const storedRecipes = response.data.info ? JSON.parse(response.data.info) : [];
                setSavedBookRecipes(storedRecipes);
                sessionStorage.setItem('savedBookRecipes', JSON.stringify(storedRecipes));
            } catch (error) {
                console.error("Error fetching saved recipes:", error);
            }
        };

        void getSavedBookRecipes();
    }, []);


    /*** get max 6 new search results, when fullUrl received ***/
    useEffect(() => {
        if (!fullUrl)
            return;

        const controller = new AbortController();
        const signal = controller.signal;

        const timeOutLoading = setTimeout(() => {
            controller.abort();
            setError("Recipes could not be found, please try again.");
            setIsLoading(false);
        }, 5000);

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
        /*** NEW RECIPES FROM API *****************************************************************/
        async function getRecipes() {
            try {
                setError(''); //reset error
                setIsLoading(true);

                const response = await axios.get(fullUrl, {signal});
                const recipes = response.data.hits || [];

                // pick only 6 results:
                const slicedRecipes = recipes.slice(0, 6);
                /*** NEW RECIPES FROM API *****************************************************************/
                setSearchResults(slicedRecipes);
                sessionStorage.setItem('searchResults', JSON.stringify(slicedRecipes));

                setFullUrl(''); // reset fullUrl
                clearTimeout(timeOutLoading);
                setIsLoading(false);
                toggleZeroFound(slicedRecipes.length === 0); // if 0 results, toggle zeroFound true:

            } catch (e) {
                console.error("Failed search request:", e);
                clearTimeout(timeOutLoading);
                setError("Something went wrong, try again please.");
                setIsLoading(false);
            }
        }

        /*** NEW RECIPES FROM API *****************************************************************/
        void getRecipes();
        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);


    function handleSaveRecipe(newRecipe) {
        /** check if new recipe already exists in saved list **/
        console.log("savedBookRecipes: ", savedBookRecipes, "new Recipe: ", newRecipe);
        const recipeExists = [...savedBookRecipes]
            .some(recipe => recipe.uri === newRecipe.uri);
        if (recipeExists) {
            alert("Recipe already saved, not adding");
            return;
        }

        /** add new recipe to state list from backend **/
        const updatedRecipes = [...savedBookRecipes, newRecipe];
        // toggleMaxNumberSaved((maxTotal - updatedRecipes.length) <= 1);
        /** add the new recipe to list in state **/
        setSavedBookRecipes(prev => [...prev, newRecipe]);
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes));

        /*** Save updated state list, including newRecipe, to backend ***/
        const token = localStorage.getItem('token');
        if (token && updatedRecipes.length <= maxTotal) {
            void storeToUserInfo(userRequest, updatedRecipes, token);
        }
    }


    /*** empty backend recipeList***/
    // const deleteAllRecipes = async () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const noRecipes = [];
    //         try {
    //             await axios.put(userRequest,
    //                 {
    //                     'info': JSON.stringify(noRecipes),
    //                 }, {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${token}`,
    //                     }
    //                 });
    //         } catch (error) {
    //             console.error("saveRecipes failed", error);
    //         }
    //     }
    // }
    /**************** *****************/


    return (
        <div className={styles['results-outer-container']} ref={scrollRef}>
            <section>
                {error && <p>{error}</p>}
                {isLoading && <p>Loading...</p>}
                {zeroFound && <p>Sorry! No recipes found that match your wishes.</p>}
                {searchResults.length > 0 && <h3>Found recipes:</h3>}

            </section>

            <div className={styles['results-inner-container']}>
                {searchResults.length > 0 && (
                    <>
                        <section className={styles['results-container']}>
                            <ul>
                                {searchResults.map(({recipe}) => (
                                    <li className={
                                        savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri)
                                            ? styles['result-block-container-saved']
                                            : styles['result-block-container']
                                    }
                                        key={recipe.uri}>

                                        {savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) && (
                                            <div className={styles["saved-overlay"]}>
                                                <img src={IconSaved} alt="icon" className={styles["saved-icon"]}/>
                                            </div>)}

                                        <div className={styles['result-block']}>
                                            <h5>{recipe.label}</h5>
                                            <img src={recipe.image} alt={recipe.label}
                                                 className={styles['result-image']}/>
                                            <p>
                                                <a href={recipe.url} target='_blank' rel='noopener noreferrer'>View
                                                    Recipe</a>
                                            </p>
                                        </div>
                                        <CustomButton
                                            text={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) ? "Saved!" : "Save Recipe"}
                                            color={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || ((maxTotal - savedBookRecipes.length) === 0) ? "grey" : "mint"}
                                            onClick={() => handleSaveRecipe({title: recipe.label, uri: recipe.uri})}
                                            disabled={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || (maxTotal - savedBookRecipes.length) === 0}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className={styles['manage-results-container']}>
                            <p>You have <strong>{savedBookRecipes.length}</strong> recipes saved in your Recipe Book!
                            </p>
                            {(maxTotal - savedBookRecipes.length) === 0 ? (
                                <p><strong>Your Recipe Book is full. Delete old recipes first.</strong></p>
                            ) : (
                                <>
                                    <p>Your Recipe Book can hold <strong>{maxTotal}</strong> recipes.</p>
                                    <p>So you can save <strong>{maxTotal - savedBookRecipes.length}</strong> more.</p>
                                </>
                            )}

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
