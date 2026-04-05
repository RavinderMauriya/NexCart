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
            stock: { type: String, default: 0 },
            sku: { type: String, unique: true },
            images: [String]
        }
    ],

    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
}, {
    timestamps: true,
})

export default mongoose.model("Product", productSchema);





// price: {
//     type: Number,
//     index: true
// },
// add in root ok this schema for max and min price filter