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

adminController.delete('/manage-users/delete/:userId', async (req, res) => {
    try {
        await adminService.deleteUser(req.params.userId);
        return res.status(200).json({ success: true, message: 'User deleted successfully.' })
    } catch (err) {
        console.error('Delete user error:', err);
        return res.status(500).json({ success: false, message: 'Server error while deleting user.' });
    }
});

adminController.put('/manage-users/edit/:userId', async (req, res) => {
    try {
        await adminService.editUser(req.params.userId, req.body);
        console.log(req.body);
        
        return res.status(200).json({ success: true, message: 'User edited successfully.' });
    } catch (err) {
        console.error('Edit user error:', err);
        return res.status(500).json({ success: false, message: 'Server error while editing user.' });
    }
});

export default adminController;