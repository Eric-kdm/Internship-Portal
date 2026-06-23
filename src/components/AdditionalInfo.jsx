function AdditionalInfo() {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-8">
        ℹ️ Additional Info
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Website URL
          </label>

          <input
            type="url"
            placeholder="https://www.example.com"
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            LinkedIn Profile
          </label>

          <input
            type="text"
            placeholder="linkedin.com/company/..."
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
            Professional Description / Bio
          </label>

          <textarea
            rows="5"
            placeholder="Tell us about your organization's mission and culture..."
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

      </div>
    </section>
  );
}

export default AdditionalInfo;