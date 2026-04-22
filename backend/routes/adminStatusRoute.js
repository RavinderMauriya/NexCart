import express from "express";
import { getAdminStats } from "../controllers/statusController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware("admin"), getAdminStats);

export default router;