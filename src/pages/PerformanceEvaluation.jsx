import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

const DEMO_METRICS = [
  { label: "Quality of Work", score: 4 },
  { label: "Communication", score: 4 },
  { label: "Punctuality", score: 5 },
  { label: "Initiative", score: 3 },
];

function PerformanceEvaluation() {
  const navigate = useNavigate();

  const average = (
    DEMO_METRICS.reduce((sum, m) => sum + m.score, 0) / DEMO_METRICS.length
  ).toFixed(1);

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
        <h1 className="text-5xl font-extrabold mb-3">Performance Evaluation</h1>
        <p className="text-gray-500 text-lg mb-4">
          Feedback shared by the organization during an active internship
          will appear here.
        </p>

        <div className="mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Demo data — organization feedback isn't connected to the backend yet
          </span>
        </div>

        <div className="bg-blue-700 text-white rounded-3xl p-8 mb-8 flex items-center justify-between">
          <div>
            <p className="text-blue-100 mb-2">Overall Rating</p>
            <h2 className="text-5xl font-extrabold">{average} / 5</h2>
          </div>
          <FaChartLine className="text-6xl text-blue-300" />
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-8">Breakdown</h2>

          <div className="space-y-6">
            {DEMO_METRICS.map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">{metric.label}</p>
                  <span className="text-blue-700 font-bold">{metric.score} / 5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-blue-700 h-3 rounded-full"
                    style={{ width: `${(metric.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Organization Notes</h2>
          <p className="text-gray-500 italic">
            No feedback has been shared yet. Once the organization submits an
            evaluation, it will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}

export default PerformanceEvaluation;
