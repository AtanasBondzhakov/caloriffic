import User from "../models/User.js"

export const adminService = {
    async getAllUsers() {
        const users = await User.find({}, '-password');
        return users;
    },
    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    },
    async editUser(userId, userData) {
        const user = await User.findByIdAndUpdate(userId, userData, {
            runValidators: true, new: true
        }).select('-password');
        
        return user;
    },
    async getOneUser(userId) {
        const user = await User.findById(userId);
        return user;
    }
}