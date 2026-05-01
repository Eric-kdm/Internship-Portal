import {
  createInternshipService,
  getAllInternshipsService,
  getInternshipByIdService,
  updateInternshipService,
  deleteInternshipService,
} from "../services/internship.service.js";

// CREATE
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

// READ ALL
export const getInternships = async (req, res) => {
  const data = await getAllInternshipsService();
  res.json(data);
};

// READ ONE
export const getInternshipById = async (req, res) => {
  const data = await getInternshipByIdService(req.params.id);
  res.json(data);
};

// UPDATE
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

// DELETE
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