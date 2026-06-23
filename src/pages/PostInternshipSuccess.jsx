import { useNavigate } from "react-router-dom";

function PostInternshipSuccess() {
  const navigate = useNavigate();

  const handleDashboard = () => {
    localStorage.removeItem("step1Data");
    localStorage.removeItem("step2Data");
    localStorage.removeItem("step3Data");

    navigate("/organization-dashboard");
  };

  const handleNewInternship = () => {
    localStorage.removeItem("step1Data");
    localStorage.removeItem("step2Data");
    localStorage.removeItem("step3Data");

    navigate("/post-internship");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="bg-white p-12 rounded-3xl shadow-lg max-w-2xl w-full text-center">

        <div className="text-7xl mb-6">
          🎉
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Internship Posted Successfully!
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Your internship has been published successfully
          and is now available for students to view and apply.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">

          <h2 className="text-green-700 font-semibold text-xl mb-2">
            Status: Published
          </h2>

          <p className="text-gray-600">
            Students can now discover and apply for this internship opportunity.
          </p>

        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">

          <button
            onClick={handleDashboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Go To Dashboard
          </button>

          <button
            onClick={handleNewInternship}
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl font-semibold"
          >
            Post Another Internship
          </button>

        </div>

      </div>

    </div>
  );
}

export default PostInternshipSuccess;