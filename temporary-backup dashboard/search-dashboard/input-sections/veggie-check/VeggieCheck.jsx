import styles from './VeggieCheck.module.css';
import SwitchButton from '../../../buttons/switch-button/SwitchButton.jsx';

 function VeggieCheck({ register, setValue, getValues }) {

        function handleToggle(upperCaseName, isChecked) {
            const name = upperCaseName.toLowerCase();

            // get current diet values:
            const currentDiet = getValues('diet') || [];

            // add option if button state isOn, or else delete option from current diet values
            const updatedDiet = isChecked
                ? [...new Set([...currentDiet, name])] // no duplicates
                : currentDiet.filter(dietElement => dietElement !== name);
            console.log("Updated Diet in VeggieCheck: ", updatedDiet);

            // Update 'diet' in React Hook Form:
            setValue('diet', updatedDiet);
        }

    return (
        <div className={styles['checkbox-container']}>
            <SwitchButton name='Vegetarian' onToggle={handleToggle}/>
            <SwitchButton name='Vegan' onToggle={handleToggle}/>
        </div>
    );
};

export default VeggieCheck;