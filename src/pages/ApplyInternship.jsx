import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import {
  FaMoon,
  FaBell,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

function ApplyInternship() {
  const navigate = useNavigate();
  const { id } = useParams();

  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
  const displayPhoto = profile.photo || "https://i.pravatar.cc/100?img=12";

  const [internship, setInternship] = useState(null);
  const [loadingInternship, setLoadingInternship] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    startDate: "",
    coverLetter: "",
    whyRole: "",
    portfolio: "",
    linkedin: "",
    github: "",
    website: "",
  });

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const res = await api.get(`/internships/${id}`);
        setInternship(res.data);
      } catch (error) {
        setErrorMsg(
          error.response?.data?.message ||
            "Couldn't load this internship's details."
        );
      } finally {
        setLoadingInternship(false);
      }
    };

    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.startDate) errors.startDate = "Please select a start date.";
    if (!formData.coverLetter) errors.coverLetter = "A cover letter is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    try {
      setSubmitting(true);

      // NOTE: The backend's apply endpoint currently only records that a
      // student applied to an internship (student + internship id) — it
      // doesn't yet store cover letters, start date, or portfolio links.
      // The form still collects them for a complete UX and so the fields
      // are ready to send once the backend supports it.
      await api.post(`/applications/${id}/apply`, {});

      navigate("/my-applications", {
        state: { successMessage: "Application submitted successfully!" },
      });
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong while submitting your application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full bg-gray-100 rounded-2xl p-4 outline-none border-2 transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-transparent focus:border-blue-400"
    }`;

  if (loadingInternship) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Internship not found</h2>
          <button
            onClick={() => navigate("/internships")}
            className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          InternHub
        </h1>

        <div className="flex items-center gap-4">
          <button
            disabled
            title="Dark mode coming soon"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <FaMoon />
          </button>
          <button
            onClick={() => navigate("/messages")}
            title="Notifications & Messages"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <FaBell />
          </button>
          <img
            src={displayPhoto}
            alt="Profile"
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
          />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        {/* LEFT SIDEBAR */}
        <aside className="lg:w-1/3">
          <div className="sticky top-28">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase">
              {internship.mode} Internship
            </span>

            <h1 className="text-5xl font-extrabold mt-6 mb-6 leading-tight">
              {internship.title}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              {internship.description}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <FaMapMarkerAlt className="text-blue-700" />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-gray-500">{internship.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <FaMoneyBillWave className="text-blue-700" />
                </div>
                <div>
                  <p className="font-bold">Stipend</p>
                  <p className="text-gray-500">{internship.stipend}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-4 rounded-xl">
                  <FaCalendarAlt className="text-blue-700" />
                </div>
                <div>
                  <p className="font-bold">Duration</p>
                  <p className="text-gray-500">{internship.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* APPLICATION FORM */}
        <section className="lg:w-2/3 bg-white rounded-[32px] p-8 lg:p-12 shadow-sm">
          <h2 className="text-4xl font-bold mb-2">Complete your application</h2>
          <p className="text-gray-500 mb-10">
            Tell us a bit more about your background and interests.
          </p>

          {errorMsg && (
            <div className="mb-8 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* START DATE */}
            <div>
              <label className="block font-semibold mb-3">
                Available Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={inputClass(fieldErrors.startDate)}
              />
              {fieldErrors.startDate && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {fieldErrors.startDate}
                </p>
              )}
            </div>

            {/* COVER LETTER */}
            <div>
              <label className="block font-semibold mb-3">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us about yourself, your skills, and why you're interested in this internship..."
                className={`${inputClass(fieldErrors.coverLetter)} resize-none`}
              />
              {fieldErrors.coverLetter && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {fieldErrors.coverLetter}
                </p>
              )}
            </div>

            {/* WHY THIS ROLE */}
            <div>
              <label className="block font-semibold mb-3">
                Why this role?
                <span className="text-gray-400 text-sm ml-2">(Optional)</span>
              </label>
              <textarea
                name="whyRole"
                value={formData.whyRole}
                onChange={handleChange}
                rows="4"
                placeholder="What excites you most about this opportunity?"
                className={`${inputClass(false)} resize-none`}
              />
            </div>

            {/* PORTFOLIO & SOCIAL LINKS */}
            <div>
              <label className="block font-semibold mb-4">
                Portfolio & Social Links
                <span className="text-gray-400 text-sm ml-2">(Optional)</span>
              </label>

              <div className="space-y-4">
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className={inputClass(false)}
                />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className={inputClass(false)}
                />
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-12 py-4 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-gray-600 font-semibold hover:text-black transition"
                >
                  Cancel
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-6 max-w-md leading-relaxed">
                By submitting this application, you agree to our{" "}
                <span
                  onClick={() => navigate("/terms")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Terms of Service
                </span>{" "}
                and{" "}
                <span
                  onClick={() => navigate("/privacy-policy")}
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ApplyInternship;
