import { useNavigate } from "react-router-dom";

function ApplicationsHeader({
  selectedRole,
  setSelectedRole,
}) {
  const navigate = useNavigate();

  return (
    <section className="mb-12">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

        {/* Left Side */}
        <div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Manage
            <br />
            Applications
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Curating the next generation of architectural talent.
            <br />
            Review, track, and shortlist with precision.
          </p>

        </div>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row items-center gap-4">

          {/* Post Internship Button */}
          <button
            onClick={() => navigate("/post-internship")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition"
          >
            + Post Internship
          </button>

          {/* Role Dropdown */}
          <div className="bg-gray-200 px-5 py-3 rounded-xl shadow-sm">

            <span className="text-gray-700 mr-2 font-medium">
              Role:
            </span>

            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value)
              }
              className="bg-transparent text-blue-600 font-semibold outline-none cursor-pointer"
            >
              <option>All Roles</option>
              <option>Lead Architect</option>
              <option>Junior Designer</option>
              <option>BIM Specialist</option>
            </select>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ApplicationsHeader;