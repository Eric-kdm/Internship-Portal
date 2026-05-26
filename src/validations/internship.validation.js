export const validateInternship = (data) => {
  const { title, company, location, description } = data;

  if (!title || !company || !location || !description) {
    throw new Error("All required fields must be provided");
  }

  if (title.length < 3) {
    throw new Error("Title must be at least 3 characters");
  }

  if (description.length < 10) {
    throw new Error("Description too short");
  }
};