import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import asynHandler from "../utils/asyncHandler.js";

export const getAdminStats = asynHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders
      }
    });
});
