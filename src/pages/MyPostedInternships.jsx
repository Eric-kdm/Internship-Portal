import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPostedInternships() {
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const storedInternships =
      JSON.parse(localStorage.getItem("internships")) || [];

    setInternships(storedInternships);
  }, []);

  const handleDelete = (index) => {
    const updatedInternships = internships.filter(
      (_, i) => i !== index
    );

    setInternships(updatedInternships);

    localStorage.setItem(
      "internships",
      JSON.stringify(updatedInternships)
    );
  };

  const handleView = (internship) => {
    localStorage.setItem(
      "selectedInternship",
      JSON.stringify(internship)
    );

    navigate("/internship-details");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

          <div>

  <button
    onClick={() =>
      navigate("/organization-dashboard")
    }
    className="text-blue-600 font-semibold mb-4 hover:text-blue-800"
  >
    ← Back to Dashboard
  </button>

  <h1 className="text-4xl font-bold">
    My Posted Internships
  </h1>

  <p className="text-gray-500 mt-2">
    Manage all your published internships.
  </p>

</div>

          <button
            onClick={() =>
              navigate("/post-internship")
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            + New Internship
          </button>

        </div>

      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        {internships.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold mb-4">
              No Internships Posted Yet
            </h2>

            <p className="text-gray-500">
              Create your first internship opportunity.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {internships.map((internship, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold">
                    {internship.roleTitle}
                  </h2>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Published
                  </span>

                </div>

                <p className="text-gray-500 mb-3">
                  {internship.domain}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  📍 {internship.location}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  💰 ₹{internship.stipend}
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  ⏳ {internship.duration}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleView(internship)
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    View
                  </button>

                  <button
  onClick={() => {
    localStorage.setItem(
      "editInternship",
      JSON.stringify({
        ...internship,
        index,
      })
    );

    navigate("/edit-internship");
  }}
  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
>
  Edit
</button>

                  <button
                    onClick={() =>
                      handleDelete(index)
                    }
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default MyPostedInternships;