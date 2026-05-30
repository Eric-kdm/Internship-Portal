import Notification from "../models/notification.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/user.model.js";

export const triggerNotification = async ({
  userId,
  message,
  emailSubject,
  emailText,
  type,
}) => {
  // 1. Save notification in DB
  await Notification.create({
    user: userId,
    message,
    type,
  });

  // 2. Get user email
  const user = await User.findById(userId);

  if (user?.email) {
    await sendEmail(user.email, emailSubject, emailText);
  }
};