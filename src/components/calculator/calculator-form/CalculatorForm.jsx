import { useState } from "react";
import { bmiCalculate, bmrCalculate, bodyFatsKgCalculate, dailyCaloriesCalculate, lbmCalculate } from "../../../utils/bodyMetrics";
import { useForm } from "../../../hooks/useForm";
import Input from "../../input/Input";

const initialValues = {
    age: '',
    weight: '',
    height: '',
    neck: '',
    abdomen: '',
    waist: '',
    hip: ''
};

export default function CalculatorForm() {
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState('');
    const [results, setResults] = useState({
        bmi: null,
        bfk: null,
        lbm: null,
        bmr: null,
        dci: null
    });

    const { values, handleChange, handleSubmit } = useForm(initialValues, submitHandler);

    function submitHandler() {
        const bodyMassIndex = bmiCalculate(
            gender,
            values.height,
            values.neck,
            values.abdomen,
            values.waist,
            values.hip
        );

        const bodyFats = bodyFatsKgCalculate(values.weight, bodyMassIndex);
        const leanBodyMass = lbmCalculate(values.weight, bodyMassIndex);
        const basalMetabolicRate = bmrCalculate(gender, values.weight, values.height, values.age);
        const dailyIntake = dailyCaloriesCalculate(basalMetabolicRate, activity);

        setResults({
            bmi: bodyMassIndex,
            bfk: bodyFats,
            lbm: leanBodyMass,
            bmr: basalMetabolicRate,
            dci: dailyIntake
        });
    };

    const inputFields = [
        { name: 'age', label: 'Age' },
        { name: 'weight', label: 'Weight' },
        { name: 'height', label: 'Height' },
        { name: 'neck', label: 'Neck' },
        { name: 'abdomen', label: 'Abdomen', disabled: gender === 'female' },
        { name: 'waist', label: 'Waist', disabled: gender === 'male' },
        { name: 'hip', label: 'Hip', disabled: gender === 'male' },
    ];

    return (
        <div className="calc-form-container">
            <h2 className="calc-heading">Enter your data:</h2>
            <form className="calc-form" onSubmit={handleSubmit}>
                <div className="calc-group-radio">
                    <span>Gender:</span>
                    {['male', 'female'].map(g => (
                        <label htmlFor={g} key={g}>
                            <input
                                type="radio"
                                name="gender"
                                id={g}
                                value={g}
                                checked={gender === g}
                                onChange={() => setGender(g)}
                            />
                            {g}
                        </label>
                    ))}
                </div>

                {inputFields.map(field => (
                    <Input
                        key={field.name}
                        className="calc-group"
                        name={field.name}
                        label={field.label}
                        disabled={field.disabled}
                        value={values[field.name]}
                        onChange={handleChange}
                    />
                ))}

                <div className="calc-select">
                    <label htmlFor="activity">Activity:</label>
                    <select name="activity" id="activity" className="select-option" onChange={(e) => setActivity(e.target.value)}>
                        <option value="">Choose...</option>
                        <option value="sedentary">Sedentary: Little or no exercise</option>
                        <option value="light">Light: Exercise 1-3 days per week</option>
                        <option value="moderate">Moderate: Exercise 4-5 days per week</option>
                        <option value="active">Active: Exercise every day</option>
                        <option value="veryActive">Very Active: Exercise twice per day</option>
                    </select>
                </div>
                <button type="submit" className="calc-form-button">Calculate</button>
            </form>

            <span>Result: {results.bmi}, {results.bfk}, {results.lbm}, {results.bmr}, {results.dci}</span>
        </div>
    );
};
