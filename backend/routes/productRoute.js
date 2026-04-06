import express from "express";
import { getProductById, getProducts, addProduct, updateProduct, deleteProduct, addCategory} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware("admin"), addProduct);
router.put("/:id", authMiddleware("admin"), updateProduct);
router.delete("/:id", authMiddleware("admin"), deleteProduct);
router.post("/category",addCategory)

export default router;