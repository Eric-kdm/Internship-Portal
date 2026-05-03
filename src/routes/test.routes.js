import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

// 👨‍🎓 Only STUDENT can access
router.get("/student", protect, authorizeRoles("student"), (req, res) => {
  res.json({
    message: "Student access granted",
    user: req.user,
  });
});

// 🏢 Only EMPLOYER can access
router.get("/employer", protect, authorizeRoles("employer"), (req, res) => {
  res.json({
    message: "Employer access granted",
    user: req.user,
  });
});

export default router;