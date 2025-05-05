import Form from '../form/Form.jsx';
import axios from 'axios';
import {useState} from 'react';
import styles from './FormRegister.module.css';

function RegisterForm({newName}) {
    const [error, setError] = useState('');

    const fields = [
        {
            name: 'username', label: "User Name", type: 'text',
            validation: {
                required: "What is your name?",
                maxLength: {
                    value: 20,
                    message: "Your username can't be longer than 20 characters."
                },
                minLength: {
                    value: 3,
                    message: "Your username should be at least 3 characters long."
                }}},
        {name: 'email', label: "Email", type: 'email',
            validation: {
            required: "What is your e-mail address?",
                pattern: {
                    value: /.+@[a-z]+\.[a-z]{2,5}$/,
                    message: "This does not seem to be a correct e-mail address."
                }}},
        {name: 'password', label: "Password", type: 'password',
            validation: {
            required: "Give your secret password",
                maxLength: {
                    value: 30,
                    message: "Your password can't be longer than 30 characters."
                },
                pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d|[!@#$%^&*()_\-+=<>?{}[\]~]))[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,}$/,
                    message: "A good password is at least 8 characters long and needs: lowercase as well as uppercase letters and a number, special character or both. Example: Secret3#"
                }
            }}
    ];

    async function onRegister(registerData) {
        console.log('onRegister: ', registerData);
        try {
            const response = await axios.post('https://api.datavortex.nl/recipebuddy/users', {
                    'username': registerData.username,
                    'email': registerData.email,
                    'password': registerData.password,
                    'info': 'string',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': import.meta.env.VITE_RECIPEBUDDY_API_KEY
                    }
                }
            );
            newName(response.data.username);

        } catch (error) {
            console.error("error: ", error);
            const registerError = error.response?.data;
            console.log("backend response register: ", registerError);
            setError("...something went wrong: " + registerError);
        }
    }


    return (
        <>
            <h2>Hi there! Who are you?</h2>
            {error && <p className={styles.error}>{error}</p>}
            <Form fields={fields} onSubmit={onRegister} buttonLabel="Done"/>
        </>
    );
}

export default RegisterForm;
