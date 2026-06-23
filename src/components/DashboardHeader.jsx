function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Organization Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor your recruitment funnel and active internships.
        </p>
      </div>

      <div className="flex items-center gap-4 mt-4 md:mt-0">

        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
          🔔
        </div>

      </div>

    </div>
  );
}

export default DashboardHeader;