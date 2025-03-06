import styles from './BuddyWelcoming.module.css';
import buddyWelcome from '../../assets/buddy-with-egg.png';
import textBalloon from '../../assets/empty-text-balloon.png';
import BuddyQuote from './BuddyQuote.jsx';

function BuddyWelcoming() {

    return (
        <>
            <section className={styles['buddy-speaking-container']}>
                <div className={styles['buddy-img-container']}>
                    <img src={buddyWelcome} alt='animation of dog dressed as chef, from: freepik.com'/>
                </div>
                    <div className={styles['text-balloon-inner-wrapper']}>
                        <div className={styles['balloon-context']}>
                        <BuddyQuote/>
                        </div>
                        <img src={textBalloon} alt='textballoon as background for welcoming text'/>
                    </div>
            </section>
        </>
    )
}

export default BuddyWelcoming;