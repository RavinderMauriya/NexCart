import User from '../models/userSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import imagekit from '../utils/imagekit.js';

//get user profile
export const myProfile = asyncHandler(async (req, res) => {
  //if decode token have role = admin 
  if(req.role === 'admin' && req.userId==='admin'){
    const user = req.user;
    return res.status(200).json({success:true, user})
  }

  const user = await User.findById(req.userId).select('-password').populate('address');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
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
    user,
  });
});

//get all users -- admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//upload avatar/ profile picture
export const uploadAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // upload avatar logic here
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

    //first delete the existing avatar if exists
    if (user.profileImage && user.profileImage.fileId) {
        await imagekit.deleteFile(user.profileImage.fileId);
    }

    //upload new avatar
    const result = await imagekit.upload({
        file: file.buffer,
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
    data: {
      avatar: result.url,
    },
  });
});


//toggle block user -- admin
export const toggleBlock = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  user.isBlocked = !user.isBlocked;
  await user.save();
  res.status(200).json({
    success: true,
    message: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
  });
});
