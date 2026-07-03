import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaQuestionCircle,
  FaBell,
  FaMoon,
  FaSearch,
  FaBookmark,
} from "react-icons/fa";

const DOMAIN_SKILLS = {
  "Web Development": "javascript,react,node",
  "UI/UX Design": "figma,ui,ux",
  "Data Science": "python,data,sql",
  "Digital Marketing": "marketing,seo,analytics",
};

function InternshipListings() {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};
  const displayPhoto = profile.photo || "https://i.pravatar.cc/100?img=12";

  const [internships, setInternships] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [savedInternships, setSavedInternships] = useState(
    JSON.parse(localStorage.getItem("savedInternships")) || []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [stipendFilter, setStipendFilter] = useState("All"); // All | Paid | Unpaid
  const [workMode, setWorkMode] = useState("All"); // All | Remote | Onsite | Hybrid
  const [duration, setDuration] = useState("Any Duration");
  const [page, setPage] = useState(1);
  const limit = 6;

  const fetchInternships = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const params = { page, limit };
      if (searchTerm) params.search = searchTerm;
      if (workMode !== "All") params.mode = workMode;
      if (selectedDomains.length > 0) {
        params.skills = selectedDomains
          .map((d) => DOMAIN_SKILLS[d])
          .join(",");
      }

      const res = await api.get("/internships", { params });

      setInternships(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Couldn't load internships. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInternships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, workMode, selectedDomains]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInternships();
  };

  const toggleDomain = (domain) => {
    setPage(1);
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDomains([]);
    setStipendFilter("All");
    setWorkMode("All");
    setDuration("Any Duration");
    setPage(1);
  };

  const toggleSave = (id) => {
    let updated;
    if (savedInternships.includes(id)) {
      updated = savedInternships.filter((item) => item !== id);
    } else {
      updated = [...savedInternships, id];
    }
    setSavedInternships(updated);
    localStorage.setItem("savedInternships", JSON.stringify(updated));
  };

  // Stipend and duration aren't structured/filterable fields on the backend
  // (stipend is free text, duration has no numeric range), so these two
  // filters are applied client-side against what's already been fetched.
  const filteredInternships = internships.filter((internship) => {
    const stipendOk =
      stipendFilter === "All" ||
      (stipendFilter === "Paid" && internship.stipend !== "Not disclosed") ||
      (stipendFilter === "Unpaid" && internship.stipend === "Not disclosed");

    const durationOk =
      duration === "Any Duration" ||
      internship.duration?.toLowerCase().includes(duration.toLowerCase());

    return stipendOk && durationOk;
  });

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#f2f4f6] min-h-screen p-6 flex flex-col">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">InternHub</h2>
          <p className="text-gray-500 text-sm">Internship Portal</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition"
          >
            <FaHome />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-sm">
            <FaFileAlt />
            Internships
          </button>

          <button
            onClick={() => navigate("/my-applications")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition"
          >
            <FaFileAlt />
            My Applications
          </button>

          <button
            onClick={() => navigate("/saved-internships")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition"
          >
            <FaBookmark />
            Saved Internships
          </button>
        </nav>

        <div className="mt-auto space-y-2">
          <button
            onClick={() => navigate("/help-center")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition"
          >
            <FaQuestionCircle />
            Help Center
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition"
          >
            <FaCog />
            Settings
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-white transition"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold">Internship Listings</h1>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white rounded-full w-80 outline-none shadow-sm"
              />
            </form>

            <button
              onClick={() => navigate("/messages")}
              title="Notifications & Messages"
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaBell />
            </button>
            <button
              disabled
              title="Dark mode coming soon"
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center opacity-50 cursor-not-allowed"
            >
              <FaMoon />
            </button>
            <img
              onClick={() => navigate("/settings")}
              src={displayPhoto}
              alt="profile"
              className="w-12 h-12 rounded-full cursor-pointer object-cover"
            />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3">Discover Opportunities</h2>
          <p className="text-blue-700 font-semibold mt-2">
            {loading ? "Loading..." : `${total} internships found`}
          </p>
          <p className="text-gray-500 text-lg max-w-3xl">
            Browse available internships from top companies and find the
            perfect opportunity to start your career.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-8 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-medium border border-red-100">
            {errorMsg}
          </div>
        )}

        {/* FILTERS + LISTINGS CONTAINER */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* FILTER PANEL */}
          <div className="bg-white rounded-3xl p-6 shadow-sm h-fit">
            <h3 className="text-2xl font-bold mb-6">Filters</h3>

            {/* Domain */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Domain</h4>
              <div className="space-y-3">
                {Object.keys(DOMAIN_SKILLS).map((domain) => (
                  <label key={domain} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedDomains.includes(domain)}
                      onChange={() => toggleDomain(domain)}
                    />
                    {domain}
                  </label>
                ))}
              </div>
            </div>

            {/* Stipend */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Stipend</h4>
              <div className="flex flex-wrap gap-2">
                {["All", "Paid", "Unpaid"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setStipendFilter(option)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      stipendFilter === option
                        ? "bg-blue-700 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Work Mode</h4>
              <div className="space-y-3">
                {["All", "Remote", "Onsite", "Hybrid"].map((mode) => (
                  <label key={mode} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="mode"
                      checked={workMode === mode}
                      onChange={() => {
                        setWorkMode(mode);
                        setPage(1);
                      }}
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-700 mb-3">Duration</h4>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded-xl p-3 outline-none"
              >
                <option>Any Duration</option>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="w-full border-2 border-blue-700 text-blue-700 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              Reset Filters
            </button>
          </div>

          {/* INTERNSHIP CARDS */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white rounded-3xl p-16 text-center text-gray-500 shadow-sm">
                Loading internships...
              </div>
            ) : filteredInternships.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                <h3 className="text-2xl font-bold mb-2">No internships found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredInternships.map((internship) => (
                  <div
                    key={internship._id}
                    className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex gap-5">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                          🏢
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-blue-700 text-xs font-bold uppercase">
                              {internship.mode}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {new Date(internship.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold mb-1">
                            {internship.title}
                          </h3>

                          <p className="text-gray-500">
                            {internship.company} • {internship.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSave(internship._id)}
                          className={`w-12 h-12 rounded-full transition flex items-center justify-center ${
                            savedInternships.includes(internship._id)
                              ? "bg-blue-700 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          title="Save internship"
                        >
                          <FaBookmark />
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigate(`/internshipsdetails/${internship._id}`)
                            }
                            className="px-5 py-2 border border-gray-300 rounded-full font-semibold hover:bg-gray-100 transition"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/apply-internship/${internship._id}`)
                            }
                            className="px-6 py-2 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                        {internship.duration}
                      </span>
                      <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">
                        {internship.stipend}
                      </span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {internship.mode}
                      </span>
                      {internship.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gray-50 border rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-full border hover:bg-blue-700 hover:text-white transition disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-full font-bold ${
                      page === p
                        ? "bg-blue-700 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-full border hover:bg-blue-700 hover:text-white transition disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-black"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-16 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 InternHub. All rights reserved.</p>
            <div className="flex gap-6">
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
      </main>
    </div>
  );
}

export default InternshipListings;
