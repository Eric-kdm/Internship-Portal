import Application from "../models/application.model.js";
import Internship from "../models/internship.model.js";

// GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {
    // Get all applications of this student
    const applications = await Application.find({
      student: req.user._id,
    }).populate("internship", "title company location stipend mode");

    const formattedApplications = applications.map((app) => ({
      applicationId: app._id,
      internshipId: app.internship?._id,
      title: app.internship?.title,
      company: app.internship?.company,
      location: app.internship?.location,
      stipend: app.internship?.stipend,
      mode: app.internship?.mode,
      status: app.status,
      appliedAt: app.appliedAt,
    }));

    res.status(200).json({
      success: true,
      count: formattedApplications.length,
      applications: formattedApplications,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};