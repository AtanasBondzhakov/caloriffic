import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../../hooks/useForm.js";
import { clearError, registerUser } from "../../../store/slices/authSlice.js";
import Input from "../../forms/input/Input.jsx";
import { registerSchema } from "../../../schema/registerSchema.js";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.auth);

    const { values, errors: validationErrors, handleChange, handleSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    }, registerSubmitHandler, registerSchema);

    useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [dispatch]);

    async function registerSubmitHandler() {
        const result = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(result)) {
            navigate('/');
        }
    };
    //TODO fix error styles
    return (
        <div className="auth">
            <div className="auth-container">
                <h2>Register</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        className="auth-group"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        label="Email"
                        placeholder='john@mail.com'
                    />
                    <Input
                        className="auth-group"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        label="Password"
                        placeholder='******'
                    />
                    <Input
                        className="auth-group"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        label="Confirm Password"
                        placeholder='******'
                    />
                    <button className="auth-btn">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/auth/login">Login</Link>
                </p>
                {Object.keys(validationErrors).length > 0 && <div className="auth-error">{Object.values(validationErrors).map(el => <p key={el}>{el}</p>)}</div>}
                {error && Object.keys(validationErrors).length === 0 && <p className="auth-error">{error}</p>}
            </div>
        </div>
    );
};