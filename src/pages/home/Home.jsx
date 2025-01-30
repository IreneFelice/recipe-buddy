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
    useEffect(() => {
        if (fullUrl) {
            console.log("Hier is een url: ", fullUrl);

            const getRecipes = async () => {
                try {
                    const response = await axios.get(fullUrl);
                    console.log("welke response krijg ik terug?", response);
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
            void getRecipes();
            setFullUrl('');
        }

    }, [fullUrl]);


    return (
        <>
            <h3>Search recipes here</h3>
            <SearchDashboard passUrl={setFullUrl}/>

            {foundRecipes?.length > 0 && <PresentedSearchResults results={foundRecipes} />}
        </>

    );

}

export default Home;