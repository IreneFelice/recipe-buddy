
function createSearchQuery({mealTypeParams, dietParams, difficulty, excludedFood, includedFood, healthy}) {
    const baseUrl = 'https://api.edamam.com/api/recipes/v2';

    const healthyParams = [
        `nutrients%5BSUGAR%5D=0-${Math.max(10, healthy.maxGI / 2)}`, //less sugar for lower glycemic index
        `nutrients%5BCHOCDF%5D=0-${healthy.maxGI}`,
        `nutrients%5BFIBTG%5D=${healthy.minFIBTG}-100`, //Fiber
        `nutrients%5BFASAT%5D=0-${healthy.maxFASAT}`, //Fatty acids saturated, unhealthy fat
        `nutrients%5BFAMS%5D=0-${healthy.maxFAMS}` // healthy fat
    ];

    if(dietParams) {
    console.log("Diet Params: ", dietParams);
    } else {
        console.log("no Params here");
    }

    const queryParams = [
        'type=public',
        `app_id=${import.meta.env.VITE_API_ID}`,
        `app_key=${import.meta.env.VITE_API_KEY}`,
        'random=true',
        ...(healthyParams.length > 0 ? [healthyParams.join('&')] : []),
        ...(excludedFood.length > 0 ? [`excluded=${excludedFood.join('&excluded=')}`] : []),
        ...(includedFood.length > 0 ? [`q=${includedFood.join('&q=')}`] : []),
        ...(mealTypeParams.length > 0 ? [`mealType=${mealTypeParams.join('&mealType=')}`] : []),
        ...(dietParams.length > 0 ? [`health=${dietParams.join('&health=')}`] : []),
        'health=alcohol-free', // always add 'alcohol-free'
        ...(healthy.level > 3 ? ['health=low-sugar&health=sugar-conscious'] : []),
        `time=${difficulty.time}`,
        `ingr=${difficulty.ingr}`,
        'field=uri',
        'field=label',
        'field=image',
        'field=source',
        'field=url',
        'field=ingredients',
        'field=externalId',
    ];
    console.log("query: ", queryParams);
    console.log(baseUrl + '?' + queryParams.join('&'));
    return `${baseUrl}?${queryParams.join('&')}`;
}

export default createSearchQuery;