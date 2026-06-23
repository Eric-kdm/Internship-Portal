function PostInternshipSidebar() {
  return (
    <div className="space-y-6">

      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">

        <div className="text-blue-600 text-3xl mb-4">
          💡
        </div>

        <h3 className="text-lg font-bold mb-2">
          Internship Tip
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed">
          A clear and attractive internship title helps
          students understand the opportunity and
          increases quality applications.
        </p>

      </div>

      <div className="bg-gray-100 p-6 rounded-xl">

        <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
          Preview Draft
        </h4>

        <div className="space-y-3 opacity-60">

          <div className="h-4 w-3/4 bg-gray-300 rounded-full"></div>

          <div className="h-4 w-full bg-gray-300 rounded-full"></div>

          <div className="h-24 w-full bg-gray-300 rounded-lg"></div>

        </div>

      </div>

    </div>
  );
}

export default PostInternshipSidebar;