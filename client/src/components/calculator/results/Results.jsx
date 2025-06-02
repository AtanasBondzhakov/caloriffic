import { useSelector } from "react-redux";

import styles from '../results/Results.module.css';
import CustomButton from '../../ui/custom-button/CustomButton.jsx'

export default function Results({
    results,
    handleSave
}) {
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <div className={styles['results-container']}>
            <h2 className={styles['results-heading']}>Results:</h2>
            <div className={styles['results-info']}>
                <p>Body fats (%): <span>{results.bmi ? results.bmi?.toFixed(1) : 0} %</span></p>
                <p>Body fats (kg): <span>{results.bfk ? results.bfk?.toFixed(1) : 0} kg</span></p>
                <p>Lean body mass: <span>{results.lbm ? results.lbm?.toFixed(1) : 0} kg</span></p>
                <p>Basal metabolic rate (BMR): <span>{Math.round(results?.bmr)} kcal</span></p>
                <p>Daily calorie intake: <span>{Math.round(results?.dci)} kcal</span></p>
                <p>Daily calorie intake deficit/excess: <span>{Math.round(results?.dit)} kcal</span></p>
            </div>
            {isAuthenticated && (
                <CustomButton label="Save" handleClick={handleSave} />
            )}
        </div>
    );
};