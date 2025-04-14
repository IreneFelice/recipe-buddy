import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
import AuthContextProvider from "./context/AuthContext";
import SavedRecipesContextProvider, {SavedRecipesContext} from './context/SavedRecipesContext.jsx';


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <SavedRecipesContextProvider>

            <Router>
                <App/>
            </Router>

        </SavedRecipesContextProvider>
    </AuthContextProvider>
)
