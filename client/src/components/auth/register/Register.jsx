import { Link } from "react-router";

import { useForm } from "../../../hooks/useForm.js";

export default function Register() {
    const { values, handleChange, handleSubmit } = useForm({ email: '', password: '', confirmPassword: '' }, signUpSubmitHandler);

    async function signUpSubmitHandler() {
        try {
            await fetch('http://localhost:5000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
                credentials: 'include'
            })
        } catch (err) {
            console.log(err);
        }
    }
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
            </div>
        </div>
    );
};