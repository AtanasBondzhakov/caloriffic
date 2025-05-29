import { Router } from "express";

import { adminService } from "../services/adminService.js";
import User from "../models/User.js";

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

adminController.delete('/manage-users/delete/:userId', async (req, res) => {
    try {
        await adminService.deleteUser(req.params.userId);
        return res.status(200).json({ success: true, message: 'User deleted successfully.' })
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ success: false, message: 'Server error while deleting user' });
    }
});

export default adminController;