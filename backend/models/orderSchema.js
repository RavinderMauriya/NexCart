import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },

    items: [
        {
            productId: String,
            title: String,
            variant: Object,
            quantity: Number,
            price: Number
        }
    ],

    totalAmount: Number,

    paymentMethod: {
        type: String,
        enum: ["COD", "UPI"]
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "returned"],
        default: "pending"
    },

    address: Object,
    coupon: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);