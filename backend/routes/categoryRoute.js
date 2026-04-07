import express from 'express'
import Category from '../models/categorySchema.js'
import {getCategory, addCategory, updateCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get("/", getCategory)
router.post("/", addCategory)
router.put("/", updateCategory)

export default router;