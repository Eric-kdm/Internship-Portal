function MaintenanceWidget() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow relative overflow-hidden">

      <h2 className="text-3xl font-bold mb-4">
        Scheduled Maintenance
      </h2>

      <p className="text-gray-300 leading-relaxed mb-8">
        System upgrade planned for Saturday at 02:00 AM UTC.
        Expect 15 minutes of downtime.
      </p>

      <button className="w-full py-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-all">

        Review Changelog

      </button>

      {/* Background Circle */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>

    </div>
  );
}

export default MaintenanceWidget;