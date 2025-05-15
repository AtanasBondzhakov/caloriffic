export default function Results({
    results,
    handleSave
}) {
    return (
        <div className="results-container">
            <h2 className="results-heading">Results:</h2>
            <div className="results-info">
                <p>Body fats (%): {results.bmi ? results.bmi?.toFixed(1) : 0} %</p>
                <p>Body fats (kg): {results.bfk ? results.bfk?.toFixed(1) : 0} kg</p>
                <p>Lean body mass: {results.lbm ? results.lbm?.toFixed(1) : 0} kg</p>
                <p>Basal metabolic rate (BMR): {Math.round(results?.bmr)} kcal</p>
                <p>Daily calorie intake: {Math.round(results?.dci)} kcal</p>
                <p>Daily calorie intake deficit/excess: </p>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};