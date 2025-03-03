import styles from './CustomButton.module.css';

const CustomButton = ({ text, color = 'purple', onClick, type = "button" }) => {
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