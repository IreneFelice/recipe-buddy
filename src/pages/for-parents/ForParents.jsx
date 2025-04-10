import BuddySpeaking from '../../components/buddy-speaking/BuddySpeaking.jsx';
import styles from '../for-parents/ForParents.module.css';
import useLoading from '../../hooks/useLoading.jsx';

function ForParents() {
    const isLoading = useLoading();

    return (
        <>
            {isLoading &&
                <div className={styles['loading']}>
                    <p>Loading...</p>
                </div>
            }
                <div className={isLoading ? styles['page-loading'] : styles['page-ready']}>
                    <div className='inner-page-container'>
                <section className={styles['top-text']}>
                <h2>Information for parents</h2>
                <p>*Found recipes are situated on external websites,
                therefor some parental supervision is recommended.</p>
                </section>
                <section className={styles['buddy-speaking-parents-container']}>
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
                </section>
                    </div>
                </div>
</>
    )
}

export default ForParents;