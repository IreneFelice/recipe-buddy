import {useEffect, useState} from "react";
import axios from "axios";
import './Home.css';

import SearchDashboard from "../../components/search-dashboard/SearchDashboard.jsx";

function Home() {
    // const [error, setError] = useState(false);
    const [fullUrl, setFullUrl] = useState('');
    const [foundRecipes, setFoundRecipes] = useState([]);

    const obtainUrl = (url) => setFullUrl(url);

    // ////////// get Data /////////////////////////
    useEffect(() => {
        if (fullUrl) {
            const getRecipes = async () => {
                try {
                    const response = await axios.get(fullUrl);

                    if (response.status !== 200) {
                        console.error(`HTTP error! status: ${response.status}`);
                    }

                    const recipes = response.data.hits || [];
                    const limitedAmountRecipes = recipes.slice(0, 6);

                    setFoundRecipes(limitedAmountRecipes);
                    console.log(limitedAmountRecipes);
                } catch (e) {
                    console.error("failed search request", e);
                }
            };
            getRecipes();
        }

    }, [fullUrl]);


    return (
        <>
            <h3>Search recipes here</h3>
            <SearchDashboard passUrl={obtainUrl}/>
            {/*<Results />*/}

            {foundRecipes.length > 0 && (
                <div><h3>Results:</h3>
                    <ul>
                        {foundRecipes.map((result, index) => (
                            <li className="resultBlock" key={index}>
                                <h5>{result.recipe.label}</h5>
                                <img
                                    src={result.recipe.image}
                                    alt={result.recipe.label}
                                    style={{width: "100px", height: "100px"}}
                                />
                                <p><a href={result.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </>

    );

}

export default Home;