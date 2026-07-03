import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";

const DEFAULT_SKILLS = [
  "Communication",
  "Problem Solving",
  "Technical Skills",
  "Teamwork",
  "Time Management",
];

function SelfAssessment() {
  const navigate = useNavigate();

  const [ratings, setRatings] = useState(
    JSON.parse(localStorage.getItem("selfAssessment")) ||
      DEFAULT_SKILLS.reduce((acc, skill) => ({ ...acc, [skill]: 3 }), {})
  );
  const [notes, setNotes] = useState(
    localStorage.getItem("selfAssessmentNotes") || ""
  );
  const [saved, setSaved] = useState(false);

  const handleRatingChange = (skill, value) => {
    setRatings({ ...ratings, [skill]: Number(value) });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("selfAssessment", JSON.stringify(ratings));
    localStorage.setItem("selfAssessmentNotes", notes);
    setSaved(true);
  };

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
          onClick={() => navigate("/student-dashboard")}
          className="text-blue-700 font-semibold hover:underline"
        >
          Back to Dashboard
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-extrabold mb-3">Self Assessment</h1>
        <p className="text-gray-500 text-lg mb-4">
          Reflect honestly on where you stand — this helps you track your own
          growth over time.
        </p>

        <div className="mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Saved on this device only — not yet shared with organizations
          </span>
        </div>

        {saved && (
          <div className="mb-8 px-5 py-4 rounded-2xl bg-green-50 text-green-700 font-medium border border-green-100">
            Your self-assessment has been saved.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-8">Rate Your Skills</h2>

          <div className="space-y-8">
            {DEFAULT_SKILLS.map((skill) => (
              <div key={skill}>
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{skill}</p>
                  <span className="text-blue-700 font-bold">
                    {ratings[skill]} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={ratings[skill]}
                  onChange={(e) => handleRatingChange(skill, e.target.value)}
                  className="w-full accent-blue-700"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4">Reflection Notes</h2>
          <textarea
            rows="5"
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              setSaved(false);
            }}
            placeholder="What are you proud of? What do you want to improve?"
            className="w-full bg-gray-100 rounded-xl p-5 outline-none resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-4 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition"
        >
          <FaSave />
          Save Assessment
        </button>
      </main>
    </div>
  );
}

export default SelfAssessment;
