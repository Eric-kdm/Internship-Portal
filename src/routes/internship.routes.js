import express from "express";

import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} from "../controllers/internship.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// ================= PUBLIC ROUTES =================

// Get all internships
router.get("/", getInternships);

// Get single internship
router.get("/:id", getInternshipById);


// ================= EMPLOYER ROUTES =================

// Create internship
router.post(
  "/",
  protect,
  authorizeRoles("employer"),
  createInternship
);

// Update internship
router.put(
  "/:id",
  protect,
  authorizeRoles("employer"),
  updateInternship
);

// Delete internship
router.delete(
  "/:id",
  protect,
  authorizeRoles("employer"),
  deleteInternship
);


export default router;