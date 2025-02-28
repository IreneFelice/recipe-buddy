import {NavLink, useNavigate} from 'react-router-dom';
import styles from './NavBar.module.css';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext, useEffect, useState} from 'react';

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={styles['outer-nav-container']}>
                <div className={styles['inner-nav-container']}>
                    <ul className={`${styles['nav-list-container']} ${styles.left}`}>
                        <li><NavLink to='/' className={({isActive}) => isActive ? styles.active : styles.default}>
                            Kitchen
                        </NavLink>
                        </li>
                        <li><NavLink to='/recipe-book'
                                     className={({isActive}) => isActive ? styles.active : styles.default}>
                            My recipes
                        </NavLink></li>
                        {/*On mobile device: add all buttons to first list*/}
                        {isMobile && (<>
                                {!isAuth && <li>
                                    <NavLink to='/login'
                                             className={({isActive}) => isActive ? styles.active : styles.default}>
                                        Login
                                    </NavLink>
                                </li>}
                                {isAuth && <li>
                                    <button
                                        type='button'
                                        className={styles['logout-button']}
                                        onClick={() => {
                                            logout();
                                            navigate('/');
                                        }}>
                                        LogOut
                                    </button>
                                </li>}
                                <li><NavLink to='/for-parents'
                                             className={({isActive}) => isActive ? styles.active : styles.default}>
                                    Parents
                                </NavLink></li>
                            </>
                        )}
                    </ul>

                {/*On bigger screens, put next buttons in separate list*/}
                    {!isMobile && (
                    <ul className={`${styles['nav-list-container']} ${styles.right}`}>
                                {!isAuth && <li>
                                    <NavLink to='/login'
                                             className={({isActive}) => isActive ? styles.active : styles.default}>
                                        Login
                                    </NavLink>
                                </li>}
                                {isAuth && <li>
                                    <button
                                        type='button'
                                        className={styles['logout-button']}
                                        onClick={() => {
                                            logout();
                                            navigate('/');
                                        }}>
                                        LogOut
                                    </button>
                                </li>}
                                <li><NavLink to='/for-parents'
                                             className={({isActive}) => isActive ? styles.active : styles.default}>
                                    Parents
                                </NavLink></li>
                    </ul>
                        )}
                </div>
            </div>
        </>
    )
}


export default NavBar;