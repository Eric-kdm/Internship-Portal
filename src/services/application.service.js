import Application from "../models/application.model.js";

// APPLY
export const applyService = async (studentId, internshipId) => {
  const application = await Application.create({
    student: studentId,
    internship: internshipId
  });

  return application;
};


// GET MY APPLICATIONS
export const getMyApplicationsService = async (studentId) => {
  return await Application.find({ student: studentId })
    .populate("internship")
    .sort({ createdAt: -1 });
};


// GET APPLICANTS FOR INTERN
export const getApplicantsService = async (internshipId) => {
  return await Application.find({ internship: internshipId })
    .populate("student");
};


// UPDATE STATUS
export const updateStatusService = async (applicationId, status) => {
  return await Application.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true }
  );
};