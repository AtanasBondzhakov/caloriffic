import User from '../models/User.js'

export const calculatorService = {
    async saveCalculation(userId, bodyMetrics) {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { calculation: bodyMetrics },
            { new: true }
        ).select('-password');

        return updatedUser.calculation;
    }
}