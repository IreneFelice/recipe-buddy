import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import CustomButton from '../buttons/button/CustomButton.jsx';
import styles from './BuddySpeaking.module.css';
import buddyEgg from '../../assets/buddy-with-egg.png';
import buddyCake from '../../assets/buddy-with-cake.png';
import buddyTools from '../../assets/buddy-with-tools.png';
import textBalloon from '../../assets/empty-text-balloon.png';
import buddyQuote, { quoteLoginFirst } from './buddyQuote.js';

function BuddySpeaking({buddyVersion = 'egg', alternativeText = '', login = true}) {
    const { auth, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const buddyImageList = {
        egg: buddyEgg,
        cake: buddyCake,
        tools: buddyTools
    };

    const buddyImage = buddyImageList[buddyVersion] || buddyEgg;

    const quote = login && isAuth
        ? alternativeText || buddyQuote(auth.user.name)
        : (!login && alternativeText) && alternativeText || quoteLoginFirst();

    const lines = quote.split('\n');

    return (
        <section className={styles['buddy-speaking-container']}>
            <div className={styles['buddy-img-container']}>
                <img src={buddyImage} alt={`illustration dog as chef with ${buddyVersion} from freepik.com`}/>
            </div>

            <div className={styles['text-balloon-inner-wrapper']}>
                <img src={textBalloon} alt='textballoon background' />

                <div className={styles['balloon-context']}>
                    <div className={styles['buddy-quote-outer-container']}>
                        <div className={styles['buddy-quote-text']}>
                            {lines.map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>

                        {!isAuth && (
                            <div className={styles['button-container']}>
                                <CustomButton
                                    text='Go to Log In page'
                                    color='blue'
                                    onClick={() => navigate('/login')}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default BuddySpeaking;