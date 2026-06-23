import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PostInternshipHeader from "../Components/PostInternshipHeader";
import ProgressBar from "../Components/ProgressBar";
import PostInternshipSidebar from "../Components/PostInternshipSidebar";

function PostInternshipStep3() {
  const navigate = useNavigate();

  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("Remote");
  const [deadline, setDeadline] = useState("");
  const [openings, setOpenings] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const handleBack = () => {
    navigate("/post-internship/requirements");
  };

  const handleNext = () => {
  if (
    !duration.trim() ||
    !stipend ||
    !location.trim() ||
    !workMode ||
    !deadline ||
    !openings ||
    !joiningDate
  ) {
    alert(
      "Please fill all internship details before proceeding."
    );
    return;
  }

  if (Number(stipend) <= 0) {
    alert("Stipend must be greater than 0.");
    return;
  }

  if (Number(openings) <= 0) {
    alert("Number of openings must be greater than 0.");
    return;
  }

  localStorage.setItem(
  "step3Data",
  JSON.stringify({
    duration,
    stipend,
    location,
    workMode,
    deadline,
    openings,
    joiningDate,
  })
);

  navigate("/post-internship/review");
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

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">

        <div className="max-w-5xl mx-auto">

          <PostInternshipHeader />

          <ProgressBar
            step={3}
            percentage={60}
            title="Internship Details"
          />

          <div className="grid md:grid-cols-12 gap-8">

            {/* Form Section */}
            <div className="md:col-span-8 bg-white p-8 rounded-xl shadow-sm">

              <div className="space-y-6">

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Internship Duration
                  </label>

                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) =>
                      setDuration(e.target.value)
                    }
                    placeholder="e.g. 3 Months"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Stipend (₹ / Month)
                  </label>

                  <input
                    type="number"
                    required
                    min="1"
                    value={stipend}
                    onChange={(e) =>
                      setStipend(e.target.value)
                    }
                    placeholder="10000"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Location
                  </label>

                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Pune"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Work Mode
                  </label>

                  <select
                    value={workMode}
                    onChange={(e) =>
                      setWorkMode(e.target.value)
                    }
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  >
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Application Deadline
                  </label>

                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) =>
                      setDeadline(e.target.value)
                    }
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Number of Openings
                  </label>

                  <input
                    type="number"
                    required
                    min="1"
                    value={openings}
                    onChange={(e) =>
                      setOpenings(e.target.value)
                    }
                    placeholder="5"
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Joining Date
                  </label>

                  <input
                    type="date"
                    required
                    value={joiningDate}
                    onChange={(e) =>
                      setJoiningDate(e.target.value)
                    }
                    className="w-full bg-gray-100 p-4 rounded-lg outline-none"
                  />
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
                  Next: Review & Preview
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

export default PostInternshipStep3;