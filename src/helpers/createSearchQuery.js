
function createSearchQuery({ mealTypeParams, dietParams, difficulty, excludedFood }) {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';

    const queryParams = [
        'type=public',
        `app_id=${import.meta.env.VITE_API_ID}`,
        `app_key=${import.meta.env.VITE_API_KEY}`,
        'random=true',
        `excluded=${excludedFood}`,
        ...(mealTypeParams.length > 0 ? [`mealType=${mealTypeParams.join('&mealType=')}`] : []),
        ...(dietParams.length > 0 ? [`health=${dietParams.join('&health=')}`] : []),
        'health=alcohol-free', // always add 'alcohol-free'
        `time=${difficulty.time}`,
        `ingr=${difficulty.ingr}`,
        'field=uri',
        'field=label',
        'field=image',
        'field=source',
        'field=url',
        'field=ingredients',
    ];

    return `${baseUrl}?${queryParams.join('&')}`;
}

export default createSearchQuery;