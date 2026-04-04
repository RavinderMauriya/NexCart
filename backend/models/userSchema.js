import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    address: [{
        fullName: { type: String },
        phone: { type: String },
        pincode: { type: String },
        city: { type: String },
        state: { type: String },
        addressLine: { type: String },
        isDefault: { type: Boolean, default: false }
    }]
}, {
    timestamps: true,
})

export default mongoose.model("User", userSchema);