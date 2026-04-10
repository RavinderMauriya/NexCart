import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { addressId, paymentMethod, items } = req.body;

    if (!addressId || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // USER + ADDRESS
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
        return res.status(404).json({ success: false, message: "Address not found" });
    }

    // GET ITEMS
    let finalItems = [];

    if (items && items.length > 0) {
        finalItems = items; // BUY NOW
    } else {
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart empty" });
        }
        finalItems = cart.items;
    }

    let totalAmount = 0;
    const orderItems = [];

    // VALIDATE + BUILD SNAPSHOT
    for (const item of finalItems) {
        const product = await Product.findById(item.product || item.productId);
        if (!product) throw new Error("Product not found");

        const variant = product.variants.id(item.variantId);
        if (!variant) throw new Error("Variant not found");

        if (variant.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `${product.title} out of stock`,
            });
        }

        const price = variant.discountPrice || variant.price;

        orderItems.push({
            productId: product._id.toString(),
            title: product.title,
            variant,
            quantity: item.quantity,
            price,
        });

        totalAmount += price * item.quantity;
    }

    // CREATE ORDER (DB FIRST)
    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        paymentMethod,
        paymentStatus: "pending",
        address,
    });

    // COD FLOW
    if (paymentMethod === "COD") {
        // OPTIONAL: reduce stock + clear cart here

        return res.status(201).json({
            success: true,
            data: {
                type: "COD",
                orderId: order._id,
                amount: totalAmount,
            },
        });
    }

    // ONLINE FLOW → RAZORPAY
    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // paise
        currency: "INR",
        receipt: order._id.toString(),
    });

    return res.status(201).json({
        success: true,
        data: {
            type: "ONLINE",
            orderId: order._id,
            razorpayOrder,
            amount: totalAmount,
        },
    });
});

//VERIFY PAYMENT
import crypto from "crypto";
import Order from "../models/orderModel.js";

export const verifyPayment = asyncHandler(async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId, // DB ORDER ID (must come from frontend)
    } = req.body;

    if (!orderId) {
        return res.status(400).json({ success: false, message: "OrderId missing" });
    }

    // VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // FIND ORDER
    const order = await Order.findById(orderId);
    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    // IDEMPOTENCY CHECK
    if (order.paymentStatus === "paid") {
        return res.status(200).json({
            success: true,
            message: "Already verified",
            data: order,
        });
    }

    // UPDATE ORDER STATUS
    order.paymentStatus = "paid";
    order.status = "confirmed";

    // REDUCE STOCK
    for (const item of order.items) {
        const product = await Product.findById(item.productId);

        const variant = product.variants.id(item.variant._id);

        if (!variant || variant.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `${item.title} out of stock`,
            });
        }

        variant.stock -= item.quantity;
        await product.save();
    }

    await order.save();

    // CLEAR CART
    await Cart.findOneAndDelete({ user: order.user });

    return res.status(200).json({
        success: true,
        message: "Payment verified",
        data: order,
    });
});


//GET MY ORDERS
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: orders,
    });
});

//GET ALL ORDERS admin
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name email");

    res.status(200).json({
        success: true,
        data: orders,
    });
});

//UPDATE ORDER STATUS admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
        success: true,
        data: order,
    });
});


//CANCEL ORDER 
export const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findOne({
        _id: orderId,
        user: req.user.id,
    });

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = "cancelled";

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order cancelled",
    });
});

//RETURN ORDER (only delivered product)
export const returnOrder = asyncHandler(async (req, res) => {
    const { orderId, reason } = req.body;

    if (!orderId) {
        return res.status(400).json({
            success: false,
            message: "Order ID is required"
        });
    }

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    // user should own this order
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "Not authorized"
        });
    }

    // 🔴 BUSINESS RULE: only delivered orders can be returned
    if (order.status !== "delivered") {
        return res.status(400).json({
            success: false,
            message: "Only delivered orders can be returned"
        });
    }

    // update status
    order.status = "returned";

    order.returnReason = reason;

    await order.save();

    res.status(200).json({
        success: true,
        message: "Order returned successfully",
        data: order
    });
});