import { useNavigate } from "react-router-dom";
import { FaDownload, FaAward } from "react-icons/fa";

function CertificatePreview() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const studentName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`
    : "Student Name";

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
        <h1 className="text-5xl font-extrabold mb-3">Certificate</h1>
        <p className="text-gray-500 text-lg mb-4">
          A certificate is issued once an organization marks your internship
          as complete.
        </p>

        <div className="mb-10">
          <span className="inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-amber-200">
            Demo preview — certificate generation isn't connected to the backend yet
          </span>
        </div>

        {/* CERTIFICATE PREVIEW */}
        <div className="bg-white rounded-[32px] shadow-lg p-4">
          <div className="border-4 border-blue-700 rounded-3xl p-12 text-center">
            <FaAward className="text-blue-700 text-5xl mx-auto mb-6" />

            <p className="uppercase tracking-[6px] text-gray-400 text-sm mb-4">
              Certificate of Completion
            </p>

            <h2 className="text-4xl font-extrabold mb-6">InternHub</h2>

            <p className="text-gray-500 mb-2">This certifies that</p>
            <h3 className="text-3xl font-bold mb-6">{studentName}</h3>

            <p className="text-gray-500 max-w-md mx-auto mb-10">
              has successfully completed an internship through the InternHub
              platform, demonstrating dedication and professional growth.
            </p>

            <div className="flex justify-center gap-16 text-sm text-gray-500">
              <div>
                <div className="w-32 border-t border-gray-300 mb-2 mx-auto" />
                Date
              </div>
              <div>
                <div className="w-32 border-t border-gray-300 mb-2 mx-auto" />
                Signature
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            disabled
            title="Available once your certificate has been issued"
            className="flex items-center gap-2 mx-auto px-8 py-4 bg-gray-200 text-gray-400 rounded-full font-bold cursor-not-allowed"
          >
            <FaDownload />
            Download Certificate
          </button>
        </div>
      </main>
    </div>
  );
}

export default CertificatePreview;
