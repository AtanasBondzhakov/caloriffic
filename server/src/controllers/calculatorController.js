import { Router } from "express";
import { calculatorService } from "../services/calculatorService.js";

const calculatorController = Router();

calculatorController.put('/save-calculation-to-user', async (req, res) => {
    const userId = req.user.id;
    const bodyMetrics = req.body;

    try {
        const calculation = await calculatorService.saveCalculation(userId, bodyMetrics);

        return res.status(200).json(calculation);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to save calculation.' })
    }
});

export default calculatorController;