import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditInternship() {
  const navigate = useNavigate();

  const internship =
    JSON.parse(
      localStorage.getItem("editInternship")
    ) || {};

  const [roleTitle, setRoleTitle] =
    useState(internship.roleTitle || "");

  const [domain, setDomain] =
    useState(internship.domain || "");

  const [location, setLocation] =
    useState(internship.location || "");

  const [stipend, setStipend] =
    useState(internship.stipend || "");

  const [duration, setDuration] =
    useState(internship.duration || "");

  const handleUpdate = () => {
    const internships =
      JSON.parse(
        localStorage.getItem("internships")
      ) || [];

    internships[internship.index] = {
      ...internships[internship.index],
      roleTitle,
      domain,
      location,
      stipend,
      duration,
    };

    localStorage.setItem(
      "internships",
      JSON.stringify(internships)
    );

    alert("Internship Updated Successfully!");

    navigate("/my-posted-internships");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Internship
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm">

          <div className="space-y-5">

            <input
              type="text"
              value={roleTitle}
              onChange={(e) =>
                setRoleTitle(e.target.value)
              }
              placeholder="Role Title"
              className="w-full p-4 border rounded-lg"
            />

            <input
              type="text"
              value={domain}
              onChange={(e) =>
                setDomain(e.target.value)
              }
              placeholder="Domain"
              className="w-full p-4 border rounded-lg"
            />

            <input
              type="text"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="Location"
              className="w-full p-4 border rounded-lg"
            />

            <input
              type="number"
              value={stipend}
              onChange={(e) =>
                setStipend(e.target.value)
              }
              placeholder="Stipend"
              className="w-full p-4 border rounded-lg"
            />

            <input
              type="text"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              placeholder="Duration"
              className="w-full p-4 border rounded-lg"
            />

          </div>

          <div className="flex justify-between mt-8">

            <button
              onClick={() =>
                navigate("/my-posted-internships")
              }
              className="text-blue-600 font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-8 py-3 rounded-xl"
            >
              Update Internship
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EditInternship;