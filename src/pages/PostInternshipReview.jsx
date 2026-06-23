import { useNavigate } from "react-router-dom";

import PostInternshipHeader from "../Components/PostInternshipHeader";
import ProgressBar from "../Components/ProgressBar";

function PostInternshipReview() {
  const navigate = useNavigate();

  const step1 =
    JSON.parse(localStorage.getItem("step1Data")) || {};

  const step2 =
    JSON.parse(localStorage.getItem("step2Data")) || {};

  const step3 =
    JSON.parse(localStorage.getItem("step3Data")) || {};

  const handlePublish = () => {
  const internship = {
    ...step1,
    ...step2,
    ...step3,
    status: "Published",
  };

  const existingInternships =
    JSON.parse(localStorage.getItem("internships")) || [];

  existingInternships.push(internship);

  localStorage.setItem(
    "internships",
    JSON.stringify(existingInternships)
  );

  navigate("/post-internship/success");
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <main className="flex-1 py-12 px-6">

        <div className="max-w-5xl mx-auto">

          <PostInternshipHeader />

          <ProgressBar
            step={4}
            percentage={80}
            title="Review & Preview"
          />

          <div className="bg-white p-8 rounded-xl shadow-sm">

            <h2 className="text-3xl font-bold mb-8">
              Internship Summary
            </h2>

            {/* Step 1 */}
            <div className="mb-8">

              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Role Details
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Role Title:</strong>{" "}
                  {step1.roleTitle}
                </p>

                <p>
                  <strong>Domain:</strong>{" "}
                  {step1.domain}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {step1.description}
                </p>
              </div>

            </div>

            {/* Step 2 */}
            <div className="mb-8">

              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Requirements
              </h3>

              <div className="space-y-2">
                <p>
                  <strong>Skills:</strong>{" "}
                  {step2.skills}
                </p>

                <p>
                  <strong>Education:</strong>{" "}
                  {step2.education}
                </p>

                <p>
                  <strong>Experience:</strong>{" "}
                  {step2.experience}
                </p>

                <p>
                  <strong>Tools:</strong>{" "}
                  {step2.tools}
                </p>

                <p>
                  <strong>Preferred Qualification:</strong>{" "}
                  {step2.qualification}
                </p>
              </div>

            </div>

            {/* Step 3 */}
            <div>

              <h3 className="text-xl font-bold text-blue-600 mb-4">
                Internship Details
              </h3>

              <div className="space-y-2">

                <p>
                  <strong>Duration:</strong>{" "}
                  {step3.duration}
                </p>

                <p>
                  <strong>Stipend:</strong> ₹
                  {step3.stipend}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {step3.location}
                </p>

                <p>
                  <strong>Work Mode:</strong>{" "}
                  {step3.workMode}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {step3.deadline}
                </p>

                <p>
                  <strong>Openings:</strong>{" "}
                  {step3.openings}
                </p>

                <p>
                  <strong>Joining Date:</strong>{" "}
                  {step3.joiningDate}
                </p>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-10">

              <button
                onClick={() =>
                  navigate("/post-internship/details")
                }
                className="text-blue-600 font-semibold"
              >
                Back
              </button>

              <button
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold"
              >
                Publish Internship
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default PostInternshipReview;