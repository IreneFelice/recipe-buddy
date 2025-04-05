import styles from './CustomButton.module.css';

/*<CustomButton text="" color="purple/mint/blue" } />*/

const CustomButton = ({ text, color = 'purple', onClick, type = 'button', disabled = false}) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[color]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default CustomButton;