function SystemWidget({ title, value, status, width, color }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">

        <div
          className={`h-full ${color}`}
          style={{ width: width }}
        ></div>

      </div>

      <div className="flex justify-between items-center">

        <p className="text-gray-500 font-medium">
          {value}
        </p>

        <p className="font-bold text-green-600">
          {status}
        </p>

      </div>

    </div>
  );
}

export default SystemWidget;