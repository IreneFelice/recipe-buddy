// import {useContext} from 'react';
import { Routes, Route } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext.jsx';
import NavBar from '/src/components/nav-bar/NavBar.jsx';
import Home from '/src/pages/home/Home.jsx';
import LoginPage from '/src/pages/login/LoginPage.jsx';
import RecipeBook from '/src/pages/recipe-book/RecipeBook.jsx';
import ForParents from '/src/pages/for-parents/ForParents.jsx';
import './App.css';

function App() {
        // const { isAuth } = useContext(AuthContext);

    return (
        <div className="outer-flex-container">
            <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/recipe-book" element={<RecipeBook/>}/>
        <Route path="/for-parents" element={<ForParents/>}/>
    </Routes>

        </div>
    )
}

export default App
