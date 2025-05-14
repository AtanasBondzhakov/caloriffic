import jwt from "../lib/jwt.js";
import bcrypt from 'bcrypt';

import User from "../models/User.js";

export const authService = {
    async register(email, password, confirmPassword) {
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
        const token = await this.generateToken(newUser);

        return { newUser, token };
    },
    async login(email, password) {
        if (!email || !password) {
            throw new Error('All fields are required!');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password');
        }

        const token = await this.generateToken(user);

        return { user, token }
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

