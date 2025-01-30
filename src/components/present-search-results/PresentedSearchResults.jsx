

function PresentedSearchResults({results}){

console.log(results);

return (
    <>
    {results.length > 0 && (
        <div><h3>Results:</h3>
            <ul>
                {results.map((result, index) => (
                    <li className="resultBlock" key={index}>
                        <h5>{result.recipe.label}</h5>
                        <img
                            src={result.recipe.image}
                            alt={result.recipe.label}
                            style={{width: "100px", height: "100px"}}
                        />
                        <p><a href={result.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )}
    </>
)

}

export default PresentedSearchResults;