import User from '../models/userSchema.js'
import asyncHandler from '../utils/asyncHandler.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//REGISTER
export const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //check exist user
    const exist = await User.findOne({ email: email });
    if (exist) {
        return res.status(409).json({ success: false, message: "email already exist" });
    }

    //create new user
    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });
    res.status(201).json({ success: true, message: "user register successfully" });
})

//LOGIN
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //admin login
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const accessToken = jwt.sign(
            { userId: "admin", role: "admin" },
            process.env.AC_SECRET_KEY,
            { expiresIn: "15m" }
        );
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken
        });
    }
    //user login
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const refreshToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.RF_SECRET_KEY,
        { expiresIn: "7d" }
    );
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.AC_SECRET_KEY,
        { expiresIn: "15m" }
    );

    //set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    //send access token in response
    res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken
    });
});

//REFRESH
export const refresh = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.RF_SECRET_KEY);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId, role: decoded.role },
            process.env.AC_SECRET_KEY,
            { expiresIn: "15m" }
        );

        res.json({ success: true, message: "Access token refreshed", accessToken: newAccessToken });

    } catch (err) {
        return res.sendStatus(403);
    }
});

export const logout = asyncHandler(async (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});

