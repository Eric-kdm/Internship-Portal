function FeaturedBanner() {
  return (
    <section className="mt-8 rounded-3xl overflow-hidden bg-gradient-to-r from-black via-blue-950 to-slate-900 text-white">

      <div className="p-12">

        <h2 className="text-5xl font-bold max-w-3xl leading-tight mb-8">
          Boost your internship reach by 3x
          <br />
          with Featured Listings.
        </h2>

        <button className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default FeaturedBanner;