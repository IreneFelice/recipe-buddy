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
import {SavedRecipesContext} from '../../context/SavedRecipesContext.jsx';
import CustomButton from '../../components/buttons/button/CustomButton.jsx';

function RecipeBook() {
    const {auth, isAuth} = useContext(AuthContext);
    const {
        prepareError,
        toggleReload,
        recipeError,
        setRecipeError,
        savedBookRecipes
    } = useContext(SavedRecipesContext);
    const [loading, setLoading] = useState(false);
    const [singleSelected, setSingleSelected] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    useEffect(() => {
        setRecipeError('');
        // single or double page presentation
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function handleReload() {
        toggleReload((prev) => !prev);
    }

    function handleTitleClick(uri, title) {
        const requestEndPoint = createQuerySingleRecipe(uri);
        const retrieveSingleRecipe = async () => {
            setRecipeError('');
            setLoading(true);
            try {
                const response = await axios.get(requestEndPoint);
                if (response) {
                    //make custom recipe object with separate 'title' key, for editing option//
                    setSingleSelected({rec: response.data.hits[0].recipe, title: title});
                }
            } catch (error) {
                console.error("Get single recipe details failed", error);
                setRecipeError("The details of your recipe can not be shown right now. Please try again later.")
            } finally {
                setLoading(false);
            }
        };
        void retrieveSingleRecipe();
    }

    return (
        <div className='inner-page-container'>
            {isAuth ? (
                <>
                    <h1 className={styles.title} >{auth.user.name}'s Recipe Book</h1>
                    {isMobile && loading && <p>Loading...</p>}
                    {isMobile && !loading && (recipeError?.length > 0) &&
                        <p className={styles['error-message']}>{recipeError}</p>}

                    <div className={styles['book-outer-container']}>
                        <img
                            src={isMobile ? emptyPage : bookOpen}
                            alt={isMobile ? 'Empty page background' : 'Open book background'}
                        />

                        <div className={styles['book-inner-container']}>

                            {isMobile ? (
                                // Mobile: switch to one page presentation
                                singleSelected ? (
                                    <section className={styles['book-right-page']}>
                                        <PresentSingleRecipe
                                            singleRecipe={singleSelected}
                                            closeRecipe={setSingleSelected}
                                        />
                                    </section>

                                ) : (prepareError && savedBookRecipes?.length === 0 ? (
                                    <div className={styles['error-message-block']}>
                                        <p>Sorry,</p>
                                        <p>your recipe book is not ready right now.</p>
                                        <p>If you saved recipes before, don't worry!</p>
                                        <p>They are not gone.</p>
                                        <p>Please come back later or try to reload.</p>
                                        <CustomButton text="Reload" color="yellow" onClick={handleReload}/>
                                    </div>) : (
                                    <section className={styles['book-left-page']}>
                                        <PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                        />
                                    </section>))

                            ) : (
                                // Desktop: two pages
                                <>
                                    < section className={styles['book-left-page']}>
                                        < PresentRecipeList
                                            handleTitleClick={handleTitleClick}
                                        />
                                    </section>

                                    <section className={styles['book-right-page']}>
                                        {loading && <p>Loading...</p>}
                                        {singleSelected ? (
                                            <PresentSingleRecipe
                                                singleRecipe={singleSelected}
                                                closeRecipe={setSingleSelected}
                                            />
                                        ) : (
                                            prepareError && savedBookRecipes?.length === 0 ? (
                                                <div className={styles['error-message-block']}>
                                                    <p>Sorry, your recipe book is not ready right now.</p>
                                                    <p>If you saved recipes before, don't worry! They are not gone.</p>
                                                    <p>Please try again later.</p>
                                                    <CustomButton text="Reload" color="yellow" onClick={handleReload}/>
                                                </div>
                                            ) : (
                                                !recipeError && !loading ? (<p>Click on a recipe to view</p>)
                                                    : (!loading &&
                                                        <p className={styles['error-message']}>{recipeError}</p>)
                                            )
                                        )}
                                    </section>
                                </>
                            )
                            }
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
