import { useState } from "react";
import { FaBell } from "react-icons/fa";
function DashboardCard({ title, value, status }) {
  const [showNotifications, setShowNotifications] =
  useState(false);
  return (
  <div className="flex items-center gap-6">

  <button>Home</button>

  <button>Dashboard</button>

  <button>Profile</button>

  <div className="relative">

    <button
      onClick={() =>
        setShowNotifications(
          !showNotifications
        )
      }
      className="text-xl"
    >
      <FaBell />
    </button>

    {showNotifications && (

      <div className="absolute right-0 mt-3 w-72 bg-white text-black rounded-2xl shadow-lg p-4 z-50">

        <h3 className="font-bold mb-3">
          Notifications
        </h3>

        <div className="space-y-3 text-sm">

          <p>
            ✅ Application submitted successfully
          </p>

          <p>
            🔖 Internship saved successfully
          </p>

          <p>
            🎉 Application shortlisted
          </p>

        </div>

        <button className="mt-4 text-blue-600 font-semibold">
          View All
        </button>

      </div>

    )}

  </div>

</div>
  );
}

export default DashboardCard;