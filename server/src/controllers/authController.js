import { Router } from "express";
import User from "../models/User.js";

const authController = Router();

authController.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users', err);
        res.status(500).json({ error: 'Server error' })
    }
})

authController.post('/sign-up', async (req, res) => {
    const { email, password } = req.body;
    try {

        await User.create({ email, password })
    } catch (err) {
        res.status(400).json('Email exist')
        console.log(err.message);

    }
})

export default authController;