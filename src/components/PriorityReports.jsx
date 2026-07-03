function PriorityReports() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Priority Reports
        </h2>

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
          HIGH RISK
        </span>

      </div>

      {/* Report 1 */}
      <div className="mb-8">

        <h3 className="font-bold text-lg">
          Spam reported by Sarah J.
        </h3>

        <p className="text-gray-500 mt-2">
          Listing: Senior Product Designer
        </p>

        <div className="flex gap-4 mt-4">

          <button className="text-red-600 font-bold text-sm">
            DELETE
          </button>

          <button className="text-gray-400 font-bold text-sm">
            DISMISS
          </button>

        </div>

      </div>

      {/* Report 2 */}
      <div>

        <h3 className="font-bold text-lg">
          Harassment flag by Mike R.
        </h3>

        <p className="text-gray-500 mt-2">
          User: @DevGuru22
        </p>

        <div className="flex gap-4 mt-4">

          <button className="text-red-600 font-bold text-sm">
            BAN USER
          </button>

          <button className="text-gray-400 font-bold text-sm">
            INVESTIGATE
          </button>

        </div>

      </div>

      {/* Bottom Button */}
      <button className="w-full mt-10 py-4 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-all">

        Open Security Console

      </button>

    </div>
  );
}

export default PriorityReports;