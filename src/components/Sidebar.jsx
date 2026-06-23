function Sidebar() {
  return (
    <div className="space-y-6">

      {/* Why this matters */}

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">
          Why this matters
        </h3>

        <p className="text-gray-600 text-sm leading-6 mb-4">
          Your organization's identity is the foundation
          of every internship listing you create.
          Accurate details help students find
          opportunities that align with their career goals.
        </p>

        <ul className="space-y-3 text-sm text-gray-600">
          <li>✓ Attract more qualified applicants</li>
          <li>✓ Improve profile visibility</li>
        </ul>
      </div>

      {/* Quick Tip */}

      <div className="bg-orange-100 p-6 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">
          Quick Tip
        </h3>

        <p className="text-sm text-gray-700">
          Ensure your headquarters location matches
          your official business registration details
          for faster account verification.
        </p>
      </div>

      {/* Live Preview */}

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">
          Live Preview
        </h3>

        <div className="bg-gray-100 rounded-lg p-4">
          <div className="w-10 h-10 bg-gray-300 rounded mb-3"></div>

          <div className="h-3 bg-gray-300 rounded mb-2"></div>

          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;