import { useNavigate } from "react-router-dom";

function InternshipDetails() {
  const navigate = useNavigate();

  const internship =
    JSON.parse(localStorage.getItem("selectedInternship")) || {};

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b shadow-sm">

        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Internship Details
            </h1>

            <p className="text-gray-500 mt-2">
              Complete information about the internship.
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/my-posted-internships")
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Back
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-sm p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold">
              {internship.roleTitle}
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
              Published
            </span>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Domain
              </h3>

              <p className="text-lg">
                {internship.domain}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Duration
              </h3>

              <p className="text-lg">
                {internship.duration}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Stipend
              </h3>

              <p className="text-lg">
                ₹{internship.stipend}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Location
              </h3>

              <p className="text-lg">
                {internship.location}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Work Mode
              </h3>

              <p className="text-lg">
                {internship.workMode}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Openings
              </h3>

              <p className="text-lg">
                {internship.openings}
              </p>

            </div>

          </div>

          {/* Description */}
          <div className="mt-10">

            <h3 className="text-xl font-bold mb-3">
              Description
            </h3>

            <p className="text-gray-700">
              {internship.description}
            </p>

          </div>

          {/* Skills */}
          <div className="mt-10">

            <h3 className="text-xl font-bold mb-3">
              Required Skills
            </h3>

            <p className="text-gray-700">
              {internship.skills}
            </p>

          </div>

          {/* Education */}
          <div className="mt-10">

            <h3 className="text-xl font-bold mb-3">
              Education Level
            </h3>

            <p className="text-gray-700">
              {internship.education}
            </p>

          </div>

          {/* Experience */}
          <div className="mt-10">

            <h3 className="text-xl font-bold mb-3">
              Experience Level
            </h3>

            <p className="text-gray-700">
              {internship.experience}
            </p>

          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Application Deadline
              </h3>

              <p>
                {internship.deadline}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-500 mb-2">
                Joining Date
              </h3>

              <p>
                {internship.joiningDate}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InternshipDetails;