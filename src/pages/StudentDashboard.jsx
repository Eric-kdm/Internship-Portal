import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import {
  FaBell,
  FaMoon,
  FaFileAlt,
  FaBookmark,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

  // Prefer the name/photo filled in during Student Profile Setup; fall
  // back to what was captured at registration if the profile isn't done yet.
  const displayName =
    profile.fullName ||
    (user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Student");
  const firstNameOnly = profile.fullName
    ? profile.fullName.split(" ")[0]
    : user.firstName || "";
  const displaySubtitle =
    profile.degree
      ? `${profile.degree}${profile.branch ? `, ${profile.branch}` : ""}`
      : "Undergraduate Candidate";
  const displayPhoto = profile.photo || "https://i.pravatar.cc/100?img=12";

  const [recommended, setRecommended] = useState([]);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [savedCount] = useState(
    () => (JSON.parse(localStorage.getItem("savedInternships")) || []).length
  );
  const [availableCount, setAvailableCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [todos, setTodos] = useState([
    { id: 1, text: "Complete your profile", done: false },
    { id: 2, text: "Browse internship listings", done: false },
    { id: 3, text: "Apply to your first internship", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [dashboardRes, applicationsRes, totalRes] = await Promise.all([
        api.get("/dashboard"),
        api.get("/applications/my"),
        api.get("/internships", { params: { limit: 1 } }),
      ]);

      setRecommended(dashboardRes.data.internships || []);
      setApplicationsCount(applicationsRes.data.count || 0);
      setAvailableCount(totalRes.data.total || 0);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo.trim(), done: false },
    ]);
    setNewTodo("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1
              onClick={() => navigate("/")}
              className="text-3xl font-extrabold text-blue-700 cursor-pointer"
            >
              InternHub
            </h1>
          </div>

          <div className="mx-4 bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
            <img
              src={displayPhoto}
              alt="student"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold">{displayName}</h3>
              <p className="text-sm text-gray-500">{displaySubtitle}</p>
            </div>
          </div>

          <div className="mt-6 px-3 space-y-2">
            <button className="w-full flex items-center gap-3 bg-blue-50 text-blue-700 font-semibold px-4 py-3 rounded-xl">
              📊 Dashboard
            </button>

            <button
              onClick={() => navigate("/my-applications")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <FaFileAlt />
              My Applications
            </button>

            <button
              onClick={() => navigate("/saved-internships")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <FaBookmark />
              Saved Internships
            </button>

            <button
              onClick={() => navigate("/post-resume")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              📄 Post Resume
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <FaCog />
              Settings
            </button>
          </div>

          <div className="p-4">
            <button
              onClick={() => navigate("/internships")}
              className="w-full bg-blue-700 text-white py-3 rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Browse Internships
            </button>
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => navigate("/help-center")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaQuestionCircle />
            Help Center
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-5xl font-extrabold mb-3">
              Welcome back{firstNameOnly ? `, ${firstNameOnly}` : ""}.
            </h1>
            <p className="text-xl text-gray-500">
              Here's what's happening with your applications.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/messages")}
              title="Notifications & Messages"
              className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
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
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div
            onClick={() => navigate("/my-applications")}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                📤
              </div>
            </div>
            <p className="text-gray-500 mb-1">Applications Sent</p>
            <h2 className="text-5xl font-extrabold">
              {loading ? "—" : applicationsCount}
            </h2>
          </div>

          <div
            onClick={() => navigate("/saved-internships")}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                🔖
              </div>
            </div>
            <p className="text-gray-500 mb-1">Saved Internships</p>
            <h2 className="text-5xl font-extrabold">{savedCount}</h2>
          </div>

          <div
            onClick={() => navigate("/internships")}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">
                💼
              </div>
            </div>
            <p className="text-gray-500 mb-1">Internships Available</p>
            <h2 className="text-5xl font-extrabold">
              {loading ? "—" : availableCount}
            </h2>
          </div>
        </div>

        {/* DASHBOARD GRID */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Recommended For You</h2>
              <button
                onClick={() => navigate("/internships")}
                className="text-blue-600 font-semibold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-5">
              {loading ? (
                <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow-sm">
                  Loading recommendations...
                </div>
              ) : recommended.length === 0 ? (
                <div className="bg-white rounded-3xl p-10 text-center text-gray-500 shadow-sm">
                  No internships available right now — check back soon.
                </div>
              ) : (
                recommended.map((internship) => (
                  <div
                    key={internship._id}
                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex gap-5">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          🏢
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {internship.title}
                          </h3>
                          <p className="text-gray-500 mb-3">
                            {internship.company} • {internship.location} (
                            {internship.mode})
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {internship.skills?.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <h3 className="text-2xl font-bold mb-3">
                          {internship.stipend}
                        </h3>
                        <button
                          onClick={() =>
                            navigate(`/apply-internship/${internship._id}`)
                          }
                          className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              {/* TO DO LIST — interactive, client-side (no backend endpoint for tasks yet) */}
              <div className="bg-white rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">✅ To-do List</h3>

                <div className="space-y-4">
                  {todos.map((todo) => (
                    <div key={todo.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodo(todo.id)}
                        className="mt-1 w-5 h-5"
                      />
                      <p
                        className={`font-semibold ${
                          todo.done ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {todo.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTodo()}
                    placeholder="Add a task..."
                    className="flex-1 bg-gray-100 rounded-xl px-4 py-2 outline-none text-sm"
                  />
                  <button
                    onClick={addTodo}
                    className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* PROFILE COMPLETION NUDGE */}
              <div className="bg-blue-700 text-white rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-4">
                  ✨ Complete Your Profile
                </h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  A complete profile helps organizations discover you faster.
                  Add your education, skills, and resume.
                </p>
                <button
                  onClick={() => navigate("/student-profile")}
                  className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
