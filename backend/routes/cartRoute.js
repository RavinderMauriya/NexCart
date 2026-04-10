import express from 'express'
import { addcart, getCart, removeCart, updateCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware(), getCart);
router.post("/add", authMiddleware(), addcart);
router.put("/update", authMiddleware(), updateCart);
router.delete("/", authMiddleware(), removeCart);

export default router;