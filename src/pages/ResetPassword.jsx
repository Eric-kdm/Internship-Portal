import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle, FaUndoAlt } from "react-icons/fa";

function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const hasLength = formData.password.length >= 8;
  const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password);
  const hasNumber = /\d/.test(formData.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hasLength || !hasUpperLower || !hasNumber || !hasSpecial) {
      setError("Password does not meet all requirements below.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // NOTE: There's no /api/auth/reset-password endpoint on the backend yet,
    // so this can't actually update a real password. UI/validation flow is
    // complete and ready to wire up once that route exists.
    navigate("/login", {
      state: { successMessage: "Password updated. Please log in." },
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      <header className="flex justify-between items-center px-10 py-6 border-b bg-white">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>

        <div className="hidden md:flex gap-8 text-gray-600">
          <button onClick={() => navigate("/help-center")} className="hover:text-blue-600 transition">Help Center</button>
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-blue-600 transition"
          >
            Privacy Policy
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-[32px] shadow-lg p-10 md:p-14">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUndoAlt className="text-blue-600 text-3xl" />
            </div>
          </div>

          <h2 className="text-5xl font-bold text-center mb-4">Reset Password</h2>
          <p className="text-center text-gray-500 mb-4">
            Create a secure new password for your InternHub account.
          </p>

          <div className="text-center mb-8">
            <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
              Demo mode — not yet connected to the backend
            </span>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <label className="block font-semibold mb-2">New Password</label>

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-gray-100 rounded-2xl py-4 px-5 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8 text-sm">
              <div className="flex items-center gap-2">
                <FaCheckCircle
                  className={hasLength ? "text-blue-600" : "text-gray-300"}
                />
                <span>8+ characters</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle
                  className={hasUpperLower ? "text-blue-600" : "text-gray-300"}
                />
                <span>Upper & Lowercase</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle
                  className={hasNumber ? "text-blue-600" : "text-gray-300"}
                />
                <span>One Number</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle
                  className={hasSpecial ? "text-blue-600" : "text-gray-300"}
                />
                <span>Special Character</span>
              </div>
            </div>

            <label className="block font-semibold mb-2">Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full bg-gray-100 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500 mb-8"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 hover:scale-[1.02] transition-all"
            >
              Submit New Password
            </button>
          </form>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Back to Login
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-sm text-gray-500">
          <p>© 2026 InternHub. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <button onClick={() => navigate("/privacy-policy")}>
              Privacy Policy
            </button>
            <button onClick={() => navigate("/terms")}>Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ResetPassword;
