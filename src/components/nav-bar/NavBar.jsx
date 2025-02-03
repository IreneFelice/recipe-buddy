import {NavLink, useNavigate} from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext} from "react";

function NavBar() {
    const navigate = useNavigate();
    const { isAuth, logout } = useContext(AuthContext);

    return (
        <div className="outer-nav-container">
            <div className="inner-nav-container">

            <ul className="nav-list-container left">
                <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : 'default'}>Kitchen</NavLink></li>
                <li><NavLink to="/recipe-book" className={({isActive}) => isActive ? 'active' : 'default'}>My recipe
                    book</NavLink></li>
            </ul>
            <ul className="nav-list-container right">
                {!isAuth && <li><NavLink to="/login" className={({isActive}) => isActive ? 'active' : 'default'}>Login</NavLink>
                </li>}
                {isAuth &&  <button
                    type="button"
                    className="logout-button"
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}>
                   Log out
                </button>}
                <li><NavLink to="/for-parents" className={({isActive}) => isActive ? 'active' : 'default'}>For
                    Parents</NavLink></li>
            </ul>
            </div>

            <p className="test-object">Test-object</p>

        </div>
    )
}

export default NavBar;