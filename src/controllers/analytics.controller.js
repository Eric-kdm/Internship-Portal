import Internship from "../models/internship.model.js";

export const getEmployerAnalytics = async (req, res) => {
  try {
    const internships = await Internship.find({
      createdBy: req.user._id
    });

    let totalInternships = internships.length;
    let totalApplications = 0;
    let accepted = 0;
    let rejected = 0;
    let pending = 0;

    internships.forEach((internship) => {
      const applications = internship.applications || [];

      totalApplications += applications.length;

      applications.forEach((app) => {
        if (app.status === "accepted") accepted++;
        else if (app.status === "rejected") rejected++;
        else pending++;
      });
    });

    res.status(200).json({
      success: true,
      data: {
        totalInternships,
        totalApplications,
        accepted,
        rejected,
        pending
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};