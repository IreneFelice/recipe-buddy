import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';
import Form from '../form/Form.jsx';
import axios from 'axios';

function LoginForm({errorMessage}) {
    const {login, logout} = useContext(AuthContext);
    const fields = [
        {name: "username", label: "Username", type: "text", validation: {required: "What is your unique username?"}},
        {name: "password", label: "Password", type: "password", validation: {required: "Give your secret password"}}
    ];

    async function handleLogin(inputData) {

        try {
            const response = await axios.post('https://api.datavortex.nl/recipebuddy/users/authenticate', {
                    "username": inputData.username,
                    "password": inputData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': import.meta.env.VITE_RECIPEBUDDY_API_KEY
                    }
                }
            );
            console.log("This login response: ", response);

            const token = response.data.jwt;
            login(token);

            console.log("User is logged in");
        } catch (error) {
            console.error("Login failed", error);
            logout();
        }
    }

    return (
        <>
            <h2>Login</h2>
            <Form fields={fields} onSubmit={handleLogin} buttonLabel="Log in"/>
        </>
    );
}

export default LoginForm;