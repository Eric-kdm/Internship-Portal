function ProfessionalDetails() {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-8">
        💼 Professional Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Industry Sector
          </label>

          <input
            type="text"
            placeholder="e.g. Digital Media"
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Workforce Size
          </label>

          <select className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>1-10 employees</option>
            <option>11-50 employees</option>
            <option>51-200 employees</option>
            <option>201-500 employees</option>
            <option>500+ employees</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Headquarters Location
          </label>

          <input
            type="text"
            placeholder="📍 City, Country"
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
    </section>
  );
}

export default ProfessionalDetails;