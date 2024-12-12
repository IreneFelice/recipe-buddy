import { NavLink } from 'react-router-dom';

function NavBar () {
    return(
    <>
        <ul>
            <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : 'default'}>Kitchen</NavLink></li>
            <li><NavLink to="/recipe-book" className={({isActive}) => isActive ? 'active' : 'default'}>My recipe book</NavLink></li>
            <li><NavLink to="/login" className={({isActive}) => isActive ? 'active' : 'default'}>Login</NavLink></li>
            <li><NavLink to="/for-parents" className={({isActive}) => isActive ? 'active' : 'default'}>For Parents</NavLink></li>
        </ul>
    </>
    )
}

export default NavBar;