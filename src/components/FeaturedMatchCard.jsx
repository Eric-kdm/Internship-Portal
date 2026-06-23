function FeaturedMatchCard() {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-[2rem] p-8 text-white shadow-2xl hover:-translate-y-2 transition-all">

      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">

        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
          ⭐
        </div>

        <div className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
          Featured Match
        </div>

      </div>

      {/* Content */}
      <h3 className="text-3xl font-bold mb-3">
        Top Talent Alert
      </h3>

      <p className="text-white/90 mb-8 leading-relaxed">
        3 applicants match 100% of your requested skills
        for the BIM Specialist role.
      </p>

      {/* Button */}
      <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition">
        Review Matches
      </button>

    </div>
  );
}

export default FeaturedMatchCard;