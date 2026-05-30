export const validateInternship = (data) => {
  const {
    title,
    company,
    location,
    description,
  } = data;

  if (!title) throw new Error("Title is required");

  if (!company) throw new Error("Company is required");

  if (!location) throw new Error("Location is required");

  if (!description) {
    throw new Error("Description is required");
  }
};