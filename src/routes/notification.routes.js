import express from "express";

import {
  getMyNotifications,
  markNotificationRead,
} from "../controllers/notification.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// GET MY NOTIFICATIONS
router.get(
  "/my",
  protect,
  getMyNotifications
);


// MARK AS READ
router.patch(
  "/:id/read",
  protect,
  markNotificationRead
);

export default router;