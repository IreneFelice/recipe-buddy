import styles from './BuddyWelcoming.module.css';
import buddyWelcome from '../../assets/buddy-with-egg.png';
import textBalloon from '../../assets/empty-text-balloon.png';
// import CircleText from './CircleText.jsx';
import BuddyQuote from './BuddyQuote.jsx';
// import {AuthContext} from '../../context/AuthContext.jsx';
// import {useContext} from 'react';

function BuddyWelcoming() {
    // const {isAuth} = useContext(AuthContext);

    return (
        <>
            <section className={styles['buddy-speaking-container']}>
                <div className={styles['buddy-img-container']}>
                    <img src={buddyWelcome} alt='animation of dog dressed as chef, from: freepik.com'/>
                </div>
                    <div className={styles['text-balloon-inner-wrapper']}>
                        <div className={styles['balloon-context']}>
                        {/*    <CircleText text={isAuth ? buddyQuoteLoggedIn : buddyQuoteLoggedOut}/>*/}
                        <BuddyQuote/>
                        </div>
                        <img src={textBalloon} alt='textballoon as background for welcoming text'/>
                    </div>
            </section>
        </>
    )
}

export default BuddyWelcoming;