import styles from '../../pages/recipe-book/RecipeBook.module.css';


function PresentSingleRecipe({singleRecipe, closeRecipe, bookList, editBookList}) {

    function handleDeleteSingleRecipe (recipeUri) {
        editBookList(bookList.filter(recipe => recipe.uri !== recipeUri));
     }

    function handleCloseRecipe () {
        closeRecipe(null);
    }


    return (
        <div>
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
                            Visit Recipe website
                        </a>
                    </p>
                    <button className={styles['close-btn']} onClick={handleCloseRecipe}>
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