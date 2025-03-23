import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';
import Header from '../../components/header/Header.jsx';
import SearchDashboard from '../../components/search-dashboard/SearchDashboard.jsx';
import PresentedSearchResults from '../../components/present-search-results/PresentedSearchResults.jsx';

function Home() {
    const {isAuth} = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fullUrl, setFullUrl] = useState('');
    const [zeroFound, toggleZeroFound] = useState(false);
    const [foundRecipes, setFoundRecipes] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });


    //////////// get New Recipe Data /////////////////////////
    useEffect(() => {
        if (!fullUrl)
            return;

        const controller = new AbortController();
        const signal = controller.signal;

        const timeOutLoading = setTimeout(() => {
            controller.abort();
            setError("Recipes could not be found, please try again.");
            setIsLoading(false);
        }, 5000);

        const getRecipes = async () => {
            try {
                setError(''); //reset error
                setIsLoading(true);

                const response = await axios.get(fullUrl, {signal});
                const recipes = response.data.hits || [];

                // pick only 6 results and save in sessionStorage:
                const slicedRecipes = recipes.slice(0, 6);
                setFoundRecipes(slicedRecipes);
                sessionStorage.setItem('searchResults', JSON.stringify(slicedRecipes));
                setFullUrl('');
                clearTimeout(timeOutLoading);
                setIsLoading(false);

                toggleZeroFound(slicedRecipes.length === 0);
            } catch (e) {
                console.error("Failed search request:", e);
                clearTimeout(timeOutLoading);
                setError("Something went wrong, try again please.");
                setIsLoading(false);
            }
        };
        void getRecipes();


        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);

    return (
        <div className='inner-page-container'>
            <Header/>
            {isAuth ? (
                <>
                    <SearchDashboard passUrl={setFullUrl}/>
                    {error && <p>{error}</p>}
                    {!error && isLoading && <p>Loading...</p>}

                    {foundRecipes?.length > 0 ?
                        (<PresentedSearchResults results={foundRecipes} editResults={setFoundRecipes}/>)
                    : (zeroFound && <p>Sorry, no recipes found that match your wishes. Try again with less wishes, for example search with less disliked ingredients</p>)}
                </>
            ) : <h3>You need to login first.</h3>
            }
        </div>
    );
}

export default Home;