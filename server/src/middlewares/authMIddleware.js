import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;

        next();
    } catch (err) {
        res.clearCookies('auth');
        res.status(401).json({ success: false, message: 'Invalid token!' });
    }
};