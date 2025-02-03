import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import isTokenValid from "../helpers/isTokenValid";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    // PERSIST ON REFRESH //
    useEffect(() => {
        // is er een token?
        // zo ja, probeer te decoderen en check geldigheid.
        //// gelukt en geldig? login()
        //// lukt dat niet en/of niet geldig: logout()


        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (token) {

                try {
                    const decodedToken = jwtDecode(token);
                    console.log("decoded:", decodedToken);
                    if (isTokenValid(decodedToken)) {
                        await login(token);  // login als token valid is
                    } else { // token expired, delete token through logout
                        console.log('token is verlopen en wordt verwijderd.. Opnieuw inloggen.');
                        logout();
                    }
                } catch (error) { // decoderen gaat fout
                    console.error("Fout bij het valideren van de token:", error);
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
        const id = decodedToken.sub;
        console.log("User is logged in! Token decoded.")
        try {
            const response = await axios.get(`https://api.datavortex.nl/recipebuddy/users/${id}`, {
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
                    id: response.data.id,
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
            user: null,
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

// export const AuthContext = createContext({});
//
// function AuthContextProvider({children}) {
//     const [isAuth, toggleIsAuth] = useState(false);
//
//     function login(iswhat){
//         toggleIsAuth(iswhat);
//         console.log("user logged in!");
//     }
//
//     function logout() {
//         toggleIsAuth(false);
//         console.log("user logged out");
//     }
//
//     return (
//       <AuthContext.Provider value={{
//           login: login,
//           logout: logout,
//           isAuth: isAuth,
//       }}>
//           {children}
//           </AuthContext.Provider>
//     );
// }
//
// export default AuthContextProvider;
//
//
