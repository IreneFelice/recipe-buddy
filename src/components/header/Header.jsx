import styles from './Header.module.css';

function Header() {

    return (
        <div className={styles['header-container']}>
            <h1>Recipe Buddy</h1>
        </div>
    )
}


export default Header;