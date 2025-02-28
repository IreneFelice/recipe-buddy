import styles from './BuddyWelcoming.module.css';
import buddyWelcome from '../../assets/buddy-with-egg.png';
import textBalloon from '../../assets/empty-text-balloon.png';
import CircleText from './CircleText.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from 'react';

function BuddyWelcoming() {
    const {auth, isAuth} = useContext(AuthContext);
    const buddyQuoteLoggedIn = `Hi there ${auth.user.name}! \nWelcome to my kitchen! \nI'm always happy to be your Buddy, and help you search \nfor the BEST RECIPES! Are you ready? \nLook beneath to check out my cool dashboard!\nFeel free to use it and click on Search Recipes!\n Good Luck!`;
    const buddyQuoteLoggedOut = "Hi! Please Log in first\n******\n****\n***\n**\n*";


    return (
        <>
            <section className={styles['buddy-speaking-container']}>
                <div className={styles['buddy-img-container']}>
                    <img src={buddyWelcome} alt='animation of dog dressed as chef, from: freepik.com'/>
                </div>

                <div className={styles['text-balloon-wrapper']}>
                    <div className={styles['balloon-context']}>
                        <CircleText text={isAuth? buddyQuoteLoggedIn : buddyQuoteLoggedOut}/>

                    </div>
                    <img src={textBalloon} alt='textballoon as background for welcoming text'/>
                </div>
            </section>
        </>
    )
}

export default BuddyWelcoming;