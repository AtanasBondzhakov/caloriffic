import { useState } from "react";
import { useDispatch } from 'react-redux';

import { bmiCalculate, bmrCalculate, bodyFatsKgCalculate, dailyCaloriesCalculate, dailyIntakeTargetCalculate, lbmCalculate } from "../../../utils/bodyMetrics";
import { useForm } from "../../../hooks/useForm";
import { saveCalculation } from "../../../store/slices/bodyMetricsSlice.js";
import Results from "../results/Results.jsx";
import Select from "../../forms/select/Select.jsx";
import Input from "../../forms/input/Input.jsx";
import Button from "../../ui/button/Button.jsx";

const formInitialValues = {
    age: '',
    weight: '',
    height: '',
    neck: '',
    abdomen: '',
    waist: '',
    hip: '',
    activity: 'choose',
    calorieIntake: 'choose'
};

const resultInitialValues = {
    bmi: null,
    bfk: null,
    lbm: null,
    bmr: null,
    dci: null,
    dit: null
};

const activityOptions = [
    { value: "sedentary", label: 'Sedentary: Little or no exercise' },
    { value: "light", label: 'Light: Exercise 1-3 days per week' },
    { value: "moderate", label: 'Moderate: Exercise 4-5 days per week' },
    { value: "active", label: 'Active: Exercise every day' },
    { value: "veryActive", label: 'Very Active: Exercise twice per day' },
];

const calorieIntakeOptions = [
    { value: "25deficit", label: '25% deficit' },
    { value: "20deficit", label: '20% deficit' },
    { value: "15deficit", label: '15% deficit' },
    { value: "noChange", label: 'No deficit/excess' },
    { value: "10excess", label: '10% excess' },
    { value: "15excess", label: '15% excess' },
    { value: "20excess", label: '20% excess' }
]

export default function CalculatorForm() {
    const dispatch = useDispatch();

    const [gender, setGender] = useState('male');
    const [results, setResults] = useState(resultInitialValues);

    const inputFields = [
        { name: 'age', label: 'Age' },
        { name: 'weight', label: 'Weight' },
        { name: 'height', label: 'Height' },
        { name: 'neck', label: 'Neck' },
        { name: 'abdomen', label: 'Abdomen', disabled: gender === 'female' },
        { name: 'waist', label: 'Waist', disabled: gender === 'male' },
        { name: 'hip', label: 'Hip', disabled: gender === 'male' },
    ];

    const { values, handleChange, handleSubmit } = useForm(formInitialValues, submitHandler);

    const calculateMetrics = () => {
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
        const dailyIntake = dailyCaloriesCalculate(basalMetabolicRate, values.activity);
        const dailyIntakeTarget = dailyIntakeTargetCalculate(dailyIntake, values.calorieIntake);

        return {
            bmi: bodyMassIndex,
            bfk: bodyFats,
            lbm: leanBodyMass,
            bmr: basalMetabolicRate,
            dci: dailyIntake,
            dit: dailyIntakeTarget
        }
    };

    function submitHandler() {
        const calculatedResults = calculateMetrics();

        setResults(calculatedResults);
    };

    const handleSave = () => {
        dispatch(saveCalculation(results));
        setResults(resultInitialValues);
    };

    return (
        <div className="metrics">
            <div className="calc-form-container">
                <h2 className="calc-heading">Enter your data:</h2>
                <form className="calc-form" onSubmit={handleSubmit}>
                    <div className="calc-group-radio">
                        <span>Gender</span>
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
                            type="number"
                            name={field.name}
                            label={field.label}
                            disabled={field.disabled}
                            value={values[field.name]}
                            onChange={handleChange}
                        />
                    ))}

                    <div className="calc-select">
                        <Select
                            className="select-option"
                            name="activity"
                            onChange={handleChange}
                            options={activityOptions}
                            value={values.activity}
                        />
                    </div>
                    <div className="calc-select">
                        <Select
                            className="select-option"
                            name="calorieIntake"
                            onChange={handleChange}
                            options={calorieIntakeOptions}
                            value={values.calorieIntake}
                        />
                    </div>
                    <Button
                        className="calc-form-button"
                        type="submit"
                        label="Calculate"
                    />
                </form>
            </div>
            <Results results={results} handleSave={handleSave} />
        </div>
    );
};
