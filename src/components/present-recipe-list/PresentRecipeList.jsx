

function PresentRecipeList({handleTitleClick, savedRecipes}) {

    return(
    <ul>
        {savedRecipes.map((recipe) => (
            <li key={recipe.uri}>
                <button type="button"
                        onClick={() => handleTitleClick(recipe.uri)}>
                    {recipe.title}
                </button>
            </li>
        ))}
    </ul>
    )
}

export default PresentRecipeList;