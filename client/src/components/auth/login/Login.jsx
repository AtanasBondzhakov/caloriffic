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
            })

            console.log(values);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="sign-up">
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={values.email} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={values.password} onChange={handleChange} />
                <button>Login</button>
            </form>
        </div>
    );
};