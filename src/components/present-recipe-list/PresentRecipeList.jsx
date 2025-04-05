import styles from './PresentRecipeList.module.css';

function PresentRecipeList({handleTitleClick, savedRecipes}) {

    return(
    <ul>
        {savedRecipes.map((recipe) => (
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