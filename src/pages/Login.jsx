import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (e) => {
  e.preventDefault();

  if (!loginData.email || !loginData.password) {
    alert("Please fill all fields");
    return;
  }

  alert(`${accountType} login successful`);

  if (accountType === "student") {
    navigate("/student-profile");
  } else if (accountType === "organization") {
    navigate("/organization-profile-setup");
  } else if (accountType === "admin") {
    navigate("/admin-dashboard");
  }
};

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid lg:grid-cols-12">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex lg:col-span-7 bg-gradient-to-br from-blue-700 to-blue-500 p-16 text-white flex-col justify-between relative">

          <div>
            <h1 className="text-6xl font-extrabold mb-8">
              InternHub.
            </h1>

            <p className="text-2xl text-blue-100 max-w-lg leading-relaxed">
              Bridging the gap between visionary talent and the world's most
              innovative organizations.
            </p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-10 mb-10">

              <div>
                <p className="uppercase text-xs tracking-[4px] text-blue-200 mb-2">
                  Network Status
                </p>

                <h2 className="text-5xl font-bold">12k+</h2>

                <p className="text-blue-100">
                  Active Opportunities
                </p>
              </div>

              <div>
                <p className="uppercase text-xs tracking-[4px] text-blue-200 mb-2">
                  Placement Rate
                </p>

                <h2 className="text-5xl font-bold">94%</h2>

                <p className="text-blue-100">
                  Success Ratio
                </p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4">

              <div className="flex -space-x-3">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>

              <p className="font-medium">
                Join 50,000+ users today
              </p>

            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="lg:col-span-5 bg-white p-8 lg:p-14">

          <h2 className="text-5xl font-bold mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-8">
            Select your account type to continue your journey.
          </p>

          {/* ACCOUNT TYPE */}

          <div className="bg-gray-100 p-1 rounded-full flex mb-8">

            {["student", "organization"].map((type) => (
              <button
                key={type}
                onClick={() => setAccountType(type)}
                className={`flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  accountType === type
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-600"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}

          </div>

          {/* FORM */}

          <form onSubmit={handleLogin} className="space-y-6">

            <div>

              <label className="block font-semibold mb-2">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="alex@university.edu"
                  className="w-full bg-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none"
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <label className="font-semibold">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/otp-verification")}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Forgot?
                </button>

              </div>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-100 rounded-2xl py-4 pl-12 pr-12 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="remember"
                checked={loginData.remember}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label>
                Keep me signed in on this device
              </label>

            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
            >
              Sign In To Portal
            </button>

          </form>

 {/* SOCIAL LOGIN */}

<div className="my-8 flex items-center gap-4">
  <div className="flex-1 h-px bg-gray-300"></div>

  <span className="text-sm text-gray-500">
    OR CONTINUE WITH
  </span>

  <div className="flex-1 h-px bg-gray-300"></div>
</div>

<div className="grid grid-cols-2 gap-4">

  <button
    type="button"
    onClick={() =>
      window.open(
        "https://accounts.google.com",
        "_blank"
      )
    }
    className="border rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
  >
    <FcGoogle className="text-2xl" />
    Google
  </button>

  <button
    type="button"
    onClick={() =>
      window.open(
        "https://www.linkedin.com/login",
        "_blank"
      )
    }
    className="border rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
  >
    <FaLinkedin className="text-blue-700 text-xl" />
    LinkedIn
  </button>

</div>

<p className="text-center mt-8">

  Don't have an account?

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="ml-2 text-blue-700 font-bold hover:underline"
  >
    Create Account
  </button>

</p>

        </div>

      </div>

    </div>
  );


}export default Login;