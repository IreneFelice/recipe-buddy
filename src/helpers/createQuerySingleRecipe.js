
function createQuerySingleRecipe(uri) {
    const baseLinkUri = 'https://api.edamam.com/api/recipes/v2/by-uri?uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23';
    const uniqueUriNumber = uri.split('#').pop();

    console.log("uri: ", uri);

    const querySingleRecipe = [
        `app_id=${import.meta.env.VITE_API_ID}`,
        `app_key=${import.meta.env.VITE_API_KEY}`,
        'field=label',
        'field=image',
        'field=url',
        'field=uri',
        'field=healthLabels',
        'field=ingredientLines',
        'field=totalTime',
    ];

    return `${baseLinkUri}${uniqueUriNumber}&${querySingleRecipe.join('&')}`;
}

export default createQuerySingleRecipe;