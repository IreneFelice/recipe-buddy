import {Routes, Route} from 'react-router-dom';
import Footer from './components/footer/Footer.jsx';
import NavBar from '/src/components/nav-bar/NavBar.jsx';
import Home from '/src/pages/home/Home.jsx';
import LoginPage from '/src/pages/login/LoginPage.jsx';
import RecipeBook from '/src/pages/recipe-book/RecipeBook.jsx';
import ForParents from '/src/pages/for-parents/ForParents.jsx';
import './index.css';


function App() {
    return ( <>
        <div className='outer-app-container'>
            <NavBar/>

                <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/recipe-book' element={<RecipeBook/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/for-parents' element={<ForParents/>}/>
            </Routes>

            {/*<Footer/>*/}
        </div>
        </>
    )
}

export default App
