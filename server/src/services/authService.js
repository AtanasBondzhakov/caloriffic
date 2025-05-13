import User from "../models/User.js";

export const authService = {
    async signUp(email, password, confirmPassword) {
        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords mismatch!');
        }

        const user = await User.findOne({ email: email });

        if (user) {
            throw new Error('Email already exist!')
        }

        const newUser = await User.create({ email, password });
    }
}