import {NavLink, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from 'react';

function NavBar() {
    const navigate = useNavigate();
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <div className={styles['outer-nav-container']}>
            <div className={styles['inner-nav-container']}>

                <ul className={`${styles['nav-list-container']} ${styles.left}`}>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? styles.active : styles.default}>
                        Kitchen
                    </NavLink>
                    </li>
                    <li><NavLink to='/recipe-book' className={({ isActive }) => isActive ? styles.active : styles.default}>
                        My recipe book
                    </NavLink></li>
                </ul>

                <ul className={`${styles['nav-list-container']} ${styles.right}`}>
                    {!isAuth && <li>
                        <NavLink to='/login' className={({ isActive }) => isActive ? styles.active : styles.default}>
                            Login
                        </NavLink>
                    </li>}
                    {isAuth && <button
                        type='button'
                        className={styles['logout-button']}
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}>
                        Log out
                    </button>}
                    <li><NavLink to='/for-parents' className={({ isActive }) => isActive ? styles.active : styles.default}>
                        For Parents
                    </NavLink></li>
                </ul>
            </div>

            <p className={styles['test-object']}>Test-object</p>

        </div>
    )
}

export default NavBar;