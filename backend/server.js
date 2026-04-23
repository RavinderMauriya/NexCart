import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import productRouter from './routes/productRoute.js'
import productCategory from './routes/categoryRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import reviewRoute from './routes/reviewRoute.js'
import userRoute from './routes/userRoute.js'
import adminStatusRoute from './routes/adminStatusRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { limiter, authLimiter } from './middleware/rateLimit.js';

dotenv.config();

//start app
const app = express();

app.set("trust proxy", 1); // for proxy + rateLimit

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use("/api", limiter);

//routes start
app.get("/", (req, res) => {
    res.json({ success: true, message: "API running" })
})
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/products", productRouter);
app.use("/api/category", productCategory);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/user/profile", userRoute);
app.use("/api/admin/status", adminStatusRoute);


//catch err
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});


//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("Database Connected Successfully") })
    .catch((err) => { console.log("DB Connection Error:", err.message) })

app.listen(process.env.PORT, () => {
    console.log(`server Running on port ${process.env.PORT}`)
})