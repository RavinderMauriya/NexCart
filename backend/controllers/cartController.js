import Cart from '../models/cartModel.js'
import Product from '../models/productSchema.js'
import asyncHandler from '../utils/asyncHandler.js'

//get cart
export const getCart = asyncHandler(async (req, res) => {
    const cartItem = await Cart.find({ user: req.userId }).populate("items.product");
    res.status(200).json({ success: true, data: cartItem })
});

//add item in cart
export const addcart = asyncHandler(async (req, res) => {
    const { productId, variantId, quantity = 1 } = req.body;
    const userId = req.userId;

    if (!productId || !variantId) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const variant = product.variants.id(variantId);
    if (!variant) {
        return res.status(404).json({ success: false, message: "Variant not found" });
    }

    if (variant.stock < quantity) {
        return res.status(400).json({ success: false, message: "Out of stock" });
    }

    let cart = await Cart.findOne({ user: userId });

    // create cart if not exists
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, variantId, quantity }]
        });
    } else {
        // check if item exists in cart
        const existingItem = cart.items.find(
            item => item.product.toString() === productId &&
                item.variantId === variantId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, variantId, quantity });
        }

        await cart.save();
    }

    res.status(201).json({
        success: true,
        message: "Item added to cart"
    });
});

//update cart
export const updateCart = asyncHandler(async (req, res) => {
    const { productId, variantId, quantity } = req.body;
    const userId = req.userId;

    if (!productId || !variantId) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
        i => i.product.toString() === productId && i.variantId === variantId
    );

    if (!item) {
        return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    // remove item if quantity <= 0
    if (quantity <= 0) {
        cart.items = cart.items.filter(
            i => !(i.product.toString() === productId && i.variantId === variantId)
        );
    } else {
        item.quantity = quantity;
    }

    await cart.save();

    res.json({
        success: true,
        message: "Cart updated"
    });
});


//remove/delete item in cart
export const removeCart = asyncHandler(async (req, res) => {
    const { productId, variantId } = req.body;
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
        item => !(item.product.toString() === productId && item.variantId === variantId)
    );

    await cart.save();

    res.json({
        success: true,
        message: "Item removed"
    });
});