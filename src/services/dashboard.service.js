import Internship from "../models/internship.model.js";
import User from "../models/user.model.js";

export const getDashboardDataService = async (userId, role) => {
  if (role === "student") {
    const internships = await Internship.find().limit(5);

    return {
      message: "Student Dashboard",
      internships,
    };
  }

  if (role === "employer") {
    const myInternships = await Internship.find({
      createdBy: userId,
    });

    return {
      message: "Employer Dashboard",
      totalInternships: myInternships.length,
      internships: myInternships,
    };
  }

  throw new Error("Invalid role");
};