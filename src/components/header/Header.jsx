import styles from './Header.module.css';
import titleImage from '../../assets/header-title.png';
import kitchenBlock from '../../assets/kitchenBuddy.png';

function Header() {

    return (
        <div className={styles['header-container']}>
            <span className={styles['header-title-img-wrapper']}>
                <img src={titleImage} alt='title saying Recipe Buddy'/>
            </span>
            <span className={styles['header-kitchen-img-wrapper']}>
                <img src={kitchenBlock} alt='illustration kitchen block'/>
            </span>
        </div>
    )
}


export default Header;