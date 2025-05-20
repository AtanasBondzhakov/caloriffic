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
        res.clearCookie('auth');
        res.status(401).json({ success: false, message: 'Invalid token!' });
    }
};

export const isAuth = (req, res, next) => {
    if(!req.user) {
       return res.json({success: false, user: null})
    }

    next();
};