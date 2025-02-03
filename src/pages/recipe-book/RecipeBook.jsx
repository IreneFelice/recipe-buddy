import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

function RecipeBook() {
    const {isAuth, auth} = useContext(AuthContext);
    const [testInfo, setTestInfo] = useState();
    console.log("what we know about the user: ", auth.user);

    // put test info and present it with get request

    const putTestInfo = async () => {
        const token = localStorage.getItem('token');

        if (token) {

            try {
                const response = await axios.put(`https://api.datavortex.nl/recipebuddy/users/${auth.user.name}`,
                    {
                        "info": "first item, second item, third item",
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                console.log("put test info succes:", response);

            } catch (error) {
                console.log("put test info failed")
            }
        } else {
            console.log("no token found");
        }
    };

    const getTestInfo = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`https://api.datavortex.nl/recipebuddy/users/${auth.user.name}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log(response.data.info);
            setTestInfo(response.data.info);
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        putTestInfo();
        getTestInfo();
    }, []);

    return (
        <>
            {isAuth ? (
                <>
                    <h1>{auth.user.name}'s Recipe book</h1>
                    <p>{testInfo}</p>
                </>
            ) : (
                <>
                    <p>In the recipe book you can find (links to) all the recipes found together with Buddy</p>
                    <p>Please <Link to="/login">login</Link> to see your own recipe book</p>
                </>
            )}
        </>
    )
}

export default RecipeBook;