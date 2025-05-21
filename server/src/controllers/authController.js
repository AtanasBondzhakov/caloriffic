import { Router } from "express";
import { authService } from "../services/authService.js";
import User from "../models/User.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        const { newUser, token } = await authService.register(email, password, confirmPassword);

        res.cookie('auth', token, { httpOnly: true });
        res.status(201).json({
            success: true,
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (err) {
        res.status(409).json({ success: false, message: err.message })
        console.log(err.message);
    }
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, token } = await authService.login(email, password);

        res.cookie('auth', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(401).json({ success: false, message: err.message });
        console.log(err.message);
    }
});

authController.post('/logout', async (req, res) => {
    try {
        res.clearCookie('auth');
        res.status(200).json({ success: true, message: 'Logged out successfully!' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

authController.get('/check-auth', isAuth, async (req, res) => {
    try {
        const existingUser = await User.findById(req.user.id).select('-password');
        const user = { id: existingUser._id, email: existingUser.email, role: existingUser.role };

        res.json({ user });
    } catch (err) {
        console.log(err);

        res.status(500).json(err);
    }
});

export default authController;