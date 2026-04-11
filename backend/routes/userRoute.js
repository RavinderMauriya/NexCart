import multer from 'multer';
import express from 'express';
import { myProfile, updateProfile, getAllUsers, uploadAvatar } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get('/me', authMiddleware(), myProfile);
router.put('/update', authMiddleware(), updateProfile);
router.get('/all', authMiddleware('admin'), getAllUsers);
router.post("/upload-avatar", authMiddleware(), upload.single("avatar"), uploadAvatar)

export default router;