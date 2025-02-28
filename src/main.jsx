import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
import AuthContextProvider from "./context/AuthContext";


createRoot(document.getElementById('root')).render(
    <AuthContextProvider>

            <Router>
                <App/>
            </Router>

    </AuthContextProvider>
)
