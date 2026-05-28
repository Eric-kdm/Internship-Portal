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
  try {
    const data = await getAllInternshipsService(req.query);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
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


