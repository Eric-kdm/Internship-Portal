import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { FaFileAlt, FaUpload, FaLink } from "react-icons/fa";

function PostResume() {
  const navigate = useNavigate();

  const savedProfile = JSON.parse(localStorage.getItem("studentProfile")) || {};

  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

  const [links, setLinks] = useState({
    portfolio: savedProfile.portfolio || "",
    linkedin: savedProfile.linkedin || "",
    github: savedProfile.github || "",
  });
  const [linksSaved, setLinksSaved] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadMsg("");

    if (!resumeFile) {
      setUploadError("Please choose a file first.");
      return;
    }

    try {
      setUploading(true);
      const form = new FormData();
      form.append("resume", resumeFile);

      await api.post("/users/upload-resume", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadMsg("Resume uploaded successfully.");
      setResumeFile(null);
    } catch (error) {
      setUploadError(
        error.response?.data?.message || "Something went wrong uploading your resume."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleLinkChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
    setLinksSaved(false);
  };

  const handleSaveLinks = (e) => {
    e.preventDefault();
    // NOTE: no backend field for these links yet — stored locally alongside
    // the rest of the profile-setup data as a placeholder.
    const updatedProfile = { ...savedProfile, ...links };
    localStorage.setItem("studentProfile", JSON.stringify(updatedProfile));
    setLinksSaved(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate("/student-dashboard")}
          className="text-blue-700 font-semibold hover:underline"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold mb-3">Resume & Portfolio</h1>
        <p className="text-gray-500 text-lg mb-10">
          Keep your resume and links up to date so organizations always see
          your best work.
        </p>

        {/* RESUME UPLOAD */}
        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FaFileAlt className="text-blue-700 text-xl" />
            <h2 className="text-2xl font-bold">Resume</h2>
          </div>

          {uploadError && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
              {uploadError}
            </div>
          )}

          {uploadMsg && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-100">
              {uploadMsg}
            </div>
          )}

          <form onSubmit={handleUpload}>
            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-10 text-center mb-6">
              <FaUpload className="text-4xl text-blue-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-5">PDF, DOC or DOCX (Max 5MB)</p>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="block mx-auto"
              />

              {resumeFile && (
                <p className="mt-4 text-blue-700 font-semibold">{resumeFile.name}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>

        {/* PORTFOLIO LINKS */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FaLink className="text-blue-700 text-xl" />
            <h2 className="text-2xl font-bold">Portfolio & Social Links</h2>
          </div>

          {linksSaved && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-100">
              Links saved.
            </div>
          )}

          <form onSubmit={handleSaveLinks} className="space-y-4">
            <input
              type="url"
              name="portfolio"
              placeholder="Portfolio URL"
              value={links.portfolio}
              onChange={handleLinkChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              value={links.linkedin}
              onChange={handleLinkChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub URL"
              value={links.github}
              onChange={handleLinkChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />

            <button
              type="submit"
              className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Save Links
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PostResume;
