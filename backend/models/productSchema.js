import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
    },
    maxPrice: { type: Number, required: true, index: true },
    minPrice: { type: Number, required: true, index: true },
    brand: {
        type: String,
        index: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index: true,
    },
    attributes: [
        {
            name: String,
            values: [String]
        }
    ],
    variants: [
        {
            attributes: Object,
            price: { type: Number, required: true },
            discountPrice: Number,
            stock: { type: Number, default: 0 },
            sku: { type: String, unique: true },
            images: [String]
        }
    ],

    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
}, {
    timestamps: true,
})

productSchema.index({ title: "text" });

export default mongoose.model("Product", productSchema);
