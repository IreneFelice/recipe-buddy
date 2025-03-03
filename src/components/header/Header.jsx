import styles from './Header.module.css';
import titleImage from '../../assets/header-title.png';
import kitchenBlock from '../../assets/kitchenBuddy.png';
import BuddyWelcoming from '../buddy-welcoming/BuddyWelcoming.jsx';

function Header() {

    return (
        <div className={styles['header-container']}>
            <div className={styles['header-title-img-wrapper']}>
                <img src={titleImage} alt='title saying Recipe Buddy'/>
            </div>
            <div className={styles['header-kitchen-img-wrapper']}>
                <img src={kitchenBlock} alt='illustration kitchen block'/>
            </div>
            <BuddyWelcoming/>
        </div>
    )
}


export default Header;