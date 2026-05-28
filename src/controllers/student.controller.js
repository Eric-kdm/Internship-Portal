import Internship from "../models/internship.model.js";

// GET MY APPLICATIONS
export const getMyApplications = async (req, res) => {
  try {

    const internships = await Internship.find({
      "applications.student": req.user._id
    }).select(
      "title company location stipend mode applications"
    );

    const appliedInternships = internships.map((internship) => {

      const myApplication = internship.applications.find(
        (app) =>
          app.student.toString() === req.user._id.toString()
      );

      return {
        internshipId: internship._id,
        title: internship.title,
        company: internship.company,
        location: internship.location,
        stipend: internship.stipend,
        mode: internship.mode,
        status: myApplication.status,
        appliedAt: myApplication.appliedAt
      };

    });

    res.status(200).json({
      success: true,
      count: appliedInternships.length,
      applications: appliedInternships
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};