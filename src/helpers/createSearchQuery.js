function createSearchQuery({ mealTypeParams, dietParams, difficulty, excludedFood }) {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';

    // Filter out empty parameters
    const queryParams = [
        'type=public',
        `app_id=${import.meta.env.VITE_API_ID}`,
        `app_key=${import.meta.env.VITE_API_KEY}`,
        'random=true',
        `excluded=${excludedFood}`,
        ...(mealTypeParams ? [`mealType=${mealTypeParams}`] : []),
        ...(dietParams ? [`health=${dietParams}`] : []),
        'health=alcohol-free', // always add 'alcohol-free'
        ...(difficulty.time ? [`time=${difficulty.time}`] : []), // Only add time if it's not empty
        ...(difficulty.ingr ? [`ingr=${difficulty.ingr}`] : []), // Only add ingr if it's not empty
        'field=uri',
        'field=label',
        'field=image',
        'field=source',
        'field=url',
        'field=ingredients',
    ];

    const fullUrlInput = `${baseUrl}?${queryParams.join('&')}`;
    return fullUrlInput;
}

export default createSearchQuery;