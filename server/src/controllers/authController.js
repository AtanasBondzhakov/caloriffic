import { Router } from "express";
import { authService } from "../services/authService.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        const { newUser, token } = await authService.register(email, password, confirmPassword);

        res.cookie('auth', token, { httpOnly: true });
        res.status(201).json({
            id: newUser._id,
            email: newUser.email,
            token
        })
    } catch (err) {
        res.status(409).json('Email already exist!')
        console.log(err.message);
    }
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, token } = await authService.login(email, password);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
        res.status(200).json({
            id: user._id,
            email: user.email,
            token,
        });
    } catch (err) {
        res.status(401).json('Invalid credentials!');
        console.log(err.message);
    }
});

export default authController;