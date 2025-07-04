import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import { clearError, loginUser } from "../../../store/slices/authSlice";
import { useForm } from "../../../hooks/useForm.js";
import Input from "../../forms/input/Input.jsx";
import { loginSchema } from "../../../schema/loginSchema.js";
import styles from '../login/Login.module.css';
import ErrorMessage from "../../ui/error-message/ErrorMessage.jsx";
import Button from "../../ui/custom-button/CustomButton.jsx";

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
    return (
        <div className={styles.auth}>
            <div className={styles['auth-container']}>
                <h2>Login</h2>
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
                    <Button type="submit" label="Login" />
                </form>
                <p className={styles['auth-link']}>
                    Don&apos;t have an account? <Link to="/auth/register">Register</Link>
                </p>
                {Object.keys(validationErrors).length > 0 && <ErrorMessage errors={Object.values(validationErrors)} />}
                {error && Object.keys(validationErrors).length === 0 && <ErrorMessage errors={[error]} />}
            </div>
        </div>
    );
};