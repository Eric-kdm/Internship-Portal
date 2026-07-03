import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

function PublicStudentProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

  const skillsList = profile.skills
    ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate("/settings")}
          className="text-blue-700 font-semibold hover:underline"
        >
          Edit Profile
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Preview — this is how organizations will see your profile
          </span>
        </div>

        <div className="bg-white rounded-[32px] shadow-lg p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-5xl overflow-hidden shrink-0">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-2">
                {profile.fullName ||
                  (user.firstName ? `${user.firstName} ${user.lastName || ""}` : "Student Name")}
              </h1>

              <p className="text-gray-500 text-lg mb-3">
                {profile.degree
                  ? `${profile.degree}${profile.branch ? `, ${profile.branch}` : ""}`
                  : "Add your degree in Student Profile"}
              </p>

              {profile.location && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 mb-4">
                  <FaMapMarkerAlt />
                  {profile.location}
                </div>
              )}

              <div className="flex gap-4 justify-center md:justify-start">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-200"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FaGithub />
                  </a>
                )}
                {profile.portfolio && (
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FaGlobe />
                  </a>
                )}
              </div>
            </div>
          </div>

          {skillsList.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-bold tracking-[3px] uppercase text-gray-500 mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2 bg-blue-100 text-blue-700 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.projects && (
            <div className="mb-10">
              <h3 className="text-sm font-bold tracking-[3px] uppercase text-gray-500 mb-4">
                Projects
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {profile.projects}
              </p>
            </div>
          )}

          {profile.experience && (
            <div>
              <h3 className="text-sm font-bold tracking-[3px] uppercase text-gray-500 mb-4">
                Experience
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {profile.experience}
              </p>
            </div>
          )}

          {!profile.fullName && (
            <div className="text-center py-10 border-t mt-10">
              <p className="text-gray-500 mb-6">
                Your profile is empty. Complete it to make a strong first
                impression on organizations.
              </p>
              <button
                onClick={() => navigate("/student-profile")}
                className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
              >
                Complete Your Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PublicStudentProfile;
