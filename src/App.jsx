import { Routes, Route } from 'react-router-dom';
import NavBar from '/src/components/nav-bar/NavBar.jsx';
import Home from '/src/pages/home/Home.jsx';
import Login from '/src/pages/login/Login.jsx';
import RecipeBook from '/src/pages/recipe-book/RecipeBook.jsx';
import ForParents from '/src/pages/for-parents/ForParents.jsx';
import './App.css';

function App() {


    return (
        <div className="outer-flex-container">
            <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/recipe-book" element={<RecipeBook/>}/>
        <Route path="/for-parents" element={<ForParents/>}/>
    </Routes>

        </div>
    )
}

export default App
