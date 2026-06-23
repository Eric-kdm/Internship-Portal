import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PostInternshipHeader from "../Components/PostInternshipHeader";
import ProgressBar from "../Components/ProgressBar";
import PostInternshipSidebar from "../Components/PostInternshipSidebar";

function PostInternshipStep2() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [tools, setTools] = useState("");
  const [qualification, setQualification] =
    useState("");

  const handleNext = () => {
  if (
    !skills ||
    !education ||
    !experience ||
    !tools ||
    !qualification
  ) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem(
    "step2Data",
    JSON.stringify({
      skills,
      education,
      experience,
      tools,
      qualification,
    })
  );

  navigate("/post-internship/details");
};

  const handleBack = () => {
    navigate("/post-internship");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <header className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">

          <div className="flex items-center gap-12">

            <h1 className="text-3xl font-bold text-blue-600">
              Portal
            </h1>

            <div className="hidden md:flex gap-8 text-gray-500 font-medium">

              <span>Opportunities</span>
              <span>Messages</span>
              <span>Resources</span>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <button>🔔</button>
            <button>🌙</button>

            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              👤
            </div>

          </div>

        </div>

      </header>

      <main className="flex-1 py-12 px-6">

        <div className="max-w-5xl mx-auto">

          <PostInternshipHeader />

          <ProgressBar
            step={2}
            percentage={40}
            title="Requirements"
          />

          <div className="grid md:grid-cols-12 gap-8">

            {/* Form */}
            <div className="md:col-span-8 bg-white p-8 rounded-xl shadow-sm">

              <div className="space-y-6">

                {/* Skills */}
                <div>

                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Required Skills
                  </label>

                  <input
                    type="text"
                    value={skills}
                    onChange={(e) =>
                      setSkills(e.target.value)
                    }
                    placeholder="React, Node.js, JavaScript"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />

                </div>

                {/* Education */}
                <div>

                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Education Level
                  </label>

                  <select
                    value={education}
                    onChange={(e) =>
                      setEducation(e.target.value)
                    }
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  >
                    <option value="">
                      Select Education
                    </option>

                    <option>
                      Diploma
                    </option>

                    <option>
                      Bachelor's Degree
                    </option>

                    <option>
                      Master's Degree
                    </option>

                    <option>
                      PhD
                    </option>

                  </select>

                </div>

                {/* Experience */}
                <div>

                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Experience Level
                  </label>

                  <select
                    value={experience}
                    onChange={(e) =>
                      setExperience(e.target.value)
                    }
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  >
                    <option value="">
                      Select Experience
                    </option>

                    <option>
                      Fresher
                    </option>

                    <option>
                      0 - 1 Years
                    </option>

                    <option>
                      1 - 3 Years
                    </option>

                    <option>
                      3+ Years
                    </option>

                  </select>

                </div>

                {/* Tools */}
                <div>

                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Tools & Technologies
                  </label>

                  <input
                    type="text"
                    value={tools}
                    onChange={(e) =>
                      setTools(e.target.value)
                    }
                    placeholder="VS Code, GitHub, Figma"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />

                </div>

                {/* Qualification */}
                <div>

                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Preferred Qualifications
                  </label>

                  <textarea
                    rows="5"
                    value={qualification}
                    onChange={(e) =>
                      setQualification(e.target.value)
                    }
                    placeholder="Additional qualifications..."
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none resize-none"
                  ></textarea>

                </div>

              </div>

              {/* Buttons */}
              <div className="pt-8 flex justify-between">

                <button
                  onClick={handleBack}
                  className="text-blue-600 font-semibold"
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg"
                >
                  Next: Internship Details
                </button>

              </div>

            </div>

            {/* Sidebar */}
            <div className="md:col-span-4">

              <PostInternshipSidebar />

            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">

        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © 2026 Internship Portal. All rights reserved.
          </p>

          <div className="flex gap-8 text-sm text-gray-500 mt-4 md:mt-0">

            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Help Center</span>
            <span>Contact</span>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default PostInternshipStep2;