// api/category
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getRootCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/", authMiddleware("admin"), addCategory);
router.put("/", authMiddleware("admin"), updateCategory);
router.delete("/:id", authMiddleware("admin"), deleteCategory);
router.get("/root", getRootCategories);

export default router;
