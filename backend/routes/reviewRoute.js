import express from 'express';
import { postReview, getReviews, deleteReview } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware(), postReview);
router.get('/:productId', getReviews);
router.delete('/:reviewId', authMiddleware(), deleteReview);

export default router;