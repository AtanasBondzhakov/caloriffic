import { useSelector } from "react-redux";
import Button from "../../ui/button/Button";

export default function Results({
    results,
    handleSave
}) {
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        <div className="results-container">
            <h2 className="results-heading">Results:</h2>
            <div className="results-info">
                <p>Body fats (%): {results.bmi ? results.bmi?.toFixed(1) : 0} %</p>
                <p>Body fats (kg): {results.bfk ? results.bfk?.toFixed(1) : 0} kg</p>
                <p>Lean body mass: {results.lbm ? results.lbm?.toFixed(1) : 0} kg</p>
                <p>Basal metabolic rate (BMR): {Math.round(results?.bmr)} kcal</p>
                <p>Daily calorie intake: {Math.round(results?.dci)} kcal</p>
                <p>Daily calorie intake deficit/excess: {Math.round(results?.dit)} kcal</p>
            </div>
            {isAuthenticated && (
                <Button
                    onClick={handleSave}
                    type="button"
                    className="calc-form-button"
                    label="Save"
                />
            )}
        </div>
    );
};