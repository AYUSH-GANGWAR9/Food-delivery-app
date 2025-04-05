import express from "express";
import { registerAdmin, loginAdmin, getAdminProfile, testAdminEndpoint } from "../controllers/adminController.js";
import { protectAdminRoute } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();

// Test route
adminRouter.get("/test", testAdminEndpoint);

// Public routes
adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);

// Protected routes
adminRouter.get("/profile", protectAdminRoute, getAdminProfile);

export default adminRouter; 