import { useEffect, useState } from "react";

function DashboardStats() {

  const [stats, setStats] = useState({
    totalInternships: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {

          setStats({
            totalInternships: data.totalInternships,
            totalApplications: data.totalApplications,
            pendingApplications: data.pendingApplications,
            acceptedApplications: data.acceptedApplications,
            rejectedApplications: data.rejectedApplications,
          });

        } else {

          alert(data.message);

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchDashboard();

  }, []);
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">

      {/* Total Applications */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="text-3xl mb-4">👥</div>

        <p className="text-gray-500 text-sm">
  Total Internships
</p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
  {stats.totalInternships}
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
  Applications
</p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
  {stats.totalApplications}
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
  Pending Applications
</p>

        <div className="flex items-center justify-between mt-3">
          <h2 className="text-3xl font-bold">
  {stats.pendingApplications}
</h2>

          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
            Static
          </span>
        </div>
      </div>

      {/* Rating Card */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-sm">

  <p className="text-sm opacity-90">
    Accepted Applications
  </p>

  <h2 className="text-4xl font-bold mt-2">
    {stats.acceptedApplications}
  </h2>

  <p className="mt-5 text-sm opacity-90">
    Rejected Applications
  </p>

  <h3 className="text-2xl font-bold">
    {stats.rejectedApplications}
  </h3>

</div>

    </div>
  );
}

export default DashboardStats;