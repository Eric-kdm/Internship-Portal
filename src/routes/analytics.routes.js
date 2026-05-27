import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getEmployerAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

// Employer analytics dashboard
router.get(
  "/employer",
  protect,
  authorizeRoles("employer"),
  getEmployerAnalytics
);

export default router;