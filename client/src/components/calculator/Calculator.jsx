import CalculatorForm from "./calculator-form/CalculatorForm";
import Results from "./results/Results.jsx";
import styles from '../calculator/Calculator.module.css';

export default function Calculator() {
    return (
        <div className={styles['calculator-container']}>
            <div className={styles['calculator-header']}>
                <h1>Calorie Calculator</h1>
                <p>Calculate your daily caloric needs based on your measurements.</p>
            </div>
            <div className={styles['calculator-content']}>
                <div className={styles['image']}>
                    <img src="/bodies.png" alt="" className={styles['body-image']} />
                </div>
                <CalculatorForm />
            </div>
        </div>
    );
};
