import { Router } from "express";
import { adminService } from "../services/adminService.js";

const adminController = Router();

adminController.get('/manage-profiles', async (req, res) => {
    try {
        const profiles = await adminService.getAllProfiles();
        return res.status(200).json(profiles);
    } catch (err) {
        console.error('Error fetching profiles:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch profiles.' });
    }
});

export default adminController;