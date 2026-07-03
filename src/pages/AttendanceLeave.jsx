import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";

const DEMO_RECORDS = [
  { date: "2026-06-29", status: "Present" },
  { date: "2026-06-30", status: "Present" },
  { date: "2026-07-01", status: "Leave" },
];

function AttendanceLeave() {
  const navigate = useNavigate();
  const [leaveRequest, setLeaveRequest] = useState({ date: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  const present = DEMO_RECORDS.filter((r) => r.status === "Present").length;
  const onLeave = DEMO_RECORDS.filter((r) => r.status === "Leave").length;

  const handleChange = (e) => {
    setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leaveRequest.date || !leaveRequest.reason) return;
    // NOTE: No backend endpoint exists yet to submit leave requests —
    // this is a UI-only demo confirmation.
    setSubmitted(true);
    setLeaveRequest({ date: "", reason: "" });
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
        <h1 className="text-5xl font-extrabold mb-3">Attendance & Leave</h1>
        <p className="text-gray-500 text-lg mb-4">
          Track your daily attendance and request time off during an active
          internship.
        </p>

        <div className="mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Demo data — not yet connected to a real internship
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500 mb-1">Days Present</p>
            <p className="text-4xl font-extrabold text-green-600">{present}</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <p className="text-gray-500 mb-1">Days on Leave</p>
            <p className="text-4xl font-extrabold text-amber-600">{onLeave}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FaCalendarCheck className="text-blue-700 text-xl" />
            <h2 className="text-2xl font-bold">Recent Record</h2>
          </div>

          <div className="space-y-3">
            {DEMO_RECORDS.map((record) => (
              <div
                key={record.date}
                className="flex justify-between items-center bg-gray-50 rounded-xl px-5 py-4"
              >
                <p className="font-medium">
                  {new Date(record.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    record.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Request Leave</h2>

          {submitted && (
            <div className="mb-6 px-5 py-4 rounded-2xl bg-green-50 text-green-700 font-medium border border-green-100">
              Leave request noted (demo only — not sent anywhere yet).
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="date"
              name="date"
              value={leaveRequest.date}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
            />
            <textarea
              name="reason"
              rows="3"
              placeholder="Reason for leave"
              value={leaveRequest.reason}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none resize-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AttendanceLeave;
