import './PresentedSearchResults.css';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';

function PresentedSearchResults({results}) {
    const [userInfoList, setUserInfoList] = useState([]);
    const [newRecipeList, setNewRecipeList] = useState([]);
    const [maxNumberSaved, toggleMaxNumberSaved] = useState(false);
    const {userRequest} = useContext(AuthContext);
    const savedRecipesNumber = userInfoList.length;
    const maxTotal = 10;

    //set state userInfoList with saved recipes from backend, at mounting stage.
    useEffect(() => {
        const retrieveUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    console.log("user Info before get: ", userInfoList, "userRequest: ", userRequest);
                    const response = await axios.get(userRequest, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log("userInfo after get: ", response.data.info);
                    if (response.data.info) {
                        setUserInfoList(JSON.parse(response.data.info));
                    }
                } catch (error) {
                    console.error("retrieving user info failed", error);
                }
            }
        };
        void retrieveUserInfo();
    }, []);

    //when user.info gets updated (mounting or after put-request)
    useEffect(() => {
        if (savedRecipesNumber >= maxTotal) {
            toggleMaxNumberSaved(true);
        } else if (savedRecipesNumber < maxTotal) {
            toggleMaxNumberSaved(false);
        }
        console.log("savedRecipes: ", savedRecipesNumber, "Max?", maxNumberSaved);
    }, [userInfoList]);

    //when user tries to save recipe
    //set state newRecipeList
    function handleRecipeList(newRecipe) {
        const combinedList = [...userInfoList, ...newRecipeList];
        const recipeExists = combinedList.some(recipe => recipe.uri === newRecipe.uri);

        if (recipeExists) {
            console.warn("Recipe already exists, not adding:", newRecipe.title);
            return;
        }
        setNewRecipeList((prevRecipes) => [...prevRecipes, newRecipe]);
        console.log("newRecipes: ", newRecipeList);
    }

    //when newRecipeList state updates
    useEffect(() => {
        const saveRecipes = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                //combine old and new saved recipes, check maxTotal
                const combinedRecipes = [...(userInfoList || []), ...newRecipeList];
                if (combinedRecipes.length <= maxTotal) {
                    console.log("Combined Recipelists: ", combinedRecipes);
                    //put-request new combined recipeList to user.info
                    try {

                        await axios.put(userRequest,
                            {
                                "info": JSON.stringify(combinedRecipes),
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                        setUserInfoList(combinedRecipes);
                        setNewRecipeList([]);
                    } catch (error) {
                        console.error("saveRecipes failed", error);
                    }
                } else {
                    toggleMaxNumberSaved(true);
                    console.log("max exceded")
                }
            } // close if (token)
        }
        //check if user.info exceeds maxTotal
        if (!maxNumberSaved && newRecipeList.length > 0) {
            void saveRecipes();
        }
    }, [newRecipeList]);

    return (
        <div className="results-outer-container">
            <section className="results-container">
                {maxNumberSaved &&
                    <p><strong>Your recipe book can not take more recipes. Delete one or more old ones
                        first.</strong></p>}
                {results.length > 0 && (
                    <div><h3>Results:</h3>
                        <ul>
                            {results.map((result) => (
                                <li className="resultBlock" key={result.recipe.uri}>
                                    <h5>{result.recipe.label}</h5>
                                    <img
                                        src={result.recipe.image}
                                        alt={result.recipe.label}
                                        style={{width: "100px", height: "100px"}}
                                    />
                                    <p>
                                        <a
                                            href={result.recipe.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Recipe
                                        </a>
                                    </p>
                                    <button type="button" onClick={() => handleRecipeList({
                                        'title': result.recipe.label,
                                        'uri': result.recipe.uri
                                    })}>
                                        Save Recipe
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <section className="manage-results-container">
                <p>manage results section</p>
            </section>

        </div>
    )
}

export default PresentedSearchResults;