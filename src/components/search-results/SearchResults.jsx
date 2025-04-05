import styles from './SearchResults.module.css';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';
import CustomButton from '../buttons/button/CustomButton.jsx';
import IconSaved from '../../assets/icon-saved.svg';
import {useNavigate} from 'react-router-dom';

//\ 1. get max 6 search results
//\ 2. save results to session storage
//\ 3. if no results, show alternative text
// 4. monitor how many recipes already saved
// 5. show found search results
// 6. save recipe to backend
// 7. check if saved before, don't add if so

function SearchResults({fullUrl, setFullUrl}) {
    const {userRequest} = useContext(AuthContext);
    const navigate = useNavigate();
    /** 6 temporarily saved search results: **/
    const [searchResults, setSearchResults] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });

    /***** recipes saved in Backend, state gets loaded at mounting phase: **/
    const [savedBookRecipes, setSavedBookRecipes] = useState([]);

    /******* checks for UI ********/
    const [zeroFound, toggleZeroFound] = useState(false);
    const maxTotal = 9;
    const [maxNumberSaved, toggleMaxNumberSaved] = useState((maxTotal - savedBookRecipes.length) <= 2);

    /****** error handling ********/
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

////////////////////////////////////////////////////////////////////////////


    /*** Get Backend recipes at mounting ***/
    useEffect(() => {
        const getSavedBookRecipes = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(userRequest, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const storedRecipes = response.data.info ? JSON.parse(response.data.info) : [];
                console.log("recipes from user.data.info to savedBook state: ", storedRecipes);
                // load retrieved storedRecipes to 'savedBookRecipes'
                setSavedBookRecipes(storedRecipes);

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

        async function getRecipes() {
            try {
                setError(''); //reset error
                setIsLoading(true);

                const response = await axios.get(fullUrl, {signal});
                const recipes = response.data.hits || [];

                // pick only 6 results:
                const slicedRecipes = recipes.slice(0, 6);

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

        void getRecipes();
        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);


    function handleSaveRecipe(newRecipe) {
        /** check if new recipe already exists in saved list **/
        const recipeExists = [...savedBookRecipes]
            .some(recipe => recipe.uri === newRecipe.uri);
        if (recipeExists) {
            alert("Recipe already saved, not adding");
            return;
        }
        /** add new recipe to state list from backend **/
        const updatedRecipes = [...savedBookRecipes, newRecipe];
        /** add the new recipe to list in state **/
        setSavedBookRecipes(prev => [...prev, newRecipe]);
        /*** Save updated list with newRecipe to backend ***/
        void saveRecipes(updatedRecipes); //to backend
        toggleMaxNumberSaved((maxTotal - savedBookRecipes.length) <= 2);
    }

    async function saveRecipes(updatedRecipes) {
        const token = localStorage.getItem('token');
        if (token) {
            /**  check maxTotal of updated recipe list **/
            if (updatedRecipes.length <= maxTotal) {

                /** put-request updated recipeList to user.info in Backend **/
                try {
                    await axios.put(userRequest,
                        {
                            'info': JSON.stringify(updatedRecipes),
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            }
                        });
                } catch (error) {
                    console.error("saveRecipes failed", error);
                }
            } else {
                toggleMaxNumberSaved(true);
                console.log("max exceeded");
            }
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
        <div className={styles['results-outer-container']}>
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
                                            color={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || maxNumberSaved ? "grey" : "mint"}
                                            onClick={() => handleSaveRecipe({title: recipe.label, uri: recipe.uri})}
                                            disabled={savedBookRecipes.some(savedRecipe => savedRecipe.uri === recipe.uri) || maxNumberSaved}
                                        />
                                    </li>
                                ))}
                            </ul>

                        </section>
                        <section className={styles['manage-results-container']}>
                            <p>You have <strong>{savedBookRecipes.length}</strong> recipes saved in your Recipe Book!
                            </p>
                            <p>Your Recipe Book can hold <strong>{maxTotal}</strong> recipes.</p>
                            {maxNumberSaved ? (
                                <p><strong>Your Recipe Book is full. Delete old recipes first.</strong></p>
                            ) : (
                                <p>You can save <strong>{maxTotal - savedBookRecipes.length}</strong> more.</p>
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
