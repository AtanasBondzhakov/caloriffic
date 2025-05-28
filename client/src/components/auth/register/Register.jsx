import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "../../../hooks/useForm.js";
import { clearError, registerUser } from "../../../store/slices/authSlice.js";
import Input from "../../forms/input/Input.jsx";
import { registerSchema } from "../../../schema/registerSchema.js";
import styles from '../register/Register.module.css';
import ErrorMessage from "../../ui/error-message/ErrorMessage.jsx";

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
    return (
        <div className={styles['auth']}>
            <div className={styles['auth-container']}>
                <h2>Register</h2>
                <form className={styles['auth-form']} onSubmit={handleSubmit}>
                    <Input
                        className={styles['auth-group']}
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        label="Email"
                        placeholder='john@mail.com'
                    />
                    <Input
                        className={styles['auth-group']}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        label="Password"
                        placeholder='******'
                    />
                    <Input
                        className={styles['auth-group']}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                        label="Confirm Password"
                        placeholder='******'
                    />
                    <button className={styles['auth-btn']}>Register</button>
                </form>
                <p className={styles['auth-link']}>
                    Already have an account? <Link to="/auth/login">Login</Link>
                </p>
                {Object.keys(validationErrors).length > 0 && <ErrorMessage errors={Object.values(validationErrors)} />}
                {error && Object.keys(validationErrors).length === 0 && <ErrorMessage errors={[error]} />}
            </div>
        </div>
    );
};