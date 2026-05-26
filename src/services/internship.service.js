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
export const getAllInternshipsService = async () => {

  const internships = await Internship.find()
    .populate(
      "createdBy",
      "companyName email"
    )
    .sort({ createdAt: -1 });

  return internships;
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