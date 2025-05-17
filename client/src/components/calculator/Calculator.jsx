import CalculatorForm from "./calculator-form/CalculatorForm";
import Results from "./results/Results.jsx";

export default function Calculator() {
    return (
        <div className="calculator-container">
            <div className="calculator-header">
                <h1>Calorie Calculator</h1>
                <p>Calculate your daily caloric needs based on your measurements.</p>
            </div>
            <div className="calculator-content">
                <img src="/bodies.png" alt="" className="body-image" />
                <CalculatorForm />
            </div>
        </div>
    );
};
