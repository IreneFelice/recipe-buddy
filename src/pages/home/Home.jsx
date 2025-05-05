import {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import styles from './Home.module.css';
import Header from '../../components/header/Header.jsx';
import SearchDashboard from '../../components/search-dashboard/SearchDashboard.jsx';
import SearchResults from '../../components/search-results/SearchResults.jsx';
import useLoading from '../../hooks/useLoading.jsx';

function Home() {
    const {isAuth} = useContext(AuthContext);
    const [fullUrl, setFullUrl] = useState('');
    const isLoading = useLoading();

    function handleResultsShown() {
        const element = document.getElementById('search-results');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={'inner-page-container'}>
            {isLoading &&
                <div className={styles['loading']}>
                    <p>Loading...</p>
                </div>
            }
            <div className={isLoading ? styles['page-loading'] : styles['page-ready']}>
                <Header/>
                {isAuth && (
                    <>
                        <SearchDashboard passUrl={setFullUrl} />
                        <SearchResults fullUrl={fullUrl} setFullUrl={setFullUrl}  onFirstResultsShown={handleResultsShown}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
