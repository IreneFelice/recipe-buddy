import {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext.jsx';

export const SavedRecipesContext = createContext({});

function SavedRecipesContextProvider({ children }) {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [status, setStatus] = useState('pending');
    const {userRequest} = useContext(AuthContext);

    // recipes from sessionStorage or backend
    useEffect(() => {
        const cached = sessionStorage.getItem('savedBookRecipes');
        if (cached) {
            setSavedRecipes(JSON.parse(cached));
            setStatus('done');
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            getSavedRecipes(token);
        } else {
            setStatus('error');
        }
    }, []);

    const getSavedRecipes = async (token) => {
        try {
            const response = await axios.get(userRequest, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const recipes = response.data.savedRecipes || [];
            setSavedRecipes(recipes);
            sessionStorage.setItem('savedBookRecipes', JSON.stringify(recipes));
            setStatus('done');
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
            setStatus('error');
        }
    };

    const saveRecipe = (recipe) => {
        const updatedRecipes = [...savedRecipes, recipe];
        setSavedRecipes(updatedRecipes);
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes));

      const token = localStorage.getItem('token');
        if (token) {
            axios.put(userRequest, { savedRecipes: updatedRecipes }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    };

  const removeRecipe = (recipeId) => {
        const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== recipeId);
        setSavedRecipes(updatedRecipes);
        sessionStorage.setItem('savedBookRecipes', JSON.stringify(updatedRecipes)); // Update sessionStorage

       const token = localStorage.getItem('token');
        if (token) {
            axios.put(userRequest, { savedRecipes: updatedRecipes }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    };

       const contextData = {
        savedRecipes,
        saveRecipe,
        removeRecipe,
        status,
    };

    return (
        <SavedRecipesContext.Provider value={contextData}>
            {status === 'done' ? children : <p>Loading...</p>}
        </SavedRecipesContext.Provider>
    );
}

export default SavedRecipesContextProvider;