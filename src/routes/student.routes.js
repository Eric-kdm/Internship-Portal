import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  getMyApplications
} from "../controllers/student.controller.js";

const router = express.Router();

// Student dashboard
router.get(
  "/applications",
  protect,
  authorizeRoles("student"),
  getMyApplications
);

export default router;