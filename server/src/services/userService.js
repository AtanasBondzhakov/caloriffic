import DailyIntake from "../models/DailyIntake.js";

export const userService = {
    async getDailyIntake(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayString = String(today.getDate()).padStart(2, '0') + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            today.getFullYear();

        const dailyIntake = await DailyIntake.findOne({ owner: userId, date: todayString }).lean();

        return dailyIntake;
    }
};