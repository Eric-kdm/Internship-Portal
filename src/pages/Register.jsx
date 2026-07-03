import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaGraduationCap,
  FaBuilding,
  FaStar,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [socialMsg, setSocialMsg] = useState("");
  const [serverError, setServerError] = useState(""); // errors that don't belong to a specific field

  const [studentData, setStudentData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [studentErrors, setStudentErrors] = useState({});

  const [orgData, setOrgData] = useState({
    companyName: "",
    workEmail: "",
    website: "",
    password: "",
    confirmPassword: "",
  });
  const [orgErrors, setOrgErrors] = useState({});

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
    if (studentErrors[name]) {
      setStudentErrors({ ...studentErrors, [name]: "" });
    }
  };

  const handleOrgChange = (e) => {
    const { name, value } = e.target;
    setOrgData({ ...orgData, [name]: value });
    if (orgErrors[name]) {
      setOrgErrors({ ...orgErrors, [name]: "" });
    }
  };

  const validateStudent = () => {
    const errors = {};

    if (!studentData.email) errors.email = "Email is required.";
    if (!studentData.firstName) errors.firstName = "First name is required.";
    if (!studentData.lastName) errors.lastName = "Last name is required.";

    if (!studentData.password) {
      errors.password = "Password is required.";
    } else if (studentData.password.length < 6) {
      errors.password = "Must be at least 6 characters.";
    }

    if (!studentData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (
      studentData.password &&
      studentData.password !== studentData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOrg = () => {
    const errors = {};

    if (!orgData.companyName) errors.companyName = "Company name is required.";
    if (!orgData.workEmail) errors.workEmail = "Work email is required.";
    if (!orgData.website) errors.website = "Company website is required.";

    if (!orgData.password) {
      errors.password = "Password is required.";
    } else if (orgData.password.length < 6) {
      errors.password = "Must be at least 6 characters.";
    }

    if (!orgData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (
      orgData.password &&
      orgData.password !== orgData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setOrgErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateStudent()) return;

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/register", {
        role: "student",
        email: studentData.email,
        password: studentData.password,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
      });

      navigate("/welcome", {
        state: { message: res.data.message || "Your student account has been created successfully." },
      });
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOrgSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateOrg()) return;

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/register", {
        role: "employer",
        email: orgData.workEmail,
        password: orgData.password,
        companyName: orgData.companyName,
        website: orgData.website,
      });

      navigate("/welcome", {
        state: { message: res.data.message || "Your organization account has been created successfully." },
      });
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Shared input classes — red ring/border when that field has an error
  const inputClass = (hasError) =>
    `w-full bg-gray-100 rounded-xl px-4 py-4 outline-none border-2 transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-transparent focus:border-blue-400"
    }`;

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
          <span className="text-gray-500 text-sm">Already have an account?</span>

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
                  <p className="text-gray-600">Every internship is verified for quality.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaRocket className="text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold">Fast-Track Hiring</h3>
                  <p className="text-gray-600">Direct access to recruiters.</p>
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
                <span className="font-semibold">James Wilson, UI Intern</span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-7 bg-white p-10 rounded-[2rem] shadow-xl">
            <div className="max-w-lg mx-auto">
              <h2 className="text-4xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-500 mb-8">Choose your account type to get started.</p>

              {/* ACCOUNT TYPE */}
              <div className="bg-gray-100 p-1 rounded-xl flex mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setAccountType("student");
                    setServerError("");
                  }}
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
                  type="button"
                  onClick={() => {
                    setAccountType("organization");
                    setServerError("");
                  }}
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

              {/* Server-side errors (e.g. "User already exists") still show as a banner
                  since they don't belong to one specific field */}
              {serverError && (
                <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                  {serverError}
                </div>
              )}

              {accountType === "student" && (
                <form onSubmit={handleStudentSubmit} noValidate>
                  {socialMsg && (
                    <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 text-amber-700 text-sm font-medium border border-amber-100 text-center">
                      {socialMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() =>
                        setSocialMsg("Google sign-up isn't connected yet — please use email for now.")
                      }
                      className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition"
                    >
                      <FcGoogle className="text-2xl" />
                      Google
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSocialMsg("LinkedIn sign-up isn't connected yet — please use email for now.")
                      }
                      className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl hover:bg-gray-200 transition"
                    >
                      <FaLinkedin className="text-blue-700 text-xl" />
                      LinkedIn
                    </button>
                  </div>

                  <div className="text-center text-gray-400 mb-6">OR EMAIL</div>

                  <div className="space-y-4">
                    <div>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        value={studentData.email}
                        onChange={handleStudentChange}
                        className={inputClass(studentErrors.email)}
                      />
                      {studentErrors.email && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{studentErrors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          autoComplete="given-name"
                          placeholder="First Name"
                          value={studentData.firstName}
                          onChange={handleStudentChange}
                          className={inputClass(studentErrors.firstName)}
                        />
                        {studentErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1 ml-1">{studentErrors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          name="lastName"
                          autoComplete="family-name"
                          placeholder="Last Name"
                          value={studentData.lastName}
                          onChange={handleStudentChange}
                          className={inputClass(studentErrors.lastName)}
                        />
                        {studentErrors.lastName && (
                          <p className="text-red-500 text-sm mt-1 ml-1">{studentErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Password (min. 6 characters)"
                        value={studentData.password}
                        onChange={handleStudentChange}
                        className={inputClass(studentErrors.password)}
                      />
                      {studentErrors.password && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{studentErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        value={studentData.confirmPassword}
                        onChange={handleStudentChange}
                        className={inputClass(studentErrors.confirmPassword)}
                      />
                      {studentErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{studentErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-4 bg-blue-700 text-white rounded-full font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "Creating Account..." : "Create Student Account"}
                  </button>
                </form>
              )}

              {accountType === "organization" && (
                <form onSubmit={handleOrgSubmit} noValidate>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        name="companyName"
                        autoComplete="organization"
                        placeholder="Company Name"
                        value={orgData.companyName}
                        onChange={handleOrgChange}
                        className={inputClass(orgErrors.companyName)}
                      />
                      {orgErrors.companyName && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{orgErrors.companyName}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        name="workEmail"
                        autoComplete="email"
                        placeholder="Work Email"
                        value={orgData.workEmail}
                        onChange={handleOrgChange}
                        className={inputClass(orgErrors.workEmail)}
                      />
                      {orgErrors.workEmail && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{orgErrors.workEmail}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="website"
                        autoComplete="url"
                        placeholder="Company Website"
                        value={orgData.website}
                        onChange={handleOrgChange}
                        className={inputClass(orgErrors.website)}
                      />
                      {orgErrors.website && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{orgErrors.website}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        placeholder="Password (min. 6 characters)"
                        value={orgData.password}
                        onChange={handleOrgChange}
                        className={inputClass(orgErrors.password)}
                      />
                      {orgErrors.password && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{orgErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        value={orgData.confirmPassword}
                        onChange={handleOrgChange}
                        className={inputClass(orgErrors.confirmPassword)}
                      />
                      {orgErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1 ml-1">{orgErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-4 bg-blue-700 text-white rounded-full font-bold hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? "Creating Account..." : "Create Organization Account"}
                  </button>
                </form>
              )}

              <p className="text-center text-xs text-gray-500 mt-8">
                By creating an account you agree to our
                <span
                  onClick={() => navigate("/terms")}
                  className="text-blue-700 font-semibold cursor-pointer hover:underline"
                >
                  {" "}Terms of Service{" "}
                </span>
                and
                <span
                  onClick={() => navigate("/privacy-policy")}
                  className="text-blue-700 font-semibold cursor-pointer hover:underline"
                >
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
