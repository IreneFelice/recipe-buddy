import styles from './CustomButton.module.css';

const CustomButton = ({ text, color = 'purple', onClick }) => {
    return (
        <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default CustomButton;