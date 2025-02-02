import {createContext, useEffect, useState} from "react";


export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState(false);

    function login(iswhat){
        toggleIsAuth(iswhat);
        console.log("user logged in!");
    }

    function logout() {
        toggleIsAuth(false);
        console.log("user logged out");
    }

    return (
      <AuthContext.Provider value={{
          login: login,
          logout: logout,
          isAuth: isAuth,
      }}>
          {children}
          </AuthContext.Provider>
    );
}

export default AuthContextProvider;


