import User from "../models/User.js"

export const adminService = {
    async getAllProfiles() {
        const profiles = await User.find({}, '-password');
        return profiles;
    }
}