import styles from './Header.module.css';
import titleImage from '../../assets/header-title.png';
import kitchenBlock from '../../assets/kitchenBuddy.png';
import BuddySpeaking from '../buddy-speaking/BuddySpeaking.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from 'react';

function Header() {
    const {isAuth} = useContext(AuthContext);
    return (
        <div className={styles['header-container']}>
            <div className={styles['header-title-img-wrapper']}>
                <img src={titleImage} alt='title saying Recipe Buddy'/>
            </div>
            <div className={styles['header-kitchen-img-wrapper']}>
                <img src={kitchenBlock} alt='illustration kitchen block'/>
            </div>
            <BuddySpeaking buddyVersion={isAuth ? 'egg' : 'tools' }/>
        </div>
    )
}


export default Header;