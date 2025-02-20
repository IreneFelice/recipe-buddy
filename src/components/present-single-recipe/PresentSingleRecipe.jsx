

function PresentSingleRecipe({singleRecipe, editSingleRecipe, bookList, editBookList}) {

    function handleDeleteSingleRecipe (recipeUri) {
        editBookList(bookList.filter(recipe => recipe.uri !== recipeUri));
     }
    return (
        <div>
            <p>Recipe</p>
            {singleRecipe.data?.hits.length > 0 && (
                <>
                    <h5>{singleRecipe.data.hits[0].recipe.label}</h5>
                    <img
                        src={singleRecipe.data.hits[0].recipe.image}
                        alt={singleRecipe.data.hits[0].recipe.label}
                        style={{width: "100px", height: "100px"}}
                    />
                    <p>
                        <a
                            href={singleRecipe.data.hits[0].recipe.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Recipe
                        </a>
                    </p>
                    <button type="button" onClick={() => editSingleRecipe({})}>
                        Close
                    </button>
                    <button type="button" onClick={() => handleDeleteSingleRecipe({})}>
                       Delete from recipe book
                    </button>
                </>)}
        </div>
    );
}

export default PresentSingleRecipe;