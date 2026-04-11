import express from 'express'
import { createOrder, getAllOrders, getMyOrders, updateOrderStatus, verifyPayment, cancelOrder, returnOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post("/", authMiddleware(), createOrder);
router.post("/verify", authMiddleware(), verifyPayment);
router.get("/my", authMiddleware(), getMyOrders);
router.get("/", authMiddleware("admin"), getAllOrders);
router.put("/:id/status", authMiddleware("admin"), updateOrderStatus);
router.post("/cancel", authMiddleware(), cancelOrder);
router.post("/return", authMiddleware(), returnOrder);

export default router;