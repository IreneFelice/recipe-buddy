import { useForm } from 'react-hook-form';
import styles from './Form.module.css';

function Form({ fields, onSubmit, defaultValues = {}, buttonLabel = 'Submit'}) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['form-container']}>
            {fields.map(({ name, label, type, validation }) => (
                <div key={name} className={styles['form-group']}>
                    <label htmlFor={name}>{label}</label>
                    <input
                        id={name}
                        type={type}
                        {...register(name, validation)}
                        className={styles['form-input']}
                    />
                    {errors[name] && <p className={styles['error-message']}>{errors[name].message}</p>}
                </div>
            ))}
            <button type='submit' className={styles['form-button']}>{buttonLabel}</button>
        </form>
    );
}

export default Form;