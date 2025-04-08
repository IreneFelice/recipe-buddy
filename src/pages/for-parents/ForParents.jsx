import BuddySpeaking from '../../components/buddy-speaking/BuddySpeaking.jsx';
import styles from '../for-parents/ForParents.module.css';

function ForParents() {
    return (
            <div className='inner-page-container'>
                <div className={styles['top-text']}>
                <h2>Information for parents</h2>
                <p>*Found recipes are situated on external websites,
                therefor some parental supervision is recommended.</p>
                </div>
                <div className={styles['buddy-speaking-parents-container']}>
                <BuddySpeaking
                    alternativeText={`
                    \nHello there!
                    \nI help kids search for recipes*, 
                    \nconsidering their interests and imagination. 
                    \nSo they can explore, play ánd learn about food! My wish is that your kid will 
                    \n
                    \nhave lots of fun in the kitchen!
                    `}
                    buddyVersion='cake'
                    login={false}
                />
                </div>


            </div>
    )
}

export default ForParents;