import styles from './SearchResults.module.css';
import {useContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {SavedRecipesContext} from '../../context/SavedRecipesContext.jsx';
import CustomButton from '../buttons/button/CustomButton.jsx';
import IconSaved from '../../assets/icon-saved.svg';
import {useNavigate} from 'react-router-dom';


function SearchResults({fullUrl, setFullUrl}) {
    const {savedBookRecipes, saveRecipe} = useContext(SavedRecipesContext);
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [searchResults, setSearchResults] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });
    const [zeroFound, toggleZeroFound] = useState(false);
    const maxTotal = 9;
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


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

        /*** GET NEW RECIPES FROM API *****************************/
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
        if (savedBookRecipes.length <= maxTotal + 1) {
            void saveRecipe(newRecipe);
        }
    }


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
