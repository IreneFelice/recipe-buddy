import {AuthContext} from '../../context/AuthContext.jsx';
import styles from './RecipeBook.module.css';
import createQuerySingleRecipe from '../../helpers/createQuerySingleRecipe.js';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import PresentSingleRecipe from '../../components/present-single-recipe/PresentSingleRecipe.jsx';
import PresentRecipeList from '../../components/present-recipe-list/PresentRecipeList.jsx';
import bookOpen from '../../assets/old-book-open.png';
import emptyPage from '../../assets/empty-paper.png';

function RecipeBook() {
    const {auth, isAuth, userRequest} = useContext(AuthContext);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [singleSelected, setSingleSelected] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const getSavedRecipes = async () => {
                try {
                    const response = await axios.get(userRequest, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    if (response.data.info) {
                        setSavedRecipes(JSON.parse(response.data.info));
                    }
                } catch (error) {
                    console.error("Get saved recipes failed", error);
                }
            };

            void getSavedRecipes();
        }
    }, []);


    function handleTitleClick(uri) {
        const requestEndPoint = createQuerySingleRecipe(uri);

        const retrieveSingleRecipe = async () => {
            try {
                const response = await axios.get(requestEndPoint);
                if (response) {
                    setSingleSelected(response);
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
                    <h1>{auth.user.name}'s Recipe Book</h1>
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
                                            editSingleRecipe={setSingleSelected}
                                            editBookList={setSavedRecipes}
                                            bookList={savedRecipes}
                                            closeRecipe={setSingleSelected}
                                        />
                                    </section>
                                ) : (
                                    <section className={styles['book-left-page']}>
                                        <PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                            savedRecipes={savedRecipes}
                                        />
                                    </section>
                                )
                            ) : (
                                // Desktop: two pages
                                <>
                                    <section className={styles['book-left-page']}>
                                        <PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                            savedRecipes={savedRecipes}
                                        />
                                    </section>
                                    <section className={styles['book-right-page']}>
                                        {singleSelected ? (
                                            <PresentSingleRecipe
                                                singleRecipe={singleSelected}
                                                editSingleRecipe={setSingleSelected}
                                                editBookList={setSavedRecipes}
                                                bookList={savedRecipes}
                                                closeRecipe={setSingleSelected}
                                            />
                                        ) : (
                                            <p>Click on a recipe to read</p>
                                        )}
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Log in to get your own recipe book!</p>
            )}
        </div>
    );
}

export default RecipeBook;
