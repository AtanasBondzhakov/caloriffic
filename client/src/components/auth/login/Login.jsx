import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { clearError, loginUser } from "../../../store/slices/authSlice";
import { useForm } from "../../../hooks/useForm.js";
import Input from "../../forms/input/Input.jsx";
import { loginSchema } from "../../../schema/loginSchema.js";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector(state => state.auth);

    const { values, errors: validationErrors, handleChange, handleSubmit } = useForm({
        email: '',
        password: ''
    }, loginSubmitHandler, loginSchema);

    useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [dispatch,]);

    async function loginSubmitHandler() {
        const result = await dispatch(loginUser(values));

        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };
    //TODO fix error styles
    return (
        <div className="auth">
            <div className="auth-container">
                <h2>Login</h2>
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
                    <button className="auth-btn">Login</button>
                </form>
                <p className="auth-link">
                    Don&apos;t have an account? <Link to="/auth/register">Register</Link>
                </p>
                {Object.keys(validationErrors).length > 0 && <div className="auth-error">{Object.values(validationErrors).map(el => <p key={el}>{el}</p>)}</div>}
                {error && Object.keys(validationErrors).length === 0 && <p className="auth-error">{error}</p>}
            </div>
        </div>
    );
};