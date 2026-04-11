import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});


//get user profile
export const myProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user
    });
});

//update user profile
export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const { name, password } = req.body;

    if (name) {
        user.name = name;
    }
    if (password) {
        user.password = password;
    }

    await user.save();

    res.status(200).json({
        success: true,
        user
    });

});

//get all users -- admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});

//upload avatar/ profile picture
export const uploadAvatar = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    // upload avatar logic here
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    //first delete the existing avatar if exists
    if (user.profileImage && user.profileImage.fileId) {
        await imagekit.deleteFile(user.profileImage.fileId);
    }

    //upload new avatar
    const result = await imagekit.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname,
        folder: "NexCart/Users"
    })

    user.profileImage.url = result.url;
    user.profileImage.fileId = result.fileId;
    user.profileImage.fileName = result.name;

    await user.save();
    res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully",
        url: result.url
    });

});