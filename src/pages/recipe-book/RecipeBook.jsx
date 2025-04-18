import {AuthContext} from '../../context/AuthContext.jsx';
import styles from './RecipeBook.module.css';
import createQuerySingleRecipe from '../../helpers/createQuerySingleRecipe.js';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import PresentSingleRecipe from '../../components/present-single-recipe/PresentSingleRecipe.jsx';
import PresentRecipeList from '../../components/present-recipe-list/PresentRecipeList.jsx';
import bookOpen from '../../assets/old-book-open.png';
import emptyPage from '../../assets/empty-paper.png';
import BuddySpeaking from '../../components/buddy-speaking/BuddySpeaking.jsx';

function RecipeBook() {
    const {auth, isAuth} = useContext(AuthContext);
    const [singleSelected, setSingleSelected] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // single or double page presentation
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function handleTitleClick(uri, title) {
        const requestEndPoint = createQuerySingleRecipe(uri);
        const retrieveSingleRecipe = async () => {
            try {
                const response = await axios.get(requestEndPoint);
                if (response) {
                    //make custom recipe object with separate 'title' key, for editing option
                    setSingleSelected({rec: response.data.hits[0].recipe, title: title});
                }
            } catch (error) {
                console.error("Get single recipe details failed", error);
            }
        };
        void retrieveSingleRecipe();
    }




    return (
        <div className='inner-page-container'>
            {isAuth ? (
                <>
                    <h2>{auth.user.name}'s Recipe Book</h2>
                    <div className={styles['book-outer-container']}>
                        <img
                            src={isMobile ? emptyPage : bookOpen}
                            alt={isMobile ? 'Empty page background' : 'Open book background'}
                        />

                        <div className={styles['book-inner-container']}>
                            {/* Mobile: switch to one page */}
                            {isMobile ? (
                                singleSelected ? (
                                    <section className={styles['book-right-page']}>
                                        <PresentSingleRecipe
                                            singleRecipe={singleSelected}
                                            closeRecipe={setSingleSelected}
                                        />
                                    </section>
                                ) : (
                                    <section className={styles['book-left-page']}>
                                        <PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                        />
                                    </section>
                                )
                            ) : (
                                // Desktop: two pages
                                <>
                                    <section className={styles['book-left-page']}>
                                        <PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                        />
                                    </section>
                                    <section className={styles['book-right-page']}>
                                        {singleSelected ? (
                                            <PresentSingleRecipe
                                                singleRecipe={singleSelected}
                                                closeRecipe={setSingleSelected}
                                            />
                                        ) : (
                                            <p>Click on a recipe to view</p>
                                        )}
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles['buddy-welcoming-container']}>
                    <BuddySpeaking buddyVersion='tools'/>
                </div>
            )}
        </div>
    );
}

export default RecipeBook;
