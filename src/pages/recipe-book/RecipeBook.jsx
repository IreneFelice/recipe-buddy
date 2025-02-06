import {AuthContext} from '../../context/AuthContext.jsx';
import PresentSingleRecipe from '../../components/present-single-recipe/PresentSingleRecipe.jsx';
import './RecipeBook.css';
import createQuerySingleRecipe from '../../helpers/createQuerySingleRecipe.js';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

function RecipeBook() {
    const {auth, userRequest} = useContext(AuthContext);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [singleSelected, setSingleSelected] = useState({});

    //set state savedRecipes with saved recipes from backend, at mounting stage
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const getSavedRecipes = async () => {
                try {
                    const response = await axios.get(userRequest, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );
                    if (response.data.info) {
                        console.log("user-info: ", JSON.parse(response.data.info));
                        setSavedRecipes(JSON.parse(response.data.info));
                    }
                } catch (error) {
                    console.error("setting saved recipes failed", error);
                }
            }
            void getSavedRecipes();
        }
    }, []);

    // set state singleSelected with clicked title from the list
    function handleTitleClick(uri) {
        const requestEndPoint = createQuerySingleRecipe(uri);

        const retrieveSingleRecipe = async () => {
            try {
                const response = await axios.get(requestEndPoint);

                if (response) {
                    setSingleSelected(response);
                }
            } catch (error) {
                console.error("retrieving single recipe failed", error);
            }

        };
        void retrieveSingleRecipe();
    }


    return (
        <>
            {/*{!isAuth ? (*/}
            <h1>{auth.user.name}'s Recipe book</h1>
            <div className="book-outer-container">
                <section>

                    <ul>
                        {savedRecipes.map((recipe) => (
                            <li key={recipe.uri}>
                                <button type="button" onClick={() => handleTitleClick(recipe.uri)}>
                                    {recipe.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    {singleSelected ?
                        <PresentSingleRecipe
                            singleSelected={singleSelected}
                            setSingleSelected={setSingleSelected}/>
                        : <p>No recipe here</p>}
                </section>
            </div>
        </>
    );
}

export default RecipeBook;