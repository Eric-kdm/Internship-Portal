import { FcGoogle } from "react-icons/fc";
import 
{ useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaGraduationCap,
  FaBuilding,
  FaStar,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("student");

  const [studentData, setStudentData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [orgData, setOrgData] = useState({
    companyName: "",
    workEmail: "",
    website: "",
    password: "",
    confirmPassword: "",
  });

  const handleStudentChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrgChange = (e) => {
    setOrgData({
      ...orgData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();

    if (
      !studentData.email ||
      !studentData.firstName ||
      !studentData.lastName ||
      !studentData.password ||
      !studentData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (studentData.password !== studentData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Student Account Created");
    navigate("/login");
  };

  const handleOrgSubmit = (e) => {
    e.preventDefault();

    if (
      !orgData.companyName ||
      !orgData.workEmail ||
      !orgData.website ||
      !orgData.password ||
      !orgData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (orgData.password !== orgData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Organization Account Created");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm h-16 flex justify-between items-center px-8">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-blue-700 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          InternHub
        </h1>

        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">
            Already have an account?
          </span>

          <button
            onClick={() => navigate("/login")}
            className="font-bold text-blue-700 hover:text-blue-900 transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>
            <main className="flex-grow flex items-center justify-center pt-24 pb-10 px-6">
        <div className="w-full max-w-7xl grid lg:grid-cols-12 gap-12">

          {/* LEFT SECTION */}

          <div className="lg:col-span-5 space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
              Join The Community
            </div>

            <h1 className="text-6xl font-extrabold leading-tight">
              Your career journey
              <span className="text-blue-700"> starts here.</span>
            </h1>

            <p className="text-xl text-gray-600">
              Access exclusive internships at top-tier companies or find the
              next generation of talent for your organization.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaShieldAlt className="text-blue-700" />
                </div>

                <div>
                  <h3 className="font-bold">Verified Listings</h3>
                  <p className="text-gray-600">
                    Every internship is verified for quality.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaRocket className="text-blue-700" />
                </div>

                <div>
                  <h3 className="font-bold">Fast-Track Hiring</h3>
                  <p className="text-gray-600">
                    Direct access to recruiters.
                  </p>
                </div>
              </div>
            </div>
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex text-orange-500 gap-1 mb-4">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="italic text-gray-600 mb-4">
                "InternHub helped me land my dream internship at a top tech firm
                in just two weeks. Highly recommended!"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/50"
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">
                  James Wilson, UI Intern
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}

          <div className="lg:col-span-7 bg-white p-10 rounded-[2rem] shadow-xl">
            <div className="max-w-lg mx-auto">

              <h2 className="text-4xl font-bold mb-2">
                Create Account
              </h2>

              <p className="text-gray-500 mb-8">
                Choose your account type to get started.
              </p>

              {/* ACCOUNT TYPE */}

              <div className="bg-gray-100 p-1 rounded-xl flex mb-8">

                <button
                  onClick={() => setAccountType("student")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    accountType === "student"
                      ? "bg-white text-blue-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  <FaGraduationCap />
                  Student
                </button>

                <button
                  onClick={() => setAccountType("organization")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    accountType === "organization"
                      ? "bg-white text-blue-700 shadow"
                      : "text-gray-600"
                  }`}
                >
                  <FaBuilding />
                  Organization
                </button>
              </div>
                            {accountType === "student" && (
                <form onSubmit={handleStudentSubmit}>

                  <div className="grid grid-cols-2 gap-4 mb-6">

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      <FcGoogle className="text-2xl" />
                      Google
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      <FaPhone className="text-green-600 text-xl" />
                      Phone
                    </button>

                  </div>

                  <div className="text-center text-gray-400 mb-6">
                    OR EMAIL
                  </div>

                  <div className="space-y-4">

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={studentData.email}
                      onChange={handleStudentChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <div className="grid grid-cols-2 gap-4">

                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={studentData.firstName}
                        onChange={handleStudentChange}
                        className="bg-gray-100 rounded-xl px-4 py-4"
                      />

                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={studentData.lastName}
                        onChange={handleStudentChange}
                        className="bg-gray-100 rounded-xl px-4 py-4"
                      />

                    </div>

                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={studentData.password}
                      onChange={handleStudentChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={studentData.confirmPassword}
                      onChange={handleStudentChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-4 bg-blue-700 text-white rounded-full font-bold hover:scale-105 transition-all duration-300"
                  >
                    Create Student Account
                  </button>

                </form>
              )}
                            {accountType === "organization" && (
                <form onSubmit={handleOrgSubmit}>

                  <div className="space-y-4">

                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={orgData.companyName}
                      onChange={handleOrgChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <input
                      type="email"
                      name="workEmail"
                      placeholder="Work Email"
                      value={orgData.workEmail}
                      onChange={handleOrgChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <input
                      type="text"
                      name="website"
                      placeholder="Company Website"
                      value={orgData.website}
                      onChange={handleOrgChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={orgData.password}
                      onChange={handleOrgChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={orgData.confirmPassword}
                      onChange={handleOrgChange}
                      className="w-full bg-gray-100 rounded-xl px-4 py-4"
                    />

                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-4 bg-blue-700 text-white rounded-full font-bold hover:scale-105 transition-all duration-300"
                  >
                    Create Organization Account
                  </button>

                </form>
              )}

              <p className="text-center text-xs text-gray-500 mt-8">
                By creating an account you agree to our
                <span className="text-blue-700 font-semibold cursor-pointer">
                  {" "}Terms of Service{" "}
                </span>
                and
                <span className="text-blue-700 font-semibold cursor-pointer">
                  {" "}Privacy Policy
                </span>
              </p>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;