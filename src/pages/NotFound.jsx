import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-blue-700 mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
