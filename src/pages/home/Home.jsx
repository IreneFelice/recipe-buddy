import {useEffect, useState} from "react";
import axios from "axios";
import testResponse from '../../constants/testResponse.json';
import './Home.css';
import Header from "../../components/header/Header.jsx";
import SearchDashboard from "../../components/search-dashboard/SearchDashboard.jsx";
import PresentedSearchResults from "../../components/present-search-results/PresentedSearchResults.jsx";

function Home() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fullUrl, setFullUrl] = useState('');
    const [foundRecipes, setFoundRecipes] = useState([]);

    // TEST NOVI BACKEND //
    // useEffect(() => {
    //     async function getInfo() {
    //     try {
    //         const infoResponse = await axios.get('https://api.datavortex.nl/recipebuddy/info', {
    //             headers: {
    //
    //             }
    //         });
    //         console.log("response backend: ", infoResponse);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    // getInfo();
    // }, []);
    //



    //////////// get Data /////////////////////////
    useEffect(() => {
        if (!fullUrl) return;
        const controller = new AbortController();
        const signal = controller.signal;

        const timeOutLoading = setTimeout(() => {
            controller.abort();
            setError("Recipes could not be found, please try again.");
            setIsLoading(false);
        }, 5000);

        const getRecipes = async () => {
            try {
                setError('');
                setIsLoading(true);

                // const response = await axios.get(fullUrl, { signal });
                // const recipes = response.data.hits || [];
                const recipes = testResponse.data.hits || [];

                setFoundRecipes(recipes.slice(0, 6));
                setFullUrl('');
                clearTimeout(timeOutLoading);
                setIsLoading(false);

            } catch (e) {
                console.error("Failed search request:", e);
                clearTimeout(timeOutLoading);
                setError("Something went wrong, try again please.");
                setIsLoading(false);
            }
        };

        getRecipes();

        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);

    return (
        <>
            <Header />
            <h3>Search recipes here</h3>
            <SearchDashboard passUrl={setFullUrl}/>
            {error && <p>{error}</p>}
            {!error && isLoading && <p>Loading...</p>}
            {foundRecipes?.length > 0 && <PresentedSearchResults results={foundRecipes} resetResults={setFoundRecipes} />}
        </>
    );
}

export default Home;