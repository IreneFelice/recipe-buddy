import Form from '../form/Form.jsx';
import axios from 'axios';

function RegisterForm({errorMessage, newName}) {

    const fields = [
        {name: 'username', label: "Name", type: 'text', validation: {required: "What is your first name?"}},
        {name: 'email', label: "Email", type: 'email', validation: {required: "What is your e-mail address?"}},
        {name: 'password', label: "Password", type: 'password', validation: {required: "Give your secret password"}}
    ];

    async function onRegister(registerData, {registerStatus}) {
        console.log('onRegister: ', registerData);
        try {
            const response = await axios.post('https://api.datavortex.nl/recipebuddy/users', {
                    'username': registerData.username,
                    'email': registerData.email,
                    'password': registerData.password,
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
            console.error(error);
            errorMessage("Something went wrong, please try again.");
        }
    }


    return (
        <>
            <h2>Hi there! Who are you?</h2>
            <Form fields={fields} onSubmit={onRegister} buttonLabel="Done"/>
        </>
    );
}

export default RegisterForm;
