// import {useEffect, useState} from "react";
// import Header from "../../components/header/Header.jsx";
// import axios from "axios";


function Home() {
    const exludedFood = "eggplant";
// const [foundRecipes, setFoundRecipes] = useState({});

//     useEffect (()=>{
//         async function searchRecipes (){
//             try {
//                 const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
//                     params: {
//                         type: 'public',
//                         app_id: '',
//                         app_key: '',
//                         ingr: '5-8',
//                         diet: 'low-fat',
//                         health: 'alcohol-free',
//                         excluded: 'eggplant',
//                         random: 'true',
//                         field: [
//                             'uri', 'label', 'image', 'images', 'source', 'url', 'shareAs',
//                             'yield', 'dietLabels', 'healthLabels', 'ingredients', 'totalTime', 'mealType', 'tags'
//                         ],
//                     },
//                 });
//                 // setFoundRecipes(response.data);
//                 console.log(response);
//             } catch (e) {
//                 console.error("Niet gelukt", e);
//             }
//         }
//         searchRecipes();
//     },[]);
//
//     return (
//         <>
//             <Header/>
//             <h3>Search for recipes</h3>
//             {/*{Object.keys(foundRecipes).length > 0 ?*/}
//             {/*    <p>{foundRecipes.data}</p> : <p>not found</p>*/}
//             {/*}*/}
//
//         </>
//     )
// }

    async function fetchRecipes() {
        const baseUrl = 'https://api.edamam.com/api/recipes/v2';
        const queryParams = [
            'type=public',
            `app_id=${import.meta.env.VITE_API_ID}`,
            `app_key=${import.meta.env.VITE_API_KEY}`,
            'ingr=5-8',
            'diet=low-fat',
            'health=alcohol-free',
            `excluded=${exludedFood}`,
            'random=true',
            'field=uri',
            'field=label',
            'field=image',
            'field=images',
            'field=source',
            'field=url',
            'field=shareAs',
            'field=yield',
            'field=dietLabels',
            'field=healthLabels',
            'field=ingredients',
            'field=totalTime',
            'field=mealType',
            'field=tags'
        ].join('&');

        const fullUrl = `${baseUrl}?${queryParams}`;

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }

    fetchRecipes();

    return (
        <>
        <h1>Home</h1>
        </>
    )
    }

export default Home;
