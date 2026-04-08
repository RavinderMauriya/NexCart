import mongoose from 'mongoose';
import Category from '../models/categorySchema.js'
import asyncHandler from '../utils/asyncHandler.js';

export const addCategory = asyncHandler(async (req, res) => {
    const { name, parent } = req.body;

    // Basic validation
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Category name is required"
        });
    }

    const normalizedName = name.trim().toLowerCase();

    // Check duplicate
    const existing = await Category.findOne({ name: normalizedName });
    if (existing) {
        return res.status(400).json({
            success: false,
            message: "Category already exists"
        });
    }

    // Validate parent (if provided)
    let parentCategory = null;

    if (parent) {
        if (!mongoose.Types.ObjectId.isValid(parent)) {
            return res.status(400).json({
                success: false,
                message: "Invalid parent category ID"
            });
        }

        parentCategory = await Category.findById(parent);

        if (!parentCategory) {
            return res.status(404).json({
                success: false,
                message: "Parent category not found"
            });
        }
    }

    const category = await Category.create({
        name: normalizedName,
        parent: parentCategory ? parentCategory._id : null
    });

    res.status(201).json({
        success: true,
        data: category
    });

});

// Electronics (parent: null)
// Laptop (parent: Electronics)
// Gaming Laptop (parent: Laptop)

//update category
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exist = await Category.findById(id);
    if (!exist) {
        return res.status(404).json({ success: false, message: "not exist category" })
    }
    const updated = await Category.findByIdAndUpdate(id, req.body);
    res.status(200).json({ success: true, message: "category update successful", data: updated })
})

//get Category
export const getCategory = asyncHandler(async (req, res) => {
    const categoryData = await Category.find().populate("parent", "name");;
    res.status(200).json({ success: true, message: "fetch successfully", data: categoryData })
});

//delete category
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Category.findById(id);
    res.status(200).json({ success: true, message: "category deleted" })
})