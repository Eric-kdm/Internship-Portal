function ActiveInternships() {
  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">
            Active Internships
          </h2>

          <p className="text-gray-500">
            Managing current recruitment pipelines.
          </p>
        </div>

        <button className="text-blue-600 font-semibold hover:underline">
          View All
        </button>
      </div>

      {/* Table Heading */}
      <div className="grid grid-cols-4 gap-6 text-gray-600 font-semibold uppercase tracking-wider text-sm border-b pb-4">
        <div>Position</div>
        <div>Applications</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* Internship 1 */}
      <div className="grid grid-cols-4 gap-6 items-center py-6 border-b">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
            🛠️
          </div>

          <div>
            <h3 className="font-bold">
              Product Design Intern
            </h3>

            <p className="text-gray-500 text-sm">
              Q4 Intake • Full-time
            </p>
          </div>
        </div>

        <div>
          <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
            +42 Applications
          </span>
        </div>

        <div>
          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
            Active
          </span>
        </div>

        <div className="text-xl cursor-pointer">
          ✏️
        </div>

      </div>

      {/* Internship 2 */}
      <div className="grid grid-cols-4 gap-6 items-center py-6 border-b">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
            💻
          </div>

          <div>
            <h3 className="font-bold">
              Frontend Developer
            </h3>

            <p className="text-gray-500 text-sm">
              Remote • 3 Months
            </p>
          </div>
        </div>

        <div>
          <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
            +128 Applications
          </span>
        </div>

        <div>
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
            Closing Soon
          </span>
        </div>

        <div className="text-xl cursor-pointer">
          ✏️
        </div>

      </div>

      {/* Internship 3 */}
      <div className="grid grid-cols-4 gap-6 items-center py-6">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
            📢
          </div>

          <div>
            <h3 className="font-bold">
              Marketing Growth Intern
            </h3>

            <p className="text-gray-500 text-sm">
              Hybrid • Summer 2024
            </p>
          </div>
        </div>

        <div>
          <span className="bg-gray-100 px-3 py-2 rounded-full text-sm">
            +86 Applications
          </span>
        </div>

        <div>
          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
            Active
          </span>
        </div>

        <div className="text-xl cursor-pointer">
          ✏️
        </div>

      </div>

    </section>
  );
}

export default ActiveInternships;