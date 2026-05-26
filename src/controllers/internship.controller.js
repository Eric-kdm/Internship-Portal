import {
  createInternshipService,
  getAllInternshipsService,
  getInternshipByIdService,
  updateInternshipService,
  deleteInternshipService,
} from "../services/internship.service.js";

import Internship from "../models/internship.model.js";


// ================= CREATE =================
export const createInternship = async (req, res) => {
  try {
    const internship = await createInternshipService(
      req.body,
      req.user._id
    );

    res.status(201).json(internship);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ================= GET ALL =================
export const getInternships = async (req, res) => {
  const data = await getAllInternshipsService();
  res.json(data);
};


// ================= GET ONE =================
export const getInternshipById = async (req, res) => {
  const data = await getInternshipByIdService(req.params.id);
  res.json(data);
};


// ================= UPDATE =================
export const updateInternship = async (req, res) => {
  try {
    const data = await updateInternshipService(
      req.params.id,
      req.body,
      req.user._id
    );

    res.json(data);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ================= DELETE =================
export const deleteInternship = async (req, res) => {
  try {
    const data = await deleteInternshipService(
      req.params.id,
      req.user._id
    );

    res.json(data);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ================= MY INTERNSHIPS =================
export const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      createdBy: req.user._id
    });

    res.status(200).json({
      success: true,
      count: internships.length,
      internships
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= APPLY TO INTERNSHIP =================
export const applyToInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    // ensure array exists
    if (!internship.applications) {
      internship.applications = [];
    }

    // prevent duplicate applications
    const alreadyApplied = internship.applications.find(
      (a) => a?.student?.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already applied"
      });
    }

    internship.applications.push({
      student: req.user._id
    });

    await internship.save();

    res.status(200).json({
      success: true,
      message: "Application submitted"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// ================= GET APPLICANTS (EMPLOYER ONLY) =================
export const getApplicantsForInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate({
        path: "applications.student",
        select: "firstName lastName email"
      });

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    // ownership check
    if (internship.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view applicants"
      });
    }

    res.status(200).json({
      success: true,
      count: internship.applications?.length || 0,
      applicants: internship.applications || []
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//=========================Update Application Status (Accept/Reject)=========================
export const updateApplicationStatus = async (req, res) => {
  try {
    const { internshipId, applicationId } = req.params;
    const { status } = req.body;

    // validate status
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found"
      });
    }

    // ownership check
    if (internship.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    // find application
    const application = internship.applications.id(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    application.status = status;

    await internship.save();

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