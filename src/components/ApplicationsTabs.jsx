function ApplicationsTabs({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
}) {

  const tabs = [
    "All",
    "Under Review",
    "Shortlisted",
    "Approved",
    "Rejected",
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-gray-100 p-3 rounded-2xl">

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 rounded-xl font-medium transition ${
              activeTab === tab
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "All" ? "All (142)" : tab}
          </button>
        ))}

      </div>

      {/* Search */}
      <div className="relative w-full lg:w-80">

        <span className="absolute left-4 top-1/2 -translate-y-1/2">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search by name or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white py-3 pl-12 pr-4 rounded-xl shadow-sm outline-none"
        />

      </div>

    </div>
  );
}

export default ApplicationsTabs;