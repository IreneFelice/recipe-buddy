import {useContext} from 'react';
import {AuthContext} from '../../../context/AuthContext.jsx';
import Form from '../form/Form.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const {login, logout, setAuthError} = useContext(AuthContext);
    const navigate = useNavigate();
    const fields = [
        {name: 'username', label: "Username", type: 'text', validation: {required: "What is your unique username?"}},
        {name: 'password', label: "Password", type: 'password', validation: {required: "Give your secret password"}}
    ];

    async function handleLogin(inputData) {
    setAuthError('');
        try {
            const response = await axios.post('https://api.datavortex.nl/recipebuddy/users/authenticate', {
                    'username': inputData.username,
                    'password': inputData.password,
                }
            );
            console.log("backend response: ", response);
            const token = response.data.jwt;
            login(token);
            navigate('/');
            console.log("User is logged in");
        } catch (error) {
            console.error("Login failed", error);

            const loginError = error.response?.status;
            console.log("backend response status: ", error.response?.status, "backend response: ", error.response?.data);
            switch (loginError) {
                case 400:
                    setAuthError("You could not be logged in, did you type your userName right?");
                    break;
                case 401:
                    setAuthError("Uh-oh! Your password does not work! Maybe you made a little mistake...");
                    break;
                case 403:
                    setAuthError("Sorry! Something went wrong while checking your login. Try to log in again please.");
                    break;
                case 404:
                    setAuthError("Hmm... We couldn’t find your account. Make sure you typed your name right.");
                    break;
                case 500:
                case 502:
                case 503:
                    setAuthError("Uh-oh, the server is taking a break. Try again in a little while.");
                    break;
                default:
                    setAuthError("Sorry, there are some problems logging you in. Please try again later, or check your internet connection.");
                    break;
            }
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