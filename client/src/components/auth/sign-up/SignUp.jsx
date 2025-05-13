import { useForm } from "../../../hooks/useForm.js";

export default function SignUp() {
    const { values, handleChange, handleSubmit } = useForm({ email: '', password: '', confirmPassword: '' }, signUpSubmitHandler);

    async function signUpSubmitHandler() {
        try {
            await fetch('http://localhost:5000/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} />
                <button>Sign Up</button>
            </form>
        </div>
    );
};