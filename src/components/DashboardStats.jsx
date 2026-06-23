function DashboardStats() {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">

      {/* Total Applications */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="text-3xl mb-4">👥</div>

        <p className="text-gray-500 text-sm">
          Total Applications
        </p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
            1,284
          </h2>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
            +12%
          </span>
        </div>
      </div>

      {/* Shortlisted */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="text-3xl mb-4">🧑‍💼</div>

        <p className="text-gray-500 text-sm">
          Shortlisted
        </p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
            142
          </h2>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
            +5%
          </span>
        </div>
      </div>

      {/* Active Interns */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="text-3xl mb-4">🏅</div>

        <p className="text-gray-500 text-sm">
          Active Interns
        </p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
            28
          </h2>

          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            Static
          </span>
        </div>
      </div>

      {/* Rating Card */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">
        <p className="text-sm opacity-90">
          Recruitment Rating
        </p>

        <h2 className="text-3xl font-bold mt-2 break-words">
          Excellent
        </h2>

        <p className="mt-4 text-lg">
          ⭐⭐⭐⭐⭐
        </p>

        <p className="text-sm mt-2 opacity-90">
          Top 5% of Employers
        </p>
      </div>

    </div>
  );
}

export default DashboardStats;