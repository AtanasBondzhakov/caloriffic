import { Link } from "react-router";

import { useForm } from "../../../hooks/useForm.js";

export default function Login() {
    const { values, handleChange, handleSubmit } = useForm({ email: '', password: '' }, loginSubmitHandler);

    async function loginSubmitHandler() {
        try {
            await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login">

            <div className="auth-container">
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-group">
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
                    <div className="login-group">
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
                    <button className="login-btn">Login</button>
                </form>
                <p className="link-reg">
                    Don&apos;t have an account? <Link to="/auth/sign-up">Sign up</Link>
                </p>
            </div>
        </div>
    );
};