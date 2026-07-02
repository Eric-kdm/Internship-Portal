function OrganizationIdentity({ formData, setFormData }) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-8">
        🏢 Organization Identity
      </h2>

      {/* Logo Upload Area */}

      <div className="bg-gray-100 rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="w-28 h-28 bg-gray-200 rounded-2xl flex items-center justify-center text-4xl">
            📷
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
              Organization Logo
            </h3>

            <p className="text-gray-500 text-sm mb-4">
              Upload a high-resolution logo.
              Recommended 400x400px.
              PNG or JPG supported.
            </p>

            <label className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition">
              Choose File
              <input
                type="file"
                className="hidden"
              />
            </label>
          </div>

        </div>
      </div>

      {/* Form Fields */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Organization Name
          </label>

          <input
  type="text"
  placeholder="The Editorial Architect"
  value={formData.organizationName}
  onChange={(e) =>
    setFormData({
      ...formData,
      organizationName: e.target.value,
    })
  }
  className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Organization Type
          </label>

          <select
  value={formData.organizationType}
  onChange={(e) =>
    setFormData({
      ...formData,
      organizationType: e.target.value,
    })
  }
  className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
            <option>Agency</option>
            <option>Startup</option>
            <option>Corporate</option>
            <option>Education</option>
            <option>Non-Profit</option>
          </select>
        </div>

      </div>
    </section>
  );
}

export default OrganizationIdentity;