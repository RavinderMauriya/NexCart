import multer from 'multer';
import express from 'express';
import { getUser, updateUser, uploadAvatar } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const upload = multer({storage: multer.memoryStorage()});

const router = express.Router();

router.get('/me', authMiddleware(), getUser);
router.put('/update', authMiddleware(), updateUser);
router.get('/all', authMiddleware('admin'), getAllUsers);
router.post("/upload-avatar", authMiddleware(), upload.single("avatar"), uploadAvatar)

export default router;