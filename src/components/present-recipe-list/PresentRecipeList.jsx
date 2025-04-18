import styles from './PresentRecipeList.module.css';
import {SavedRecipesContext} from '../../context/SavedRecipesContext.jsx';
import {useContext} from 'react';

function PresentRecipeList({handleTitleClick}) {
const {savedBookRecipes} = useContext(SavedRecipesContext);

    return(
    <ul>
        {savedBookRecipes.map((recipe) => (
            <li key={recipe.uri} className={styles['title-click']}>
                <button type="button"
                        onClick={() => handleTitleClick(recipe.uri, recipe.title)}>
                    {recipe.title}
                </button>
            </li>
        ))}
    </ul>
)
}

export default PresentRecipeList;