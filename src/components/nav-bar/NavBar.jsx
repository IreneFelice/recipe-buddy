import {NavLink} from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <div className="outer-nav-container">
            <div className="inner-nav-container">

            <ul className="nav-list-container left">
                <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : 'default'}>Kitchen</NavLink></li>
                <li><NavLink to="/recipe-book" className={({isActive}) => isActive ? 'active' : 'default'}>My recipe
                    book</NavLink></li>
            </ul>
            <ul className="nav-list-container right">
                <li><NavLink to="/login" className={({isActive}) => isActive ? 'active' : 'default'}>Login</NavLink>
                </li>
                <li><NavLink to="/for-parents" className={({isActive}) => isActive ? 'active' : 'default'}>For
                    Parents</NavLink></li>
            </ul>
            </div>

            <p className="test-object">Test-object</p>

        </div>
    )
}

export default NavBar;