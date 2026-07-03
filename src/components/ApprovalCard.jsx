function ApprovalCard({ company, type, time }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center justify-between">

      <div>

        <h2 className="text-xl font-bold">
          {company}
        </h2>

        <p className="text-gray-500">
          {type}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {time}
        </p>

      </div>

      <div className="flex gap-3">

        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-semibold">
          Reject
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold">
          Approve
        </button>

      </div>

    </div>
  );
}

export default ApprovalCard;