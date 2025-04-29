import { useState } from "react";
import { bmiCalculate, bmrCalculate, bodyFatsKgCalculate, dailyCaloriesCalculate, lbmCalculate } from "../../../utils/bmi";

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
    const [enteredValues, setEnteredValues] = useState(initialValues);
    const [gender, setGender] = useState('male');
    const [activity, setActivity] = useState('');
    const [bmiResult, setBmiResult] = useState(null);
    const [bfkResult, setBfkResult] = useState(null);
    const [lbmResult, setLbmResult] = useState(null);
    const [bmrResult, setBmrResult] = useState(null);
    const [dciResult, setDciResult] = useState(null);

    const handleChange = (e) => {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bodyMassIndex = bmiCalculate(
            gender,
            enteredValues.height,
            enteredValues.neck,
            enteredValues.abdomen,
            enteredValues.waist,
            enteredValues.hip
        );

        const bodyFats = bodyFatsKgCalculate(enteredValues.weight, bodyMassIndex);

        const leanBodyMass = lbmCalculate(enteredValues.weight, bodyMassIndex);

        const basalMetabolicRate = bmrCalculate(gender, enteredValues.weight, enteredValues.height, enteredValues.age);

        const dailyIntake = dailyCaloriesCalculate(basalMetabolicRate, activity);

        setBmiResult(bodyMassIndex);
        setBfkResult(bodyFats);
        setLbmResult(leanBodyMass);
        setBmrResult(basalMetabolicRate);
        setDciResult(dailyIntake);
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
                        value={enteredValues.age}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='weight'>Weight:</label>
                    <input
                        type="number"
                        id='weight'
                        name='weight'
                        onChange={handleChange}
                        value={enteredValues.weight}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='height'>Height:</label>
                    <input
                        type="number"
                        id='height'
                        name='height'
                        onChange={handleChange}
                        value={enteredValues.height}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='neck'>Neck:</label>
                    <input
                        type="number"
                        id='neck'
                        name='neck'
                        onChange={handleChange}
                        value={enteredValues.neck}
                    />
                </div>
                <div className="calc-group">
                    <label htmlFor='abdomen'>Abdomen:</label>
                    <input
                        type="number"
                        id='abdomen'
                        name='abdomen'
                        onChange={handleChange}
                        value={enteredValues.abdomen}
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
                        value={enteredValues.waist}
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
                        value={enteredValues.hip}
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

            <span>Result: {bmiResult}, {bfkResult}, {lbmResult}, {bmrResult}, {dciResult}</span>
        </div>
    );
};
