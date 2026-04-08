import express from 'express'
import { addcart, getCart, removeCart, updateCart } from '../controllers/cartController';

const router = express.Router();

router.get("/", getCart);
router.post("/add", addcart);
router.put("/update", updateCart);
router.delete("/", removeCart);

export default router;