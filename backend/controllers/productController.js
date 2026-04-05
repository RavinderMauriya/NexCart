import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getProducts = asyncHandler(async (req, res) => {
    let {
        page = 1,
        limit = 10,
        search,
        category,
        minPrice,
        maxPrice,
        brand,
        rating,
        sort
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    // TEXT SEARCH (text index)
    if (search) {
        query.$text = { $search: search };
    }

    // BASIC FILTERS
    if (category) query.category = category;
    if (brand) query.brand = brand;

    if (rating && !isNaN(rating)) {
        query.ratings = { $gte: Number(rating) };
    }

    // PRICE RANGE FILTER
    if (minPrice || maxPrice) {
        query.$and = [];

        if (minPrice && !isNaN(minPrice)) {
            query.$and.push({ maxPrice: { $gte: Number(minPrice) } });
        }

        if (maxPrice && !isNaN(maxPrice)) {
            query.$and.push({ minPrice: { $lte: Number(maxPrice) } });
        }
    }

    // SORTING
    let sortOption = {};

    switch (sort) {
        case "price_asc":
            sortOption.minPrice = 1;
            break;
        case "price_desc":
            sortOption.minPrice = -1;
            break;
        case "newest":
            sortOption.createdAt = -1;
            break;
        case "rating":
            sortOption.ratings = -1;
            break;
        default:
            sortOption.createdAt = -1;
    }

    const products = await Product.find(query)
        .populate("category", "name")
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(); //for js object and faster fetch

    const total = await Product.countDocuments(query);

    res.json({
        success: true,
        data: {
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        }
    });
});

//get product by id
export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
})

//create/add product
export const addProduct = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        brand,
        category,
        attributes,
        variants,
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !variants?.length) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    // Validate variants have required fields
    if (!variants || variants.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one variant required"
        });
    }

    if (variants && variants.length > 0) {
        for (const variant of variants) {
            if (!variant.price) {
                res.status(400);
                throw new Error("Each variant must have a price");
            }
        }
    }

    //Calculate root prices
    const prices = variants.map(v => v.discountPrice || v.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);


    const product = await Product.create({
        title,
        description,
        brand,
        category,
        attributes,
        variants,
        maxPrice,
        minPrice,
    });

    res.status(201).json({
        success: true,
        message: "product created successfully",
        data: product,
    });
});

//update product
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        brand,
        category,
        attributes,
        variants
    } = req.body;

    //find product
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    //update basic fields(only if provided)
    if (title) product.title = title;
    if (description) product.description = description;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (attributes) product.attributes = attributes;

    // if variants updated → recalc prices
    if (variants && variants.length > 0) {

        // validate variants
        for (const v of variants) {
            if (!v.price) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant must have price"
                });
            }
        }

        product.variants = variants;

        const prices = variants.map(v => v.discountPrice || v.price);

        product.minPrice = Math.min(...prices);
        product.maxPrice = Math.max(...prices);
    }

    await product.save();

    res.status(200).json({
        success: true,
        data: product
    });
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});