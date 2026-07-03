function ReportTypeCard({ icon, title, active }) {
  return (
    <button
      className={`
        flex flex-col items-center justify-center
        p-8 rounded-2xl transition-all
        ${
          active
            ? "bg-blue-600 text-white shadow-xl"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
      `}
    >

      <div className="text-4xl mb-4">
        {icon}
      </div>

      <p className="font-bold text-lg text-center">
        {title}
      </p>

    </button>
  );
}

export default ReportTypeCard;