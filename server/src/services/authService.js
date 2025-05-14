import jwt from "../lib/jwt.js";
import bcrypt from 'bcrypt';

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

        return this.generateToken(newUser)
    },
    async login(email, password) {
        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, existingUser.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        return this.generateToken(existingUser);
    },
    async generateToken(user) {
        const payload = {
            id: user._id,
            email: user.email
        };

        const header = { expiresIn: '2h' };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        return token;
    }
}

