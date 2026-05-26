import User from "../models/user.model.js";

export const getProfileStatusService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  let completedFields = 0;
  let totalFields = 4;

  // adjust based on role
  if (user.role === "student") {
    if (user.firstName) completedFields++;
    if (user.lastName) completedFields++;
  }

  if (user.role === "employer") {
    if (user.companyName) completedFields++;
    if (user.website) completedFields++;
  }

  if (user.email) completedFields++;
  if (user.password) completedFields++;

  const percentage = Math.floor((completedFields / totalFields) * 100);

  return {
    percentage,
    isComplete: percentage === 100,
  };
};