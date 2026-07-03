import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function WelcomeSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || "Your account has been created successfully.";

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-[32px] shadow-xl p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-green-600 text-5xl" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Welcome to InternHub!</h1>
        <p className="text-gray-500 text-lg mb-10">{message}</p>

        <button
          onClick={() =>
            navigate("/login", {
              state: { successMessage: "Account created. Please log in to continue." },
            })
          }
          className="w-full py-4 rounded-full bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}

export default WelcomeSuccess;
