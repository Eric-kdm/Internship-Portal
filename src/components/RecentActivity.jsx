import { useEffect, useState } from "react";

function RecentActivity() {

  const [activities, setActivities] = useState([]);

  const formatTime = (date) => {

  const seconds =
    Math.floor((new Date() - new Date(date)) / 1000);

  const minutes = Math.floor(seconds / 60);

  const hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  if (seconds < 60)
    return "Just now";

  if (minutes < 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  if (hours < 24)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  if (days === 1)
    return "Yesterday";

  if (days < 7)
    return `${days} days ago`;

  return new Date(date).toLocaleDateString();
};

  useEffect(() => {

  const fetchActivities = async () => {

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
        setActivities(data.activities || []);
      }

    } catch (error) {

      console.error(error);

    }

  };

  fetchActivities();

}, []);

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm h-full">

      <h2 className="text-3xl font-bold mb-8">
        Recent Activity
      </h2>

      <div className="space-y-8">

        {activities.length === 0 ? (

  <p className="text-gray-500">
    No recent activity.
  </p>

) : (

  activities.map((activity, index) => (

    <div
      key={index}
      className="flex gap-4"
    >

      <div
        className={`w-3 h-3 rounded-full mt-2 ${
          activity.type === "application"
            ? "bg-blue-600"
            : "bg-green-500"
        }`}
      ></div>

      <div>

        <h4 className="font-semibold">
          {activity.title}
        </h4>

        <p className="text-sm text-gray-500">
          {activity.message}
        </p>

        <p className="text-xs text-gray-400 mt-2 uppercase">
  {formatTime(activity.createdAt)}
</p>

      </div>

    </div>

  ))

)}

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