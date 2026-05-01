import Internship from "../models/internship.model.js";

// CREATE
export const createInternshipService = async (data, userId) => {
  return await Internship.create({
    ...data,
    createdBy: userId,
  });
};

// READ ALL
export const getAllInternshipsService = async () => {
  return await Internship.find().populate("createdBy", "email role");
};

// READ ONE
export const getInternshipByIdService = async (id) => {
  return await Internship.findById(id);
};

// UPDATE (only owner)
export const updateInternshipService = async (id, data, userId) => {
  const internship = await Internship.findById(id);

  if (!internship) throw new Error("Internship not found");

  if (internship.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to update");
  }

  return await Internship.findByIdAndUpdate(id, data, { new: true });
};

// DELETE (only owner)
export const deleteInternshipService = async (id, userId) => {
  const internship = await Internship.findById(id);

  if (!internship) throw new Error("Internship not found");

  if (internship.createdBy.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete");
  }

  await internship.deleteOne();

  return { message: "Internship deleted" };
};