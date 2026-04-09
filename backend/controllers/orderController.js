import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import crypto from "crypto";
import Razorpay from "razorpay";

// CREATE ORDER
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { addressId, paymentMethod } = req.body;

    if (!addressId || !paymentMethod) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // 1. USER + ADDRESS
    const user = await User.findById(userId);
    const address = user.addresses.id(addressId);

    if (!address) {
        return res.status(404).json({ success: false, message: "Address not found" });
    }

    // 2. CART
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ success: false, message: "Cart empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 3. LOOP ITEMS (STRICT VALIDATION)
    for (const item of cart.items) {
        const product = await Product.findById(item.product);

        if (!product) throw new Error("Product not found");

        const variant = product.variants.id(item.variantId);

        if (!variant) throw new Error("Variant not found");

        // STOCK CHECK
        if (variant.stock < item.quantity) {
            return res.status(400).json({
                success: false,
                message: `${product.title} out of stock`,
            });
        }

        const price = variant.discountPrice || variant.price;

        totalAmount += price * item.quantity;

        // PUSH SNAPSHOT
        orderItems.push({
            productId: product._id,
            title: product.title,
            variant: variant.attributes,
            quantity: item.quantity,
            price,
        });

        // REDUCE STOCK
        variant.stock -= item.quantity;
        await product.save();
    }

    // 4. CREATE ORDER
    const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount,
        paymentMethod,
        address,
    });

    // 5. CLEAR CART
    await Cart.findOneAndDelete({ user: userId });

    // 6. COD FLOW
    if (paymentMethod === "COD") {
        return res.status(201).json({
            success: true,
            data: order,
        });
    }

    // 7. RAZORPAY ORDER
    const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: order._id.toString(),
    });

    // SAVE RAZORPAY ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(201).json({
        success: true,
        data: {
            order,
            razorpayOrder,
        },
    });
});


//VERIFY PAYMENT
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // update order
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.status = "confirmed";

    await order.save();

    res.status(200).json({
        success: true,
        message: "Payment verified",
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
