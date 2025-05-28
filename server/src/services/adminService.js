import User from "../models/User.js"

export const adminService = {
    async getAllUsers() {
        const users = await User.find({}, '-password');
        return users;
    }
}