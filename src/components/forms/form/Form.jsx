import { useForm } from 'react-hook-form';
import './Form.css';

function Form({ fields, onSubmit, defaultValues = {}, buttonLabel = "Submit" }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {fields.map(({ name, label, type, validation }) => (
                <div key={name} className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input
                        id={name}
                        type={type}
                        {...register(name, validation)}
                    />
                    {errors[name] && <p className="error-message">{errors[name].message}</p>}
                </div>
            ))}
            <button type="submit">{buttonLabel}</button>
        </form>
    );
}

export default Form;