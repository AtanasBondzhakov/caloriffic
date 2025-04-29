import { useState } from "react";
import { bmiCalculate } from "../../../utils/bmi";

const initialValues = {
    height: '',
    neck: '',
    abdomen: '',
    waist: '',
    hip: ''
};

export default function CalculatorForm() {
    const [enteredValues, setEnteredValues] = useState(initialValues);
    const [gender, setGender] = useState('male');
    const [bmiResult, setBmiResult] = useState('');

    const handleChange = (e) => {
        setEnteredValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = bmiCalculate(
            gender,
            enteredValues.height,
            enteredValues.neck,
            enteredValues.abdomen,
            enteredValues.waist,
            enteredValues.hip
        );
        setBmiResult(result);
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
                    />
                </div>
                <button type="submit" className="calc-form-button">Calculate</button>
            </form>

            <span>Result: {bmiResult}</span>
        </div>
    );
};
