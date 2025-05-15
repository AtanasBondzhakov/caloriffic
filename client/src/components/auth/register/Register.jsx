import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../../hooks/useForm.js";
import { clearError, registerUser } from "../../../store/slices/authSlice.js";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.auth);

    const { values, handleChange, handleSubmit } = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    }, registerSubmitHandler);

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch]);

    async function registerSubmitHandler() {
        const result = await dispatch(registerUser(values));

        if (registerUser.fulfilled.match(result)) {
            navigate('/');
        }
    };
    return (
        <div className="auth">
            <div className="auth-container">
                <h2>Register</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder='john@mail.com'
                            value={values.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='******'
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="auth-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder='******'
                            value={values.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="auth-btn">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/auth/login">Login</Link>
                </p>
                {error && <p className="auth-error">{error.message}</p>}
            </div>
        </div>
    );
};