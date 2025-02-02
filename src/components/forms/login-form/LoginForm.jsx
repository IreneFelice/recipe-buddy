import {useContext} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import Form from "../form/Form.jsx";

function LoginForm({errorMessage}) {
    const {login} = useContext(AuthContext);
    const fields = [
        { name: "email", label: "Email", type: "email", validation: { required: "What is your e-mail address?" } },
        { name: "password", label: "Password", type: "password", validation: { required: "Give your secret password" } }
    ];

    const handleLogin = (data) => {
        console.log("Login Data:", data);
        login(true, {errorMessage});
    };


    return (
        <>
            <h2>Login</h2>
            <Form fields={fields} onSubmit={handleLogin} buttonLabel="Log in" />
        </>
    );
}

export default LoginForm;