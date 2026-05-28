import express from "express";
import {
  applyToInternship,
  getMyApplications,
  getApplicantsForInternship,
  updateApplicationStatus
} from "../controllers/application.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// ================= APPLY (STUDENT ONLY) =================
router.post(
  "/:id/apply",
  protect,
  authorizeRoles("student"),
  applyToInternship
);


// ================= STUDENT APPLICATIONS =================
router.get(
  "/my",
  protect,
  authorizeRoles("student"),
  getMyApplications
);


// ================= EMPLOYER VIEW APPLICANTS =================
router.get(
  "/internship/:id",
  protect,
  authorizeRoles("employer"),
  getApplicantsForInternship
);


// ================= ACCEPT / REJECT =================
router.patch(
  "/:applicationId/status",
  protect,
  authorizeRoles("employer"),
  updateApplicationStatus
);

export default router;