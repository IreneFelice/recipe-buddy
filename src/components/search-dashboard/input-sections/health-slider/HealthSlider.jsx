import { useState } from 'react';
import styles from './HealthSlider.module.css';

function HealthSlider({ setValue }) {
    const [level, setLevel] = useState(3);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const healthLevels = {
        5: { label: "Super healthy", maxGI: 15, maxFASAT: 1.5, minFIBTG: 8, maxFAMS: 20, color: '#388E3C' },
        4: { label: "Healthy", maxGI: 30, maxFASAT: 3, minFIBTG: 5, maxFAMS: 15, color: '#8BC34A' },
        3: { label: "Not too (un)healthy", maxGI: 45, maxFASAT: 6, minFIBTG: 3, maxFAMS: 10, color: '#FFC107' },
        2: { label: "Medium unhealthy", maxGI: 60, maxFASAT: 10, minFIBTG: 1, maxFAMS: 7, color: '#F57C00' },
        1: { label: "Unhealthy", maxGI: 80, maxFASAT: 15, minFIBTG: 0, maxFAMS: 5, color: '#D32F2F' },
    };

    const handleChange = (event) => {
        const newLevel = Number(event.target.value);
        setLevel(newLevel);
        setTooltipVisible(true);

        const { maxGI, maxFASAT, minFIBTG, maxFAMS } = healthLevels[newLevel];

        const queryParams = {
            'nutrients[SUGAR]': `0-${Math.max(10, maxGI / 2)}`,
            'nutrients[CHOCDF]': `0-${maxGI}`,
            'nutrients[FIBTG]': `${minFIBTG}-100`,
            'nutrients[FASAT]': `0-${maxFASAT}`,
            'nutrients[FAMS]': `0-${maxFAMS}`
        };

        setValue('health', queryParams);

        setTimeout(() => setTooltipVisible(false), 1000);
    };

    return (
        <div className={styles['slider-wrapper']}>
            <div
                className={styles['health-indicator']}
                style={{ backgroundColor: healthLevels[level].color }}
            ><p>Healthy meter</p></div>

            <div className={`${styles.tooltip} ${tooltipVisible ? styles.visible : ''}`}>
            {healthLevels[level].label}
            </div>

            <input
                type='range'
                min='1'
                max='5'
                value={level}
                onChange={handleChange}
                className={styles['health-slider']}
            />
        </div>
    );
}

export default HealthSlider;