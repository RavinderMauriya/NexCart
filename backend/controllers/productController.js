import Product from "../models/productSchema.js";
import Category from "../models/categorySchema.js";
import asyncHandler from "../utils/asyncHandler.js";
import imagekit from "../utils/imagekit.js";

// Get unique brands from all products
export const getBrands = asyncHandler(async (req, res) => {
    const brands = await Product.distinct("brand");
    res.json({
        success: true,
        data: brands.filter(Boolean).sort()
    });
});

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
    // CATEGORY FILTER - includes products from subcategories
    if (category) {
        // Get all child categories of the selected category
        const childCategories = await Category.find({ parent: category }).select("_id").lean();
        const categoryIds = [category, ...childCategories.map(c => c._id.toString())];
        query.category = { $in: categoryIds };
    }
    if (brand) query.brand = brand;

    if (rating && !isNaN(rating)) {
        query.rating = { $gte: Number(rating) };
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
            sortOption.rating = -1;
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
        data: product
    })
})

//get product by product id and variant id (for product details page)
export const getProductVariantById = asyncHandler(async (req, res) => {
    const { productId, variantId } = req.params;
    const product = await Product.findById(productId).populate("category", "name");
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    const variant = product.variants.id(variantId);
    if (!variant) {
        return res.status(404).json({
            success: false,
            message: "Variant not found"
        });
    }
    res.status(200).json({
        success: true,
        data: variant
    });
}
);



//create/add product
export const addProduct = asyncHandler(async (req, res) => {
    // Destructure required data from request body
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

    // Validate at least one variant exists
    if (!variants || variants.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one variant is required"
        });
    }

    // Process each variant and calculate prices
    const processedVariants = [];
    for (let index = 0; index < variants.length; index++) {
        const variant = variants[index];

        // Validate price exists and is greater than 0
        if (!variant.price || Number(variant.price) <= 0) {
            return res.status(400).json({
                success: false,
                message: `Variant ${index + 1}: Price must be a positive number`
            });
        }

        // Validate discount price if provided
        if (variant.discountPrice !== undefined && variant.discountPrice !== null && variant.discountPrice !== '') {
            if (Number(variant.discountPrice) >= Number(variant.price)) {
                return res.status(400).json({
                    success: false,
                    message: `Variant ${index + 1}: Discount price must be less than original price`
                });
            }
        }

        // Auto-generate SKU from product title and variant attributes
        // Example: "iPhone 14" + "256GB" + "Black" = "iPhone14-256GB-Black"
        const baseSku = title.replace(/\s+/g, '').toLowerCase();
        const attributeSku = Object.values(variant.attributes || {})
            .filter(Boolean)
            .map(attr => String(attr).replace(/\s+/g, ''))
            .join('-')
            .toLowerCase();

        const autoGeneratedSku = attributeSku ? `${baseSku}-${attributeSku}` : baseSku;

        processedVariants.push({
            attributes: variant.attributes,
            price: Number(variant.price),
            discountPrice: (variant.discountPrice !== undefined && variant.discountPrice !== null && variant.discountPrice !== '') ? Number(variant.discountPrice) : null,
            stock: variant.stock !== undefined ? Number(variant.stock) : 0,
            sku: autoGeneratedSku,
            // images: variant.images || []
        });
    }

    // Extract all prices from processed variants
    const prices = processedVariants.map(v => v.discountPrice || v.price);

    // Calculate minimum and maximum prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Create product in database
    const product = await Product.create({
        title,
        description,
        brand,
        category,
        attributes,
        variants: processedVariants,
        minPrice,
        maxPrice,
    });

    // Return success response with created product
    res.status(201).json({
        success: true,
        message: "Product created successfully",
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
            if (v.price == null || isNaN(v.price) || Number(v.price) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant must have a valid positive price"
                });
            }

            if (v.discountPrice != null && Number(v.discountPrice) >= Number(v.price)) {
                return res.status(400).json({
                    success: false,
                    message: "Each variant discountPrice must be less than price"
                });
            }
        }

        const baseSku = (title || product.title).replace(/\s+/g, '').toLowerCase();

        const processedVariants = variants.map((variant) => {
            const attributeSku = Object.values(variant.attributes || {})
                .filter(Boolean)
                .map(attr => String(attr).replace(/\s+/g, ''))
                .join('-')
                .toLowerCase();

            const autoGeneratedSku = attributeSku ? `${baseSku}-${attributeSku}` : baseSku;

            return {
                ...variant,
                sku: variant.sku || autoGeneratedSku,
                discountPrice: variant.discountPrice ?? null,
            };
        });

        product.variants = processedVariants;

        const prices = processedVariants.map(v => v.discountPrice || v.price);
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
export const deleteProduct = asyncHandler(async (req, res) => {
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

//upload variant images
export const uploadVariantImages = asyncHandler(async (req, res) => {
    const { productId, variantId } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No images uploaded"
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
        return res.status(404).json({
            success: false,
            message: "Variant not found"
        });
    }

    try {
        const uploadResults = await Promise.all(
            files.map(file =>
                imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                    folder: "NexCart/Products"
                })
            )
        );

        const imageUrls = uploadResults.map(r => r.url);

        // Ensure variant.images is an array
        if (!Array.isArray(variant.images)) {
            variant.images = [];
        }

        // save to DB
        variant.images.push(...imageUrls);
        await product.save();

        res.status(200).json({
            success: true,
            message: "Variant images uploaded and saved successfully",
            images: imageUrls
        });

    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({
            success: false,
            message: "Error uploading variant images",
        });
    }
});
