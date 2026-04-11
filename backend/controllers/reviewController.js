import Review from '../models/reviewSchema.js';
import asyncHandler from "../utils/asyncHandler.js"

export const postReview = asyncHandler(async (req, res) => {
    const review = new Review({
        user: req.userId,
        product: req.body.product,
        rating: req.body.rating,
    })
    await review.save();
    res.status(201).json(review);
})

export const getReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    res.status(200).json(reviews);
})

export const deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
});