function ProgressBar({
  step,
  percentage,
  title,
}) {
  return (
    <div className="mb-12">

      <div className="flex justify-between items-center mb-4">

        <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
          Step {step} of 5 : {title}
        </span>

        <span className="text-xs font-bold text-gray-500">
          {percentage}% Completed
        </span>

      </div>

      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>
  );
}

export default ProgressBar;