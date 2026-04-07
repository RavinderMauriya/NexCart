import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productRoute.js'
import productCategory from './routes/categoryRoute.js'
import authMiddleware from './middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

//start app
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true
}));
// console log mdw
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

//routes start
app.get("/", (req, res) => {
    res.json({ success: true, message: "API running" })
})
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/category", authMiddleware("admin"), productCategory);

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