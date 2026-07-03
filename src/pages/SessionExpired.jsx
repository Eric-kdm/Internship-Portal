import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";

function SessionExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white rounded-[32px] shadow-xl p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center">
            <FaClock className="text-amber-600 text-5xl" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-4">Session Expired</h1>
        <p className="text-gray-500 text-lg mb-10">
          For your security, you've been signed out after a period of
          inactivity. Please log back in to continue where you left off.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full py-4 rounded-full bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
        >
          Log In Again
        </button>
      </div>
    </div>
  );
}

export default SessionExpired;
