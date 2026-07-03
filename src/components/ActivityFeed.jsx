function ActivityFeed({ activity, time, color }) {
  return (
    <div className="flex gap-4 items-start">

      {/* Dot */}
      <div
        className={`w-3 h-3 rounded-full mt-2 ${color}`}
      ></div>

      {/* Text */}
      <div>

        <p className="font-semibold text-gray-800">
          {activity}
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {time}
        </p>

      </div>

    </div>
  );
}

export default ActivityFeed;