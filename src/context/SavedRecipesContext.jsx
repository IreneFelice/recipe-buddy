import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext.jsx';

export const SavedRecipesContext = createContext({});

function SavedRecipesContextProvider({children}) {
    const {userRequest} = useContext(AuthContext);
    const [savedBookRecipes, setSavedBookRecipes] = useState([]);
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');

    // recipes from sessionStorage or backend
    useEffect(() => {
        const inStore= sessionStorage.getItem('savedBookRecipes');
        if (inStore) {
            setSavedBookRecipes(JSON.parse(inStore));
            console.log("recipes in sessionStorage: ", inStore);
            setStatus('done');
            return;
        }
        const token = localStorage.getItem('token');
        if (token) {
            void getSavedRecipes(token);
        } else {
            setStatus('error');
        }
    }, []);

    /***** get recipes from Backend *****/
    const getSavedRecipes = async (token) => {
        try {
            const response = await axios.get(userRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const recipes = response.data.info ? JSON.parse(response.data.info) : [];

            setSavedBookRecipes(recipes);
            sessionStorage.setItem('savedBookRecipes', JSON.stringify(recipes));
            setStatus('done');
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
            setStatus('error');
        }
    };

    /***** add new recipe to backend list *****/
    function saveRecipe(newRecipe) {
        const recipeExists = [...savedBookRecipes].some(recipe => recipe.uri === newRecipe.uri);
        if (recipeExists) {
            alert("Recipe already saved, not adding");
            setStatus('done');
            return;
        }
        const updatedRecipes = [...savedBookRecipes, newRecipe];
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes));
        setSavedBookRecipes(prev => [...prev, newRecipe]);
        void updateUserRecipes(updatedRecipes);
    }

    /***** save edited value *****/
    function updateRecipe(newLabel, editUri) {
        const updatedList = savedBookRecipes.map(recipe =>
            recipe.uri === editUri ? {...recipe, title: newLabel} : recipe
        );
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedList));
        setSavedBookRecipes(updatedList);
        void updateUserRecipes(updatedList);
    }

    /***** delete recipe *****/
    function removeRecipe (uri) {
        const updatedRecipes = savedBookRecipes.filter((recipe) => recipe.uri !== uri);
        setSavedBookRecipes(updatedRecipes);
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes)); // Update sessionStorage
        void updateUserRecipes(updatedRecipes);
    }

    /***** put updated recipeList to backend *****/
    async function updateUserRecipes(updatedRecipes) {
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
                setStatus('done');
            } catch (error) {
                console.error("saveRecipes failed", error);
                setStatus('error');
                setError("");
            }
        }
    }

    const contextData = {
        savedBookRecipes: savedBookRecipes,
        saveRecipe: saveRecipe,
        updateRecipe: updateRecipe,
        removeRecipe: removeRecipe,
    };

    return (
        <SavedRecipesContext.Provider value={contextData}>
            {status === 'done' ? children : <p>Loading...</p>}
        </SavedRecipesContext.Provider>
    );
}

export default SavedRecipesContextProvider;