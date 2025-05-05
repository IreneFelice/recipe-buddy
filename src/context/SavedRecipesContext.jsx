import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext.jsx';

export const SavedRecipesContext = createContext({});

function SavedRecipesContextProvider({children}) {
    const {auth, userRequest} = useContext(AuthContext);
    const [savedBookRecipes, setSavedBookRecipes] = useState([]);
    const [recipeError, setRecipeError] = useState('');
    const [prepareError, setPrepareError] = useState(false);
    const [reload, toggleReload] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const timeOutLoading = setTimeout(() => {
            setPrepareError(true);
            console.error("Get recipes from session storage or backend timed out");
            controller.abort();
        }, 5000);

        async function getSavedRecipes() {
            const inStore = sessionStorage.getItem('savedBookRecipes');
            const token = localStorage.getItem('token');

            setPrepareError(false); //reset

            /***** Get Recipes from SessionStorage *****/
            // if recipes already in sessionStorage, use those and just check if backend can be reached.
            if (inStore) {
                console.log("recipes already in session storage");
                setSavedBookRecipes(JSON.parse(inStore));
                clearTimeout(timeOutLoading);
                if (token) {
                    void checkBackendAvailable(token);
                }
            }
            /*** get recipes from Backend ***/
            else if (token) {
                try {
                    const response = await axios.get(userRequest, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        signal: signal,
                    },);
                    const recipes = response.data.info ? JSON.parse(response.data.info) : [];

                    setSavedBookRecipes(recipes);
                    sessionStorage.setItem('savedBookRecipes', JSON.stringify(recipes));

                    setPrepareError(false);
                    console.log('Recipes from backend to session storage.');
                } catch (error) {
                    console.error('Error fetching saved recipes:', error);
                    setPrepareError(true);
                } finally {
                    clearTimeout(timeOutLoading);
                }

            } else {
                setPrepareError(true);
                clearTimeout(timeOutLoading);
            }
        }

        void getSavedRecipes();
        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        }
    }, [auth, reload]);


/// add new recipe to backend list ///
    async function saveRecipe(newRecipe) {
        setRecipeError('');
        const recipeExists = [...savedBookRecipes].some(recipe => recipe.uri === newRecipe.uri);
        if (recipeExists) {
            return true;
        }
        const updatedRecipes = [...savedBookRecipes, newRecipe];

        const success = await updateBackendRecipes(updatedRecipes);
        if (!success) {
            setRecipeError("Recipe could not be saved, please try again later.")
        }
        return true;
    }

/// save edited value ///
    async function updateRecipe(newLabel, editUri) {
        setRecipeError('');
        const updatedList = savedBookRecipes.map(recipe =>
            recipe.uri === editUri ? {...recipe, title: newLabel} : recipe
        );
        const success = await updateBackendRecipes(updatedList);
        if (!success) {
            setRecipeError("Your edit could not be saved, sorry... not your fault!");
            console.error("Edit could not be saved");
            return false;
        } else {
            setRecipeError('');
            console.log("Edit saved!");
            return true;
        }
    }

/// delete recipe ///
    async function removeRecipe(uri) {
        setRecipeError('');
        const updatedRecipes = savedBookRecipes.filter((recipe) => recipe.uri !== uri);

        const success = await updateBackendRecipes(updatedRecipes);
        if (!success) {
            setRecipeError("Oh no! The recipe could not be deleted! Sorry... maybe tomorrow.");
        }
    }

    /***** put updated recipeList to backend *****/
    const updateBackendRecipes = async (updatedRecipes) => {
        setRecipeError('');
        const token = localStorage.getItem('token');
        if (token) {
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
                sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes));
                setSavedBookRecipes(updatedRecipes);
                return true;
            } catch (error) {
                console.error("Update Recipes failed", error);
                return false;
            }
        } else {
            setRecipeError("Something went wrong, please try again later!");
            return false;
        }
    }

    const checkBackendAvailable = async (token) => {
        setPrepareError(false);
        try {
            const response = await axios.get('https://api.datavortex.nl/recipebuddy/info', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },);
            console.log("Backend reached");
        } catch (error) {
            setPrepareError(true);
            console.error(error, " Error reaching backend: ");
            const status = error.response?.status;
            switch (status) {
                case 401:
                case 403:
                    console.error("Authorization failed. You may not be logged in or your session has expired.");
                    break;
                case 404:
                    console.error("The requested resource was not found. The URL might be incorrect.");
                    break;
                case 500:
                case 502:
                case 503:
                case 504:
                    console.error("Server error. The service is currently unavailable or overloaded. Try again later.");
                    break;
                default:
                    if (status) {
                        console.error("An unexpected server error occurred.");
                    } else {
                        console.error("No response from server. Please check your internet connection.");
                    }
                    break;
            }
        }
    }

    const contextData = {
        savedBookRecipes: savedBookRecipes,
        saveRecipe: saveRecipe,
        updateRecipe: updateRecipe,
        removeRecipe: removeRecipe,
        toggleReload: toggleReload,
        recipeError: recipeError,
        setRecipeError: setRecipeError,
        prepareError: prepareError,
    };

    return (
        <SavedRecipesContext.Provider value={contextData}>
            {children}
        </SavedRecipesContext.Provider>
    );
}


export default SavedRecipesContextProvider;