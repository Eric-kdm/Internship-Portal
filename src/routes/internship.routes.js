import express from "express";

import {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  getMyInternships,
  applyToInternship,
  getApplicantsForInternship,
  updateApplicationStatus,
} from "../controllers/internship.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// ================= PUBLIC ROUTES =================

//Get My Inernships
router.get(
 "/my",
 protect,
 authorizeRoles("employer"),
 getMyInternships
);

// Get all internships
router.get("/", getInternships);

// Get applicants for an internship
router.get(
  "/:id/applicants",
  protect,
  authorizeRoles("employer"),
  getApplicantsForInternship
);

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

//Apply to internship
router.post(
  "/apply/:id",
  protect,
  authorizeRoles("student"),
  applyToInternship
);

// Update application status
router.patch(
  "/:internshipId/applications/:applicationId",
  protect,
  authorizeRoles("employer"),
  updateApplicationStatus
);


export default router;