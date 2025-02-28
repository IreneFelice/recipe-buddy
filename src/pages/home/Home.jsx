import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';
// import {WindowSizeContext} from '../../context/WindowSizeContext.jsx';
import Header from '../../components/header/Header.jsx';
import BuddyWelcoming from '../../components/buddy-welcoming/BuddyWelcoming.jsx';
import SearchDashboard from '../../components/search-dashboard/SearchDashboard.jsx';
import PresentedSearchResults from '../../components/present-search-results/PresentedSearchResults.jsx';

function Home() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [fullUrl, setFullUrl] = useState('');
    const [foundRecipes, setFoundRecipes] = useState(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        return savedResults ? JSON.parse(savedResults) : [];
    });
    const {isAuth} = useContext(AuthContext);
    // const {isMobile} = useContext(WindowSizeContext);
    console.log("Recipes found in sessionStorage: ", sessionStorage.getItem('searchResults'));

    //////////// get New Recipe Data /////////////////////////
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

                const response = await axios.get(fullUrl, {signal});
                const recipes = response.data.hits || [];

                // pick only 6 results and save in sessionStorage:
                const slicedRecipes = recipes.slice(0, 6);
                setFoundRecipes(slicedRecipes);
                sessionStorage.setItem('searchResults', JSON.stringify(slicedRecipes));
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

        void getRecipes();

        return () => {
            controller.abort();
            clearTimeout(timeOutLoading);
        };
    }, [fullUrl]);

    return (
        <div className='inner-page-container'>
            <Header/>
            <BuddyWelcoming/>
            {isAuth ? (
                <>
                    <h3>Search recipes here</h3>
                    <SearchDashboard passUrl={setFullUrl}/>
                    {error && <p>{error}</p>}
                    {!error && isLoading && <p>Loading...</p>}
                    {foundRecipes?.length > 0 &&
                        <PresentedSearchResults results={foundRecipes} editResults={setFoundRecipes}/>}
                </>
            ) : <h3>You need to login first.</h3>
            }
        </div>
    );
}

export default Home;