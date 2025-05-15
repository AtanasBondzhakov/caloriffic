import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { clearError, loginUser } from "../../../store/slices/authSlice";
import { useForm } from "../../../hooks/useForm.js";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.auth);

    const { values, handleChange, handleSubmit } = useForm({ email: '', password: '' }, loginSubmitHandler);

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch]);

    async function loginSubmitHandler() {
        const result = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <h2>Login</h2>
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
                    <button className="auth-btn">Login</button>
                </form>
                <p className="auth-link">
                    Don&apos;t have an account? <Link to="/auth/register">Register</Link>
                </p>
                {error && <p className="auth-error">{error.message}</p>}
            </div>
        </div>
    );
};