// api/products
import express from "express";
import { getProductById, getProducts, addProduct, updateProduct, deleteProduct, uploadVariantImages, getProductVariantById } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.get("/", getProducts);
router.post("/upload", authMiddleware("admin"), upload.array("images", 5), uploadVariantImages);
router.get("/:id", getProductById);
router.get("/:productId/:variantId", getProductVariantById);
router.post("/", authMiddleware("admin"), addProduct);
router.put("/:id", authMiddleware("admin"), updateProduct);
router.delete("/:id", authMiddleware("admin"), deleteProduct);

export default router;