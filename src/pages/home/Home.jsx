import {useState} from "react";
// import Header from "../../components/header/Header.jsx";
import axios from "axios";
import './Home.css';

function Home() {
    // const [error, setError] = useState(false);
    const [foundRecipes, setFoundRecipes] = useState([]);
    const excludedFood = "eggplant";

    async function handleSearchRecipesSubmit(e) {
        e.preventDefault();

        const selectedMealTypes = Array.from(
            document.querySelectorAll('input[name="mealType"]:checked')
        ).map((checkbox) => checkbox.value);


        const baseUrl = 'https://api.edamam.com/api/recipes/v2';
        const queryParams = [
            'type=public',
            `app_id=${import.meta.env.VITE_API_ID}`,
            `app_key=${import.meta.env.VITE_API_KEY}`,
            'ingr=5-8',
            // `calories=0-${maxCalories}`,
            ...selectedMealTypes.map((mealType) => `mealType=${mealType.toLowerCase()}`),
            'health=alcohol-free',
            `excluded=${excludedFood}`,
            'random=true',
            'field=uri',
            'field=label',
            'field=image',
            'field=images',
            'field=source',
            'field=url',
            'field=shareAs',
            'field=yield',
            'field=dietLabels',
            'field=healthLabels',
            'field=ingredients',
            'field=totalTime',
            'field=mealType',
            'field=tags'
        ].join('&');

        const fullUrl = `${baseUrl}?${queryParams}`;

        try {
            const response = await axios.get(fullUrl);

            if (response.status !== 200) {
                console.error(`HTTP error! status: ${response.status}`);
            }

            const recipes = response.data.hits || [];
            const limitedRecipes = recipes.slice(0, 6);

            setFoundRecipes(limitedRecipes);
            console.log(limitedRecipes);
        } catch (e) {
            console.error("failed search request", e);
        }
    }


    return (
        <>    <h3>Search for recipes</h3>
            <form onSubmit={handleSearchRecipesSubmit}>
                <label htmlFor="mealTypeBreakfast">Breakfast</label>
                <input type="checkbox" id="mealTypeBreakfast" name="mealType" value="Breakfast"/>

                    <label htmlFor="mealTypeLunch">Lunch</label>
                    <input type="checkbox" id="mealTypeLunch" name="mealType" value="Lunch"/>

                        <label htmlFor="mealTypeDinner">Dinner</label>
                        <input type="checkbox" id="mealTypeDinner" name="mealType" value="Dinner"/>

                            <button type="submit">Search!</button>
            </form>
            <p>results</p>
          {foundRecipes.length > 0 && (
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
    )}

        </>

);

}

export default Home;