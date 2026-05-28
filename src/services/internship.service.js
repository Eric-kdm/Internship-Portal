import Internship from "../models/internship.model.js";
import { validateInternship } from "../validations/internship.validation.js";


// ================= CREATE =================
export const createInternshipService = async (data, userId) => {

  // Validate input
  validateInternship(data);

  const internship = await Internship.create({
    ...data,
    createdBy: userId,
  });

  return {
    message: "Internship created successfully",
    internship,
  };
};


// ================= READ ALL =================
export const getAllInternshipsService = async (query = {}) => {

  const {
    search,
    location,
    mode,
    skills,
    page = 1,
    limit = 10
  } = query;

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } }
    ];
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (mode) {
    filter.mode = mode;
  }

  if (skills) {
    filter.skills = { $in: skills.split(",") };
  }

  const skip = (page - 1) * limit;

  const internships = await Internship.find(filter)
    .populate("createdBy", "companyName email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Internship.countDocuments(filter);

  return {
    success: true,
    total,
    page: Number(page),
    limit: Number(limit),
    data: internships
  };
};


// ================= READ ONE =================
export const getInternshipByIdService = async (id) => {

  const internship = await Internship.findById(id).populate(
    "createdBy",
    "companyName email"
  );

  if (!internship) {
    throw new Error("Internship not found");
  }

  return internship;
};


// ================= UPDATE =================
export const updateInternshipService = async (
  id,
  data,
  userId
) => {

  // Validate input
  validateInternship(data);

  const internship = await Internship.findById(id);

  if (!internship) {
    throw new Error("Internship not found");
  }

  // Ownership check
  if (
    internship.createdBy.toString() !==
    userId.toString()
  ) {
    throw new Error(
      "Not authorized to update this internship"
    );
  }

  const updatedInternship =
    await Internship.findByIdAndUpdate(
      id,
      data,
      {
        returnDocument: "after",
      }
    );

  return {
    message: "Internship updated successfully",
    internship: updatedInternship,
  };
};


// ================= DELETE =================
export const deleteInternshipService = async (
  id,
  userId
) => {

  const internship = await Internship.findById(id);

  if (!internship) {
    throw new Error("Internship not found");
  }

  // Ownership check
  if (
    internship.createdBy.toString() !==
    userId.toString()
  ) {
    throw new Error(
      "Not authorized to delete this internship"
    );
  }

  await internship.deleteOne();

  return {
    message: "Internship deleted successfully",
  };
};