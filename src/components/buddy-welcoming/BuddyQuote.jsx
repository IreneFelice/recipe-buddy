import {AuthContext} from '../../context/AuthContext.jsx';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './BuddyQuote.module.css'
import CustomButton from '../buttons/button/CustomButton.jsx';


function BuddyQuote () {
    const {auth,isAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const buddyQuoteLoggedIn = `Hi ${auth.user.name}! \nWelcome to my kitchen! \n
                I'm always happy to be your Buddy, and help you search \n
                for the BEST RECIPES!\n
                Check out my cool dashboard below...\n
                Try all settings and click the Search button!\n
                Good Luck!`;
    const buddyQuoteLoggedOut = `Hi there!\nPlease log in first,\n
                so we can search recipes together.\n
                You can also save your favorite recipes\n
                in your very own recipe book!`;
    const lines = buddyQuoteLoggedIn.split("\n");
    const loggedOutLines = buddyQuoteLoggedOut.split("\n");

return (
    <div className={styles['buddy-quote-outer-container']}>

        <div className={styles['buddy-quote-text']}>

        {isAuth ? (
    lines.map((line, index) => {
        return <p key={index}>{line}</p>
    })
    ) : (loggedOutLines.map((line, index) => {
            return <p key={index}>{line}</p>})
        )
    }
        </div>
        {!isAuth && <div className={styles['button-container']}>
             <CustomButton text='Go to Log In page' color='blue' onClick={() => {
        navigate('/login');
    }}/></div>}
    </div>
);
}

export default BuddyQuote;
