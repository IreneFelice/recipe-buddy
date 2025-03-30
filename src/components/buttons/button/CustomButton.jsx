import styles from './CustomButton.module.css';

/*<CustomButton text="" color="purple/mint/blue" } />*/

const CustomButton = ({ text, color = 'purple', onClick, type = 'button' }) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[color]}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;