import {useEffect, useState} from "react";
import axios from "axios";
import './Home.css';
import SearchDashboard from "../../components/search-dashboard/SearchDashboard.jsx";
import PresentedSearchResults from "../../components/present-search-results/PresentedSearchResults.jsx";

function Home() {
    // const [error, setError] = useState(false);
    const [fullUrl, setFullUrl] = useState('');
    const [foundRecipes, setFoundRecipes] = useState([]);

    // ////////// get Data /////////////////////////
        if (fullUrl) {
            console.log("request url found");

            const getRecipes = async () => {
                try {
                    const response = await axios.get(fullUrl);

                    if (response.status !== 200) {
                        console.error(`HTTP error! status: ${response.status}`);
                    }

                    const recipes = response.data.hits || [];
                    const limitedAmountRecipes = recipes.slice(0, 6);

                    setFoundRecipes(limitedAmountRecipes);
                    setFullUrl('');
                } catch (e) {
                    console.error("failed search request", e);
                }
            };
          getRecipes();
        } else {
            console.log("fullUrl is empty");
        }

    return (
        <>
            <h3>Search recipes here</h3>
            <SearchDashboard passUrl={setFullUrl}/>
            {foundRecipes?.length > 0 && <PresentedSearchResults results={foundRecipes} resetResults={setFoundRecipes} />}
        </>

    );

}

export default Home;