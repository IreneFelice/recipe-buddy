import { AuthContext } from '../../context/AuthContext.jsx';
import {useContext} from 'react';
import './Login.css';
import LoginForm from '../../components/forms/login-form/LoginForm.jsx';
import {useEffect, useState} from 'react';
import FormRegister from '../../components/forms/register-form/FormRegister.jsx';

function LoginPage() {
    const [error, setError] = useState("");
    const [showRegister, toggleShowRegister] = useState(false);
    const [newHere, toggleNewHere] = useState(true);
    const [showLogin, toggleShowLogin] = useState(true);
    const [newName, setNewName] = useState("");
    const { isAuth } = useContext(AuthContext);

    function handleClickNewHere() {
        toggleShowRegister(true);
        toggleShowLogin(false);
    }

    useEffect(() => {
        if (newName && !isAuth) {
            toggleShowRegister(false);
            toggleShowLogin(true);
            toggleNewHere(false);
        }
    }, [newName]);

    useEffect(()=>{if (isAuth) {
        toggleShowRegister(false);
        toggleShowLogin(false);
        toggleNewHere(false);
    } else {
        toggleShowRegister(false);
        toggleShowLogin(true);
        toggleNewHere(true);
    }
    },[isAuth]);



    return (
            <div className="login-outer-container">

                <div className="login-container">
                    {error && <p className="error">{error}</p>}
                    {isAuth && <p>You are logged in. Meet Buddy in the kitchen!</p>}
                    {newName && <p>Thank you {newName}! You can now login:</p>}
                    {showLogin && <LoginForm errorMessage={setError}/>}
                </div>

                {newHere && showLogin &&
                    <span className="new-here-button-container">
                    <button className="new-here-button" type="button"
                            onClick={handleClickNewHere}>I am new here!</button>
                    </span>
                }
                <div className="register-container">
                    {showRegister && <FormRegister errorMessage={setError} newName={setNewName}/>}
                </div>

            </div>

    );
}

export default LoginPage;

