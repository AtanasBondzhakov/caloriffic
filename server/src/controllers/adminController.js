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
        const editedUser = await adminService.editUser(req.params.userId, req.body);
        return res.status(200).json({ success: true, user: editedUser });
    } catch (err) {
        console.error('Edit user error:', err);
        return res.status(500).json({ success: false, message: 'Server error while editing user.' });
    }
});

adminController.get('/manage-users/user/:userId', async (req, res) => {
    try {
        const user = await adminService.getOneUser(req.params.userId);
        return res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch user.' });
    }
});

export default adminController;