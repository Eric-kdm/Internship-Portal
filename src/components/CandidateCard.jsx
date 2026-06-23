function CandidateCard({
  name,
  degree,
  status,
  skills,
}) {

  const statusStyles = {
    "Under Review":
      "bg-blue-100 text-blue-700",
    Shortlisted:
      "bg-orange-100 text-orange-700",
    Approved:
      "bg-green-100 text-green-700",
    Rejected:
      "bg-red-100 text-red-700",
  };

  return (
    <div className="group bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 transition-all hover:-translate-y-2 hover:shadow-lg">

      {/* Top */}
      <div className="flex justify-between items-start mb-6">

        <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
          👤
        </div>

        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            statusStyles[status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </div>

      </div>

      {/* Name */}
      <h3 className="text-2xl font-bold text-gray-900 mb-1">
        {name}
      </h3>

      {/* Degree */}
      <p className="text-gray-500 text-sm font-medium mb-4">
        {degree}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-6">

        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
          >
            {skill}
          </span>
        ))}

      </div>

      {/* Actions */}
      <div className="pt-6 border-t border-gray-100 flex gap-3">

        <button className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl text-sm hover:bg-gray-200 transition">
          View Portfolio
        </button>

        <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition">
          ✉️
        </button>

      </div>

    </div>
  );
}

export default CandidateCard;