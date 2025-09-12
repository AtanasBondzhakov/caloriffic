import { Router } from "express";
import { userService } from "../services/userService.js";

const userController = Router();

userController.get('/profile', async (req, res) => {
    const userId = req.user.id;
    
    try {
        const dailyProducts = await userService.getDailyIntake(userId);
        return res.status(200).json(dailyProducts);
    } catch (err) {
        console.log('Error in fetch products', err) ;
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default userController;