import { Router } from "express";

import { adminService } from "../services/adminService.js";

const adminController = Router();

adminController.get('/manage-users', async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
    }
});

export default adminController;