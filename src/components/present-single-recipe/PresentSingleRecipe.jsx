function PresentSingleRecipe({singleSelected, setSingleSelected}) {

    return (
        <div>
            <p>Single Recipe here</p>
            {singleSelected.data?.hits.length > 0 && (
                <>
                    <h5>{singleSelected.data.hits[0].recipe.label}</h5>
                    <img
                        src={singleSelected.data.hits[0].recipe.image}
                        alt={singleSelected.data.hits[0].recipe.label}
                        style={{width: "100px", height: "100px"}}
                    />
                    <p>
                        <a
                            href={singleSelected.data.hits[0].recipe.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Recipe
                        </a>
                    </p>
                    <button type="button" onClick={() => setSingleSelected({})}>
                        Close
                    </button>
                </>)}
        </div>
    );
}

export default PresentSingleRecipe;