// /api/user/profile
import multer from 'multer';
import express from 'express';
import { myProfile, updateProfile, getAllUsers, uploadAvatar, toggleBlock } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { addAddress, updateAddress, deleteAddress, getAddresses } from '../controllers/addressController.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/me', authMiddleware(), myProfile);
router.put('/update', authMiddleware(), updateProfile);
router.get('/all', authMiddleware('admin'), getAllUsers);
router.post("/upload-avatar", authMiddleware(), upload.single("avatar"), uploadAvatar);
router.put('/block/:id', authMiddleware('admin'), toggleBlock);

router.get("/address", authMiddleware(), getAddresses);
router.post("/address", authMiddleware(), addAddress);
router.put("/address/:addressId", authMiddleware(), updateAddress);
router.delete("/address/:addressId", authMiddleware(), deleteAddress);

export default router;