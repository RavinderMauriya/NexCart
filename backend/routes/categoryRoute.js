import express from 'express'
import {getCategory, addCategory, updateCategory,deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get("/", getCategory)
router.post("/", addCategory)
router.put("/", updateCategory)
router.delete("/", deleteCategory)

export default router;