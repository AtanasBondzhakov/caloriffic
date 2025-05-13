import CalculatorForm from "./calculator-form/CalculatorForm";
import Results from "./results/Results.jsx";

export default function Calculator() {
    return (
        <div className="calculator-container">
            <CalculatorForm />
            <Results />
        </div>
    );
};
