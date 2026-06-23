function RecentActivity() {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm h-full">

      <h2 className="text-3xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-8">

        {/* Activity 1 */}
        <div className="flex gap-4">

          <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>

          <div>
            <h4 className="font-semibold">
              New application received
            </h4>

            <p className="text-sm text-gray-500">
              Sarah Chen applied for Product Design
            </p>

            <p className="text-xs text-gray-400 mt-2 uppercase">
              2 Minutes Ago
            </p>
          </div>

        </div>

        {/* Activity 2 */}
        <div className="flex gap-4">

          <div className="w-3 h-3 bg-orange-600 rounded-full mt-2"></div>

          <div>
            <h4 className="font-semibold">
              Interview Scheduled
            </h4>

            <p className="text-sm text-gray-500">
              Meeting with Marcus V. at 2:00 PM
            </p>

            <p className="text-xs text-gray-400 mt-2 uppercase">
              45 Minutes Ago
            </p>
          </div>

        </div>

        {/* Activity 3 */}
        <div className="flex gap-4">

          <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>

          <div>
            <h4 className="font-semibold">
              Offer Accepted
            </h4>

            <p className="text-sm text-gray-500">
              Leo Da Silva joined the Frontend team
            </p>

            <p className="text-xs text-gray-400 mt-2 uppercase">
              3 Hours Ago
            </p>
          </div>

        </div>

      </div>

      {/* Pipeline Distribution */}
      <div className="bg-gray-100 rounded-xl p-4 mt-10">

        <h3 className="font-bold mb-4">
          Pipeline Distribution
        </h3>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>INITIAL SCREENING</span>
            <span>65%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-600 h-2 rounded-full w-[65%]"></div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>TECHNICAL ROUND</span>
            <span>25%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full w-[25%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>FINAL INTERVIEW</span>
            <span>10%</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-orange-500 h-2 rounded-full w-[10%]"></div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default RecentActivity;