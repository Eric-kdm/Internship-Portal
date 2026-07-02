function CandidateCard({
  applicationId,
  name,
  email,
  status,
}) {

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const updateStatus = async (newStatus) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert(data.message);

        window.location.reload();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Server Error");

    }

  };

  return (
    <div className="group bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">

      <div className="flex justify-between items-start mb-6">

        <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
          👤
        </div>

        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            statusStyles[status]
          }`}
        >
          {status}
        </div>

      </div>

      <h3 className="text-2xl font-bold">
        {name}
      </h3>

      <p className="text-gray-500 mb-8">
        {email}
      </p>

      <div className="flex gap-3">

        <button
          onClick={() => updateStatus("accepted")}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl"
        >
          Accept
        </button>

        <button
          onClick={() => updateStatus("rejected")}
          className="flex-1 bg-red-600 text-white py-3 rounded-xl"
        >
          Reject
        </button>

      </div>

    </div>
  );
}

export default CandidateCard;