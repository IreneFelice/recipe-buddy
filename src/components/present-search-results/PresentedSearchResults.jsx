import './PresentedSearchResults.css';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';

function PresentedSearchResults({results}) {
    const [userInfoList, setUserInfoList] = useState([]);
    const [newRecipeList, setNewRecipeList] = useState([]);
    const {userRequest} = useContext(AuthContext);

    //set state userInfoList with saved recipes from backend, at mounting stage
    useEffect(() => {
        const retrieveUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(userRequest, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log("userInfo: ", response.data.info);
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

    //set state newRecipes
    function handleRecipeList(newRecipe) {
        setNewRecipeList((prevRecipes) => [...prevRecipes, newRecipe]);
    }

    //put together old and new saved recipes, put-request to info: new combined recipeList
    useEffect(() => {
        const saveRecipes = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const combinedRecipes = [...userInfoList, ...newRecipeList];
                    console.log("Combined Recipelists: ", combinedRecipes);
                    await axios.put(userRequest,
                        {
                            "info": JSON.stringify(combinedRecipes),
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            }
                        });

                } catch (error) {
                    console.error("saveRecipes failed", error);
                }
            }
        }
        if (newRecipeList.length > 0) {
            void saveRecipes();
        }
    }, [newRecipeList]);

    return (
        <div className="results-outer-container">
            <section className="results-container">
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