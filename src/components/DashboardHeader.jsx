import { useEffect, useState } from "react";

function DashboardHeader({ profile }) {

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {

    const fetchNotifications = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/notifications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setNotifications(data.notifications);
        }

      } catch (error) {
        console.error(error);
      }

    };

    fetchNotifications();

  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
  Welcome, {profile?.companyName || "Organization"}
</h1>

        <p className="text-gray-500 mt-1">
  {profile?.industry || "Manage your internships and recruitment."}
</p>
      </div>

      <div className="flex items-center gap-4 mt-4 md:mt-0">

        <div className="relative">

  <div
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
  >
    🔔

    {notifications.filter((n) => !n.isRead).length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {notifications.filter((n) => !n.isRead).length}
      </span>
    )}

  </div>

  {showNotifications && (

    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50">

      <div className="p-4 border-b font-bold">
        Notifications
      </div>

      {notifications.length === 0 ? (

        <div className="p-5 text-center text-gray-500">
          No notifications
        </div>

      ) : (

        notifications.map((notification) => (

          <div
            key={notification._id}
            className="p-4 border-b hover:bg-gray-50"
          >

            <p className="text-sm">
              {notification.message}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

          </div>

        ))

      )}

    </div>

  )}

</div>

      </div>

    </div>
  );
}

export default DashboardHeader;