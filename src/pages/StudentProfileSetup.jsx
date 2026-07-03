import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

import {
  FaCamera,
  FaArrowRight,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";

function StudentProfileSetup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const savedProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [profileData, setProfileData] = useState({
    // Step 1 - Personal
    photo: savedProfile.photo || null, // stored as a base64 data URL string, not a File
    fullName: savedProfile.fullName || "",
    dob: savedProfile.dob || "",
    gender: savedProfile.gender || "",
    phone: savedProfile.phone || "",
    location: savedProfile.location || "",

    // Step 2 - Education
    college: savedProfile.college || "",
    degree: savedProfile.degree || "",
    branch: savedProfile.branch || "",
    passingYear: savedProfile.passingYear || "",
    cgpa: savedProfile.cgpa || "",

    // Step 3 - Experience
    skills: savedProfile.skills || "",
    projects: savedProfile.projects || "",
    experience: savedProfile.experience || "",
    linkedin: savedProfile.linkedin || "",
    github: savedProfile.github || "",
    portfolio: savedProfile.portfolio || "",

    // Step 4 - Finish (this one is a real File, only used for the upload
    // call — never saved to localStorage since Files can't be serialized)
    resume: null,
  });

  const handlePhotoChange = (file) => {
    if (!file) return;
    // Convert to a base64 string so it can actually be saved to
    // localStorage and reused across pages (dashboard, public profile,
    // navbar). A raw File object silently disappears on JSON.stringify.
    const reader = new FileReader();
    reader.onload = () => {
      setProfileData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    if (stepError) setStepError("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (!profileData.fullName || !profileData.phone || !profileData.location) {
        setStepError("Please fill in your name, phone, and location before continuing.");
        return false;
      }
    }

    if (step === 2) {
      if (!profileData.college || !profileData.degree) {
        setStepError("Please fill in your college and degree before continuing.");
        return false;
      }
    }

    if (step === 3) {
      if (!profileData.skills) {
        setStepError("Please list at least a few skills before continuing.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStepError("");
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    setStepError("");
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = async () => {
    setStepError("");

    // Never JSON.stringify the resume File — it silently becomes {} and
    // corrupts the rest of the saved profile. Save everything else.
    const { resume, ...profileToSave } = profileData;

    try {
      setSubmitting(true);

      // Real, working call: resume upload is the one piece of this form the
      // backend actually supports right now.
      if (resume) {
        const form = new FormData();
        form.append("resume", resume);

        await api.post("/users/upload-resume", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // NOTE: The backend's User model has no fields yet for education,
      // experience, skills, or social links, and there's no profile-save
      // route. Saving to localStorage here as a stand-in so the flow feels
      // complete — swap this for a real PUT /api/users/profile call once
      // that route exists.
      localStorage.setItem("studentProfile", JSON.stringify(profileToSave));

      navigate("/student-dashboard");
    } catch (error) {
      setStepError(
        error.response?.data?.message ||
          "Something went wrong while saving your resume. Your other details were still saved."
      );
      localStorage.setItem("studentProfile", JSON.stringify(profileToSave));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-blue-700 cursor-pointer"
          >
            InternHub
          </h1>

          <button
            onClick={() => navigate("/student-dashboard")}
            className="text-blue-700 font-semibold hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* PROGRESS STEPPER */}
        <div className="flex justify-between items-center mb-16 relative">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>

          <div
            className="absolute top-5 left-0 h-[2px] bg-blue-600 transition-all duration-500"
            style={{
              width:
                step === 1 ? "0%" : step === 2 ? "33%" : step === 3 ? "66%" : "100%",
            }}
          ></div>

          {["Personal", "Education", "Experience", "Finish"].map((item, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-3 text-sm font-semibold">{item}</span>
            </div>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid md:grid-cols-12 gap-12">
          {/* LEFT PANEL */}
          <div className="md:col-span-4">
            <h2 className="text-6xl font-extrabold leading-tight">
              Tell us
              <br />
              <span className="text-blue-600">who</span>
              <br />
              you are.
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-relaxed">
              Your profile is the first thing recruiters see. Let's make it
              look professional and authentic.
            </p>

            <div className="bg-white p-6 rounded-2xl mt-10 shadow-sm">
              <div className="flex gap-4">
                <FaShieldAlt className="text-blue-600 text-xl mt-1" />
                <p className="text-gray-600">
                  Data is encrypted and shared only with verified partner
                  companies.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="md:col-span-8 bg-white rounded-3xl p-10 shadow-lg">
            {stepError && (
              <div className="mb-8 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-medium border border-red-100">
                {stepError}
              </div>
            )}

            {/* STEP 1 - PERSONAL */}
            {step === 1 && (
              <div>
                <div className="flex items-center gap-8 mb-10">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 overflow-hidden">
                      {profileData.photo ? (
                        <img
                          src={profileData.photo}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaCamera className="text-4xl text-gray-400" />
                      )}
                    </div>

                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoChange(e.target.files[0])}
                      />
                    </label>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl">Profile Photo</h3>
                    <p className="text-gray-500">JPG or PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivers"
                    className={inputClass}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={profileData.dob}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Gender</label>
                    <select
                      name="gender"
                      value={profileData.gender}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select Option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block mb-2 font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
                  >
                    Save & Continue
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 - EDUCATION */}
            {step === 2 && (
              <div>
                <h3 className="text-3xl font-bold mb-8">Education Details</h3>

                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block mb-2 font-semibold">College / University</label>
                    <input
                      type="text"
                      name="college"
                      value={profileData.college}
                      onChange={handleChange}
                      placeholder="e.g. State University"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-semibold">Degree</label>
                      <input
                        type="text"
                        name="degree"
                        value={profileData.degree}
                        onChange={handleChange}
                        placeholder="B.Tech / B.Sc / etc."
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold">Branch</label>
                      <input
                        type="text"
                        name="branch"
                        value={profileData.branch}
                        onChange={handleChange}
                        placeholder="Computer Science"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-semibold">Passing Year</label>
                      <input
                        type="number"
                        name="passingYear"
                        value={profileData.passingYear}
                        onChange={handleChange}
                        placeholder="2028"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-semibold">CGPA</label>
                      <input
                        type="text"
                        name="cgpa"
                        value={profileData.cgpa}
                        onChange={handleChange}
                        placeholder="8.5"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-gray-100"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
                  >
                    Save & Continue
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 - EXPERIENCE & SKILLS */}
            {step === 3 && (
              <div>
                <h3 className="text-3xl font-bold mb-8">Skills & Experience</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 font-semibold">Skills</label>
                    <textarea
                      rows="3"
                      name="skills"
                      value={profileData.skills}
                      onChange={handleChange}
                      placeholder="React, Node.js, MongoDB, Java..."
                      className="w-full p-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Projects</label>
                    <textarea
                      rows="3"
                      name="projects"
                      value={profileData.projects}
                      onChange={handleChange}
                      placeholder="Describe your projects"
                      className="w-full p-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold">Internship Experience</label>
                    <textarea
                      rows="3"
                      name="experience"
                      value={profileData.experience}
                      onChange={handleChange}
                      placeholder="Previous internships or experience"
                      className="w-full p-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="url"
                      name="linkedin"
                      value={profileData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                      className="h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="url"
                      name="github"
                      value={profileData.github}
                      onChange={handleChange}
                      placeholder="GitHub URL"
                      className="h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      type="url"
                      name="portfolio"
                      value={profileData.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio URL"
                      className="h-14 px-5 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-gray-100"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full flex items-center gap-2"
                  >
                    Save & Continue
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 - FINISH */}
            {step === 4 && (
              <div>
                <h3 className="text-3xl font-bold mb-8">Complete Your Profile</h3>

                <p className="text-gray-600 mb-8">
                  Upload your resume and review your information before
                  completing your profile.
                </p>

                {/* Resume Upload */}
                <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center mb-10">
                  <div className="text-5xl mb-4">📄</div>
                  <h4 className="text-xl font-bold mb-2">Upload Resume</h4>
                  <p className="text-gray-500 mb-5">PDF, DOC or DOCX (Max 5MB)</p>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setProfileData({ ...profileData, resume: e.target.files[0] })
                    }
                    className="block mx-auto"
                  />

                  {profileData.resume && (
                    <p className="mt-4 text-green-600 font-semibold">
                      {profileData.resume.name}
                    </p>
                  )}
                </div>

                {/* Review Card */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-10">
                  <h4 className="font-bold text-xl mb-5">Profile Summary</h4>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      {profileData.fullName || "—"}
                    </div>
                    <div>
                      <span className="font-semibold">College:</span>{" "}
                      {profileData.college || "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Degree:</span>{" "}
                      {profileData.degree || "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Branch:</span>{" "}
                      {profileData.branch || "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span>{" "}
                      {profileData.location || "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Skills:</span>{" "}
                      {profileData.skills || "—"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-full border hover:bg-gray-100 transition"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleFinish}
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-semibold flex items-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Saving..." : "Complete Profile"}
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileSetup;
