import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from 'react';
import styles from './Login.module.css';
import LoginForm from '../../components/forms/login-form/LoginForm.jsx';
import {useEffect, useState} from 'react';
import FormRegister from '../../components/forms/register-form/FormRegister.jsx';
import CustomButton from '../../components/buttons/button/CustomButton.jsx';

function LoginPage() {
    const {isAuth, authError} = useContext(AuthContext);
    const [showRegister, toggleShowRegister] = useState(false);
    const [newHere, toggleNewHere] = useState(true);
    const [showLogin, toggleShowLogin] = useState(true);
    const [newName, setNewName] = useState('');


    function handleClickNewHere() {
        toggleShowRegister(true);
        toggleShowLogin(false);
    }

    function resetLoginPage() {
        if (!newName && !isAuth) {
            toggleShowRegister(false);
            toggleShowLogin(true);
            toggleNewHere(true);
        }
    }

    useEffect(() => {
        resetLoginPage();
    }, []);

    useEffect(() => {
        if (newName && !isAuth) {
            toggleShowRegister(false);
            toggleShowLogin(true);
            toggleNewHere(false);
        }
    }, [newName]);

    useEffect(() => {
        if (isAuth) {
            toggleShowRegister(false);
            toggleShowLogin(false);
            toggleNewHere(false);
        } else {
            toggleShowRegister(false);
            toggleShowLogin(true);
            toggleNewHere(true);
        }
    }, [isAuth]);


    return (
        <div className='inner-page-container'>

            <div className={styles['login-container']}>
                {authError && <p className={styles.error}>{authError}</p>}
                {isAuth && <p>You are logged in. Meet Buddy in the kitchen!</p>}
                {newName && <p>Thank you {newName}! You can now login:</p>}
                {showLogin && <LoginForm/>}
            </div>

            {newHere && showLogin &&
                <div className={styles['new-here-button-container']}>
                    <CustomButton
                        type='button'
                        text='I am new here!'
                        color='purple'
                        onClick={handleClickNewHere}
                    />
                </div>
            }

            <div className={styles['register-container']}>
                {showRegister && (
                    <>
                    <CustomButton
                        type='button'
                        color='blue'
                        text='< Back to Login'
                        onClick={resetLoginPage}
                        />
                    <FormRegister newName={setNewName}/>
                </>)}
            </div>

        </div>

    );
}

export default LoginPage;

