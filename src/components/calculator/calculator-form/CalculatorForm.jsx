import { useState } from "react";
import { bmiCalculate, bmrCalculate, bodyFatsKgCalculate, dailyCaloriesCalculate, lbmCalculate } from "../../../utils/bodyMetrics";
import { useForm } from "../../../hooks/useForm";

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
    }

    return (
        <div className="calc-form-container">
            <h2 className="calc-heading">Enter your data:</h2>
            <form className="calc-form" onSubmit={handleSubmit}>
                <div className="calc-group-radio">
                    <span>Gender:</span>
                    <input
                        type="radio"
                        name="gender"
                        id="male"
                        value='male'
                        checked={gender === 'male'}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                        type="radio"
                        name="gender"
                        id="female"
                        value='female'
                        checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)}

                    />
                    <label htmlFor="female">Female</label>
                </div>
                <div className="calc-group">
                    <label htmlFor='age'>Age:</label>
                    <input
                        type="number"
                        id='age'
                        name='age'
                        onChange={handleChange}
                        value={values.age}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='weight'>Weight:</label>
                    <input
                        type="number"
                        id='weight'
                        name='weight'
                        onChange={handleChange}
                        value={values.weight}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='height'>Height:</label>
                    <input
                        type="number"
                        id='height'
                        name='height'
                        onChange={handleChange}
                        value={values.height}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='neck'>Neck:</label>
                    <input
                        type="number"
                        id='neck'
                        name='neck'
                        onChange={handleChange}
                        value={values.neck}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='abdomen'>Abdomen:</label>
                    <input
                        type="number"
                        id='abdomen'
                        name='abdomen'
                        onChange={handleChange}
                        value={values.abdomen}
                        disabled={gender === 'female'}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='waist'>Waist:</label>
                    <input
                        type="number"
                        id='waist'
                        name='waist'
                        onChange={handleChange}
                        value={values.waist}
                        disabled={gender === 'male'}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='hip'>Hip:</label>
                    <input
                        type="number"
                        id='hip'
                        name='hip'
                        onChange={handleChange}
                        value={values.hip}
                        disabled={gender === 'male'}
                    />
                </div>
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
