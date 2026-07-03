import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPalette,
  FaUser,
  FaBell,
  FaLock,
  FaCheck,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";

const TABS = [
  { id: "appearance", label: "Appearance", icon: FaPalette },
  { id: "account", label: "Account", icon: FaUser },
  { id: "notifications", label: "Notifications", icon: FaBell },
  { id: "privacy", label: "Privacy & Security", icon: FaLock },
];

const ACCENT_COLORS = [
  { id: "blue", className: "bg-blue-600" },
  { id: "purple", className: "bg-purple-600" },
  { id: "emerald", className: "bg-emerald-600" },
  { id: "rose", className: "bg-rose-600" },
  { id: "amber", className: "bg-amber-500" },
  { id: "slate", className: "bg-slate-800" },
];

const TOOL_LINKS = [
  { label: "Post Resume", path: "/post-resume" },
  { label: "Public Profile Preview", path: "/public-profile" },
  { label: "Self Assessment", path: "/self-assessment" },
  { label: "My Tasks", path: "/task-management" },
  { label: "Attendance & Leave", path: "/attendance-leave" },
  { label: "Performance Evaluation", path: "/performance-evaluation" },
  { label: "Certificate", path: "/certificate" },
  { label: "Messages", path: "/messages" },
];

function Settings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [activeTab, setActiveTab] = useState("appearance");

  // Load the last-saved values once, then track edits in "draft" state.
  // Nothing touches localStorage until the person clicks Save Preferences.
  const savedTheme = localStorage.getItem("themePref") || "light";
  const savedAccent = localStorage.getItem("accentPref") || "blue";
  const savedNotifications =
    JSON.parse(localStorage.getItem("notificationPrefs")) || {
      applicationUpdates: true,
      newInternships: true,
      marketing: false,
    };

  const [theme, setTheme] = useState(savedTheme);
  const [accent, setAccent] = useState(savedAccent);
  const [notifications, setNotifications] = useState(savedNotifications);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const isDirty =
    theme !== savedTheme ||
    accent !== savedAccent ||
    JSON.stringify(notifications) !== JSON.stringify(savedNotifications);

  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setSaveConfirmed(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("themePref", theme);
    localStorage.setItem("accentPref", accent);
    localStorage.setItem("notificationPrefs", JSON.stringify(notifications));
    setSaveConfirmed(true);
  };

  const handleDiscardChanges = () => {
    setTheme(savedTheme);
    setAccent(savedAccent);
    setNotifications(savedNotifications);
    setSaveConfirmed(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    setPasswordError("");
    setPasswordMsg("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwords.next.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    // NOTE: There's no /api/auth/change-password endpoint on the backend
    // yet, so this can't actually update your real password.
    setPasswordMsg("Demo mode — password change isn't connected to the backend yet.");
    setPasswords({ current: "", next: "", confirm: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold mb-2">Settings</h1>
          <p className="text-gray-500 text-lg">
            Manage your account preferences and customize your portal
            experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* TAB NAV */}
          <nav className="lg:col-span-3 flex lg:flex-col gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-blue-700 text-white shadow-sm"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  <Icon />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* TAB CONTENT */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            {/* APPEARANCE */}
            {activeTab === "appearance" && (
              <>
                <section className="bg-white p-8 rounded-3xl shadow-sm">
                  <h3 className="text-lg font-bold mb-1">Visual Theme</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Select how you want the portal to appear on your device.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { id: "light", label: "Light Mode" },
                      { id: "dark", label: "Dark Mode" },
                      { id: "system", label: "System" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setTheme(option.id);
                          setSaveConfirmed(false);
                        }}
                        className={`relative p-1 rounded-xl transition-all ${
                          theme === option.id ? "ring-2 ring-blue-600" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`aspect-video rounded-lg border overflow-hidden flex flex-col ${
                            option.id === "dark"
                              ? "bg-slate-900 border-slate-800"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <div className={option.id === "dark" ? "h-2 bg-slate-800" : "h-2 bg-gray-100"} />
                          <div className="flex flex-1">
                            <div className={`w-1/4 h-full ${option.id === "dark" ? "bg-slate-800" : "bg-gray-100"}`} />
                            <div className="flex-1 p-2 space-y-2">
                              <div className={`h-2 w-1/2 rounded ${option.id === "dark" ? "bg-slate-700" : "bg-gray-200"}`} />
                              <div className={`h-2 w-full rounded ${option.id === "dark" ? "bg-slate-800" : "bg-gray-100"}`} />
                            </div>
                          </div>
                        </div>
                        <span className="block mt-2 text-sm font-medium text-center">
                          {option.label}
                        </span>
                        {theme === option.id && (
                          <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                            <FaCheck className="text-xs" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {theme !== "light" && (
                    <p className="mt-5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 inline-block">
                      Full dark theme support is coming soon — this saves as your preference for now
                    </p>
                  )}
                </section>

                <section className="bg-white p-8 rounded-3xl shadow-sm">
                  <h3 className="text-lg font-bold mb-1">Accent Color</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Personalize your UI with a signature brand color.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {ACCENT_COLORS.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => {
                          setAccent(color.id);
                          setSaveConfirmed(false);
                        }}
                        title={color.id}
                        className={`w-10 h-10 rounded-full ${color.className} flex items-center justify-center text-white transition-transform hover:scale-110 ${
                          accent === color.id ? "ring-4 ring-blue-100" : ""
                        }`}
                      >
                        {accent === color.id && <FaCheck className="text-sm" />}
                      </button>
                    ))}
                  </div>

                  <p className="mt-5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 inline-block">
                    Applying custom accent colors app-wide is coming soon — this saves as your preference for now
                  </p>
                </section>
              </>
            )}

            {/* ACCOUNT */}
            {activeTab === "account" && (
              <>
                <section className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Account</h2>

                  <div className="flex justify-between items-center py-4 border-b">
                    <div>
                      <p className="font-semibold">Name</p>
                      <p className="text-gray-500">
                        {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "—"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b">
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-500">{user.email || "—"}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/student-profile")}
                    className="flex justify-between items-center w-full py-4 text-left hover:bg-gray-50 rounded-xl px-2 transition"
                  >
                    <div>
                      <p className="font-semibold">Edit Profile</p>
                      <p className="text-gray-500">
                        Update your education, skills, and resume
                      </p>
                    </div>
                    <FaChevronRight className="text-gray-400" />
                  </button>
                </section>

                <section className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Internship Tools</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {TOOL_LINKS.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="flex justify-between items-center px-5 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-left"
                      >
                        <span className="font-semibold">{item.label}</span>
                        <FaChevronRight className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <section className="bg-white rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Notifications</h2>

                {[
                  { key: "applicationUpdates", label: "Application status updates" },
                  { key: "newInternships", label: "New matching internships" },
                  { key: "marketing", label: "Product news & tips" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex justify-between items-center py-4 border-b last:border-b-0"
                  >
                    <p className="font-semibold">{item.label}</p>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`w-14 h-8 rounded-full transition relative ${
                        notifications[item.key] ? "bg-blue-700" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${
                          notifications[item.key] ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </section>
            )}

            {/* PRIVACY & SECURITY */}
            {activeTab === "privacy" && (
              <>
                <section className="bg-white rounded-3xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Password</h2>

                  {passwordError && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                      {passwordError}
                    </div>
                  )}

                  {passwordMsg && (
                    <div className="mb-5 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100">
                      {passwordMsg}
                    </div>
                  )}

                  <form onSubmit={handlePasswordSubmit} className="space-y-4" noValidate>
                    <input
                      type="password"
                      name="current"
                      placeholder="Current Password"
                      value={passwords.current}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                    />
                    <input
                      type="password"
                      name="next"
                      placeholder="New Password"
                      value={passwords.next}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                    />
                    <input
                      type="password"
                      name="confirm"
                      placeholder="Confirm New Password"
                      value={passwords.confirm}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                    />

                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
                    >
                      Update Password
                    </button>
                  </form>
                </section>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-sm text-red-500 font-semibold hover:bg-red-50 transition w-fit"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </>
            )}

            {/* SAVE / DISCARD — only relevant for Appearance & Notifications,
                which don't have their own submit buttons like Account/Privacy do */}
            {(activeTab === "appearance" || activeTab === "notifications") && (
              <div className="sticky bottom-6 flex items-center justify-end gap-4 bg-white rounded-2xl shadow-lg px-6 py-4 border">
                {saveConfirmed && (
                  <span className="text-green-600 text-sm font-semibold mr-auto">
                    ✓ Preferences saved
                  </span>
                )}
                <button
                  onClick={handleDiscardChanges}
                  disabled={!isDirty}
                  className="px-6 py-2.5 rounded-full text-blue-700 font-semibold hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Discard Changes
                </button>
                <button
                  onClick={handleSavePreferences}
                  disabled={!isDirty}
                  className="px-8 py-2.5 rounded-full bg-blue-700 text-white font-bold hover:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
