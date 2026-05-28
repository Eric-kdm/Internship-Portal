import Application from "../models/application.model.js";
import Internship from "../models/internship.model.js";


// ================= APPLY TO INTERNSHIP =================
export const applyToInternship = async (req, res) => {
  try {

    const internshipId = req.params.id;

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    const application = await Application.create({
      student: req.user._id,
      internship: internshipId
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this internship"
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET MY APPLICATIONS (STUDENT) =================
export const getMyApplications = async (req, res) => {
  try {

    const applications = await Application.find({
      student: req.user._id
    })
    .populate("internship", "title company location mode stipend")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET APPLICANTS (EMPLOYER) =================
export const getApplicantsForInternship = async (req, res) => {
  try {

    const internshipId = req.params.id;

    const applications = await Application.find({
      internship: internshipId
    }).populate("student", "firstName lastName email");

    res.status(200).json({
      success: true,
      count: applications.length,
      applicants: applications
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= UPDATE APPLICATION STATUS (ACCEPT / REJECT) =================
export const updateApplicationStatus = async (req, res) => {
  try {

    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const application = await Application.findById(applicationId)
      .populate("internship");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    // ownership check (employer owns internship)
    if (
      application.internship.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: `Application ${status}`
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};