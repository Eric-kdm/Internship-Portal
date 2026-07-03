import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBell,
  FaMoon,
  FaMapMarkerAlt,
  FaBuilding,
  FaBookmark,
} from "react-icons/fa";

function InternshipDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
  const displayPhoto = profile.photo || "https://i.pravatar.cc/100?img=12";

  const [internship, setInternship] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [saved, setSaved] = useState(
    (JSON.parse(localStorage.getItem("savedInternships")) || []).includes(id)
  );

  const fetchInternship = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      // getInternshipById on the backend returns the internship object
      // directly (not wrapped in { data: ... }) — different shape than
      // the listings endpoint, so no res.data.data here.
      const res = await api.get(`/internships/${id}`);
      setInternship(res.data);

      // Fetch a few similar roles for the sidebar (same endpoint, small page).
      const similarRes = await api.get("/internships", {
        params: { limit: 4 },
      });
      setSimilar(
        similarRes.data.data.filter((item) => item._id !== id).slice(0, 3)
      );
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message ||
          "This internship couldn't be found. It may have been removed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInternship();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleSave = () => {
    const savedList = JSON.parse(localStorage.getItem("savedInternships")) || [];
    let updated;

    if (savedList.includes(id)) {
      updated = savedList.filter((item) => item !== id);
      setSaved(false);
    } else {
      updated = [...savedList, id];
      setSaved(true);
    }

    localStorage.setItem("savedInternships", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading internship...</p>
      </div>
    );
  }

  if (errorMsg || !internship) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Internship not found</h2>
          <p className="text-gray-500 mb-6">{errorMsg}</p>
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
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* TOP NAVBAR */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold cursor-pointer"
        >
          InternHub
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/messages")}
            title="Notifications & Messages"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <FaBell />
          </button>
          <button
            disabled
            title="Dark mode coming soon"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center opacity-50 cursor-not-allowed"
          >
            <FaMoon />
          </button>
          <img
            onClick={() => navigate("/settings")}
            src={displayPhoto}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer object-cover"
          />
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-8 py-10 grid lg:grid-cols-12 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-8">
          <div className="flex gap-3 mb-5">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs font-bold uppercase">
              {internship.mode}
            </span>
            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-bold uppercase">
              {internship.duration}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            {internship.title}
          </h1>

          <p className="text-2xl text-gray-500 mb-8">{internship.company}</p>

          <div className="flex flex-wrap gap-8 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-blue-700" />
              <span>{internship.company}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-700" />
              <span>{internship.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-blue-700">💰</span>
              <span>{internship.stipend}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <button
              onClick={() => navigate(`/apply-internship/${internship._id}`)}
              className="px-10 py-4 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition"
            >
              Apply Now
            </button>

            <button
              onClick={toggleSave}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition ${
                saved
                  ? "bg-blue-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              title={saved ? "Remove from saved" : "Save internship"}
            >
              <FaBookmark />
            </button>
          </div>

          {/* ABOUT ROLE */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-10">
            <h2 className="text-4xl font-bold mb-8">About the Role</h2>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          {/* REQUIRED SKILLS */}
          {internship.skills && internship.skills.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-bold tracking-[3px] uppercase text-gray-500 mb-6">
                Required Skills
              </h3>

              <div className="flex flex-wrap gap-4">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-6 py-3 bg-white rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4">
          {/* COMPANY CARD */}
          <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center text-white text-2xl">
                🏢
              </div>

              <div>
                <h3 className="text-2xl font-bold">{internship.company}</h3>
                <p className="text-gray-500">
                  {internship.createdBy?.email || "Verified Organization"}
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Posted by {internship.createdBy?.companyName || internship.company}.
              Applications are reviewed directly by the organization's hiring
              team.
            </p>
          </div>

          {/* SIMILAR ROLES */}
          {similar.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Similar Roles</h3>
                <button
                  onClick={() => navigate("/internships")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {similar.map((role) => (
                  <div
                    key={role._id}
                    onClick={() => navigate(`/internshipsdetails/${role._id}`)}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg">{role.title}</h4>
                        <p className="text-gray-500 text-sm">
                          {role.company} • {role.mode}
                        </p>
                      </div>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 InternHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-blue-600"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/terms")}
              className="hover:text-blue-600"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InternshipDetails;
