import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {},
        // recipeBook: null,
        status: 'pending',
    });

    // PERSIST ON REFRESH //
    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {

                try {
                    const decodedToken = jwtDecode(token);
                    console.log("decoded:", decodedToken);
                    if (isTokenValid(decodedToken)) {
                        await login(token);  // login if token is valid
                    } else { // token expired, delete token through logout
                        console.log('token expired');
                        logout();
                    }
                } catch (error) { // decoderen gaat fout
                    console.error("Token could not be validated:", error);
                    logout();
                }
            } else {
                logout();
            }
        };

        validateToken();
    }, []);

    // LOGIN //
    async function login(token) {

        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        console.log("User is logged in! Token decoded.")
        try {
            const response = await axios.get(`https://api.datavortex.nl/recipebuddy/users/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            setAuth({
                isAuth: true,
                user: {
                    name: response.data.username,
                    email: response.data.email,
                    password: response.data.password,
                },
                status: 'done',
            });

        } catch (error) {
            console.log(error);
            logout();
        }
    }

    // LOGOUT //
    function logout() {
        setAuth({
            isAuth: false,
            user: {},
            status: 'done',
        });
        localStorage.removeItem('token');
        console.log("User logged out!");
    }

    const contextData = {
        isAuth: auth.isAuth,
        auth: auth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
