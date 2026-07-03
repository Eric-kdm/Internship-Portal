import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { FaBookmark } from "react-icons/fa";

function SavedInternships() {
  const navigate = useNavigate();

  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchSaved = async () => {
    const savedIds = JSON.parse(localStorage.getItem("savedInternships")) || [];

    if (savedIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // There's no "get by list of ids" endpoint, so we fetch a page of
      // internships and filter client-side against the saved ids.
      const res = await api.get("/internships", { params: { limit: 100 } });
      const matched = res.data.data.filter((item) => savedIds.includes(item._id));
      setSavedData(matched);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Couldn't load your saved internships."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSaved();
  }, []);

  const unsave = (id) => {
    const savedIds = JSON.parse(localStorage.getItem("savedInternships")) || [];
    const updated = savedIds.filter((item) => item !== id);
    localStorage.setItem("savedInternships", JSON.stringify(updated));
    setSavedData((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Saved Internships</h1>

          <button
            onClick={() => navigate("/internships")}
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition"
          >
            Browse More
          </button>
        </div>

        {errorMsg && (
          <div className="mb-8 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-medium border border-red-100">
            {errorMsg}
          </div>
        )}

        <div className="space-y-6">
          {loading ? (
            <div className="bg-white p-16 rounded-3xl shadow-sm text-center text-gray-500">
              Loading saved internships...
            </div>
          ) : savedData.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <h2 className="text-3xl font-bold mb-4">No Saved Internships</h2>
              <p className="text-gray-500 mb-6">
                Save internships from the listings page to view them here.
              </p>
              <button
                onClick={() => navigate("/internships")}
                className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
              >
                Browse Internships
              </button>
            </div>
          ) : (
            savedData.map((internship) => (
              <div
                key={internship._id}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {internship.title}
                    </h2>
                    <p className="text-gray-500 mb-3">
                      {internship.company} • {internship.location}
                    </p>
                    <p className="text-blue-700 font-semibold mb-5">
                      {internship.stipend}
                    </p>
                  </div>

                  <button
                    onClick={() => unsave(internship._id)}
                    className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition h-fit"
                    title="Remove from saved"
                  >
                    <FaBookmark />
                  </button>
                </div>

                <div className="flex gap-3">
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
                    className="px-5 py-2 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedInternships;
