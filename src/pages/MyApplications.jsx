import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaEye, FaTrash } from "react-icons/fa";

function MyApplications() {
  const navigate = useNavigate();
  const location = useLocation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage] = useState(location.state?.successMessage || "");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/applications/my");
      setApplications(res.data.applications);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Failed to load your applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications();
    if (location.state?.successMessage) {
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-2">My Applications</h1>
            <p className="text-gray-500">
              Track and manage all your internship applications.
            </p>
          </div>

          <button
            onClick={() => navigate("/internships")}
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
          >
            Browse Internships
          </button>
        </div>

        {successMessage && (
          <div className="mb-8 px-5 py-4 rounded-2xl bg-green-50 text-green-700 font-medium border border-green-100">
            {successMessage}
          </div>
        )}

        {errorMsg && (
          <div className="mb-8 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-medium border border-red-100">
            {errorMsg}
          </div>
        )}

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500 mb-2">Total Applications</h3>
            <p className="text-4xl font-bold">{applications.length}</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500 mb-2">Under Review</h3>
            <p className="text-4xl font-bold">
              {applications.filter((app) => app.status === "pending").length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-500 mb-2">Accepted</h3>
            <p className="text-4xl font-bold">
              {applications.filter((app) => app.status === "accepted").length}
            </p>
          </div>
        </div>

        {/* APPLICATION LIST */}
        {loading ? (
          <div className="bg-white rounded-3xl p-16 text-center text-gray-500 shadow-sm">
            Loading your applications...
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
            <h2 className="text-3xl font-bold mb-4">No applications yet</h2>
            <p className="text-gray-500 mb-6">
              Browse internships and apply to start tracking them here.
            </p>
            <button
              onClick={() => navigate("/internships")}
              className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
            >
              Browse Internships
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <FaBriefcase className="text-blue-700" />
                      <h2 className="text-2xl font-bold">
                        {app.internship?.title || "Internship no longer available"}
                      </h2>
                    </div>

                    <p className="text-gray-500 mb-3">
                      {app.internship?.company}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendarAlt />
                      <span>
                        Applied on {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>

                    <div className="flex gap-3">
                      {app.internship?._id && (
                        <button
                          onClick={() =>
                            navigate(`/internshipsdetails/${app.internship._id}`)
                          }
                          className="flex items-center gap-2 px-5 py-2 border rounded-full hover:bg-gray-100 transition"
                        >
                          <FaEye />
                          View
                        </button>
                      )}

                      <button
                        disabled
                        title="Withdrawing applications isn't available yet"
                        className="flex items-center gap-2 px-5 py-2 border border-gray-200 text-gray-400 rounded-full cursor-not-allowed"
                      >
                        <FaTrash />
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
