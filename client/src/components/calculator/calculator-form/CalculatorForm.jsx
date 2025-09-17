import { useState } from "react";
import { useDispatch } from 'react-redux';

import styles from '../calculator-form/CalculatorForm.module.css';
import Input from "../../forms/input/Input.jsx";
import Results from "../results/Results.jsx";
import Select from "../../forms/select/Select.jsx";
import CustomButton from "../../ui/custom-button/CustomButton.jsx";
import ErrorMessage from "../../ui/error-message/ErrorMessage.jsx";

import { bmiCalculate, bmrCalculate, bodyFatsKgCalculate, dailyCaloriesCalculate, dailyIntakeTargetCalculate, lbmCalculate } from "../../../utils/bodyMetrics";
import { useForm } from "../../../hooks/useForm";
import { saveCalculation } from "../../../store/slices/bodyMetricsSlice.js";
import { bodyMetricsSchema } from "../../../schema/bodyMetricsSchema.js";

const formInitialValues = {
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    neck: '',
    abdomen: '',
    waist: '',
    hip: '',
    activity: '',
    calorieIntake: ''
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

    const [results, setResults] = useState(resultInitialValues);

    const { values, errors: validationErrors, handleChange, handleSubmit } = useForm(formInitialValues, submitHandler, bodyMetricsSchema);

    const inputFields = [
        { name: 'age', label: 'Age' },
        { name: 'weight', label: 'Weight' },
        { name: 'height', label: 'Height' },
        { name: 'neck', label: 'Neck' },
        { name: 'abdomen', label: 'Abdomen', disabled: values.gender === 'female' },
        { name: 'waist', label: 'Waist', disabled: values.gender === 'male' },
        { name: 'hip', label: 'Hip', disabled: values.gender === 'male' },
    ];

    const calculateMetrics = () => {
        const bodyMassIndex = bmiCalculate(
            values.gender,
            values.height,
            values.neck,
            values.abdomen,
            values.waist,
            values.hip
        );

        const bodyFats = bodyFatsKgCalculate(values.weight, bodyMassIndex);
        const leanBodyMass = lbmCalculate(values.weight, bodyMassIndex);
        const basalMetabolicRate = bmrCalculate(values.gender, values.weight, values.height, values.age);
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
        <div className={styles['metrics']}>
            <div className={styles['calc-form-container']}>
                <h2 className={styles['calc-heading']}>Enter your data:</h2>
                <form className={styles['calc-form']} onSubmit={handleSubmit}>
                    <div className={styles['calc-group-radio']}>
                        <span>Gender</span>
                        {['male', 'female'].map(g => (
                            <label htmlFor={g} key={g}>
                                <input
                                    type="radio"
                                    name="gender"
                                    id={g}
                                    value={g}
                                    checked={values.gender === g}
                                    onChange={handleChange}
                                />
                                {g}
                            </label>
                        ))}
                    </div>

                    {inputFields.map(field => (
                        <Input
                            key={field.name}
                            className={styles['calc-group']}
                            type="number"
                            name={field.name}
                            label={field.label}
                            disabled={field.disabled}
                            value={values[field.name]}
                            onChange={handleChange}
                        />
                    ))}

                    <div className={styles['calc-select']}>
                        <Select
                            className={styles['select-option']}
                            name="activity"
                            label="Activity"
                            onChange={handleChange}
                            options={activityOptions}
                            value={values.activity}
                        />
                    </div>
                    <Select
                        className={styles['select-option']}
                        name="calorieIntake"
                        label="Calorie Intake"
                        onChange={handleChange}
                        options={calorieIntakeOptions}
                        value={values.calorieIntake}
                    />
                    <CustomButton
                        type="submit"
                        label="Calculate"
                        className={styles['calc-form-button']}
                    />
                </form>
                {Object.keys(validationErrors).length > 0 && <ErrorMessage errors={Object.values(validationErrors)} />}
            </div>
            <Results results={results} handleSave={handleSave} />
        </div>
    );
};
