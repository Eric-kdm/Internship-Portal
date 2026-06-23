import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostInternshipStep1() {
  const navigate = useNavigate();

  const [roleTitle, setRoleTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => {
  if (
    !roleTitle.trim() ||
    !domain ||
    !description.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }

  localStorage.setItem(
    "step1Data",
    JSON.stringify({
      roleTitle,
      domain,
      description,
    })
  );

  navigate("/post-internship/requirements");
};

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">

          <h1 className="text-3xl font-bold text-blue-600">
            Portal
          </h1>

          <div className="flex gap-8 text-gray-600">
            <span>Opportunities</span>
            <span>Messages</span>
            <span>Resources</span>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-bold">
          Create New Internship
        </h1>

        <p className="text-gray-500 mt-3 mb-12">
          Curate the perfect opportunity for the next generation of talent.
        </p>

        {/* Progress */}
        <div className="mb-10">

          <div className="flex justify-between mb-2">
            <span className="text-blue-600 font-semibold uppercase">
              Step 1 of 5 : Role Details
            </span>

            <span className="font-medium">
              20% Completed
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full w-1/5"></div>
          </div>

        </div>

        <div className="grid md:grid-cols-12 gap-8">

          {/* Form */}
          <div className="md:col-span-8 bg-white p-8 rounded-2xl shadow-sm">

            <div className="space-y-6">

              <div>
                <label className="block font-semibold mb-2">
                  Role Title
                </label>

                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) =>
                    setRoleTitle(e.target.value)
                  }
                  placeholder="Frontend Developer Intern"
                  className="w-full p-4 bg-gray-100 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Domain
                </label>

                <select
                  value={domain}
                  onChange={(e) =>
                    setDomain(e.target.value)
                  }
                  className="w-full p-4 bg-gray-100 rounded-xl outline-none"
                >
                  <option value="">
                    Select Domain
                  </option>

                  <option>
                    Web Development
                  </option>

                  <option>
                    Data Science
                  </option>

                  <option>
                    UI/UX Design
                  </option>

                  <option>
                    Cyber Security
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Description
                </label>

                <textarea
                  rows="6"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe internship role..."
                  className="w-full p-4 bg-gray-100 rounded-xl outline-none"
                ></textarea>
              </div>

            </div>

            <div className="flex justify-between mt-10">

              <button className="text-blue-600 font-semibold">
                Cancel
              </button>

              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                Next: Requirements
              </button>

            </div>

          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">

            <div className="bg-blue-50 p-6 rounded-2xl">

              <h3 className="text-xl font-bold mb-3">
                Editorial Tip
              </h3>

              <p className="text-gray-600">
                A clear role title attracts better candidates.
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">

              <h4 className="font-bold mb-4">
                Preview Draft
              </h4>

              <div className="space-y-3">

                <div className="h-4 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded"></div>

                <div className="h-24 bg-gray-200 rounded"></div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default PostInternshipStep1;