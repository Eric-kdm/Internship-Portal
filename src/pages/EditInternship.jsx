import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditInternship() {
  const navigate = useNavigate();

  const internship =
    JSON.parse(
      localStorage.getItem("editInternship")
    ) || {};

  const [roleTitle, setRoleTitle] =
  useState(internship.title || "");

  const [domain, setDomain] =
    useState(internship.domain || "");

  const [location, setLocation] =
    useState(internship.location || "");

  const [stipend, setStipend] =
    useState(internship.stipend || "");

  const [duration, setDuration] =
    useState(internship.duration || "");

  const [education, setEducation] =
  useState(internship.education || "");

const [experience, setExperience] =
  useState(internship.experience || "");

const [tools, setTools] =
  useState(internship.tools || "");

const [qualification, setQualification] =
  useState(internship.qualification || "");

const [deadline, setDeadline] =
  useState(internship.deadline || "");

const [openings, setOpenings] =
  useState(internship.openings || "");

const [joiningDate, setJoiningDate] =
  useState(internship.joiningDate || "");

  const handleUpdate = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/internships/${internship._id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
  title: roleTitle,
  domain,
  location,
  stipend,
  duration,

  education,
  experience,
  tools,
  qualification,

  deadline,
  openings: Number(openings),
  joiningDate,

  description: internship.description,
  mode: internship.mode,
  skills: internship.skills || [],
}),
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert(data.message);

      localStorage.removeItem("editInternship");

      navigate("/my-posted-internships");

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);

    alert("Server Error");

  }

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
  value={education}
  onChange={(e) => setEducation(e.target.value)}
  placeholder="Education"
  className="w-full p-4 border rounded-lg"
/>

<input
  type="text"
  value={experience}
  onChange={(e) => setExperience(e.target.value)}
  placeholder="Experience"
  className="w-full p-4 border rounded-lg"
/>

<input
  type="text"
  value={tools}
  onChange={(e) => setTools(e.target.value)}
  placeholder="Tools"
  className="w-full p-4 border rounded-lg"
/>

<textarea
  value={qualification}
  onChange={(e) => setQualification(e.target.value)}
  placeholder="Qualification"
  className="w-full p-4 border rounded-lg"
/>

<input
  type="date"
  value={deadline}
  onChange={(e) => setDeadline(e.target.value)}
  className="w-full p-4 border rounded-lg"
/>

<input
  type="number"
  value={openings}
  onChange={(e) => setOpenings(e.target.value)}
  placeholder="Openings"
  className="w-full p-4 border rounded-lg"
/>

<input
  type="date"
  value={joiningDate}
  onChange={(e) => setJoiningDate(e.target.value)}
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