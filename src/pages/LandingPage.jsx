import {
  FaCheckCircle,
  FaArrowRight,
  FaBolt,
  FaChartLine,
  FaGlobe,
  FaShareAlt,
  FaBullhorn,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans overflow-x-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-10">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-extrabold text-blue-700 cursor-pointer"
            >
              InternHub
            </h1>

            <div className="hidden md:flex gap-8 text-sm font-medium">
              <button className="text-blue-600 border-b-2 border-blue-600 pb-1">
                Explore
              </button>

              <button
                onClick={() => navigate("/internships")}
                className="text-gray-500 hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                Internships
              </button>

              <button
                onClick={() => navigate("/register")}
                className="text-gray-500 hover:text-blue-600 hover:scale-105 transition-all duration-300"
              >
                For Organizations
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 font-semibold hover:text-blue-600 transition-all duration-300"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-800 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-28">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              Next-Gen Internship Portal
            </span>

            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight mt-8">
              Your career is a{" "}
              <span className="text-blue-600 italic">masterpiece</span> in
              progress.
            </h1>

            <p className="text-xl text-gray-500 leading-relaxed mt-8 max-w-xl">
              A high-end editorial ecosystem connecting the world's most
              ambitious students with industry-defining organizations.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
              >
                Start Exploring
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full font-semibold bg-white text-blue-600 border hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Post a Role
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
              alt="workspace"
              className="rounded-3xl shadow-2xl rotate-2 object-cover"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <FaCheckCircle className="text-blue-600 text-2xl" />
                <h3 className="font-bold">Curated Opportunities</h3>
              </div>

              <p className="text-sm text-gray-500">
                Only 5% of companies meet our quality standards for
                mentorship and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY STRIP */}
      <section className="py-16 bg-[#f2f4f6]">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm font-bold tracking-[5px] uppercase text-gray-400 mb-12">
            Empowering Talent At Global Leaders
          </p>

          <div className="flex flex-wrap justify-center gap-16 opacity-40 italic font-black text-2xl">
            <span>TECHFLOW</span>
            <span>STRATA</span>
            <span>NEXUS</span>
            <span>QUANTUM</span>
            <span>LUMINA</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          {/* Heading */}
          <div className="text-center mb-24">
            <h2 className="text-5xl font-extrabold">Designed for Two Worlds.</h2>
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
              We bridge the gap between academic brilliance and professional
              excellence.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Student Card */}
            <div className="md:col-span-7 bg-white rounded-3xl p-12 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-4xl font-bold mb-5">The Student Gallery</h3>

              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
                Curate your professional identity. Showcase projects and
                achievements beautifully.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Exclusive Mentorship Access</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span>Editorial Resume Builder</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600" />
                  <span>AI Interview Preparation</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Explore For Students
                <FaArrowRight />
              </button>
            </div>

            {/* Talent Vault */}
            <div className="md:col-span-5 bg-gradient-to-br from-blue-700 to-blue-500 rounded-3xl p-12 text-white flex flex-col justify-between shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div>
                <h3 className="text-4xl font-bold mb-5">The Talent Vault</h3>
                <p className="text-blue-100 text-lg">
                  Find the leaders of tomorrow through curated opportunities.
                </p>
              </div>

              <button
                onClick={() => navigate("/register")}
                className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-full font-bold self-start hover:bg-gray-100 transition-all duration-300"
              >
                Post Opportunities
              </button>
            </div>

            {/* Small feature cards */}
            <div className="md:col-span-4 bg-[#f2f4f6] rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-orange-600 text-2xl" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Verified Only</h4>
              <p className="text-gray-500">
                Every listing is manually vetted for trust.
              </p>
            </div>

            <div className="md:col-span-4 bg-[#f2f4f6] rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <FaBolt className="text-blue-600 text-2xl" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Instant Connect</h4>
              <p className="text-gray-500">
                Direct-to-recruiter messaging channels.
              </p>
            </div>

            <div className="md:col-span-4 bg-[#f2f4f6] rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
                <FaChartLine className="text-green-600 text-2xl" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Growth Tracking</h4>
              <p className="text-gray-500">
                Monitor career progression with analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center">
            <p className="text-3xl italic leading-relaxed max-w-4xl mx-auto">
              "InternHub isn't just a job board; it's a launchpad. The
              editorial quality made my application stand out."
            </p>

            <div className="mt-12 flex flex-col items-center">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="testimonial"
                className="w-20 h-20 rounded-full border-4 border-blue-100 object-cover mb-4"
              />
              <h4 className="font-bold text-xl">Alex Rivera</h4>
              <p className="text-gray-500">
                Product Design Intern at TechFlow
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-[50px] p-20 text-center text-white">
            <h2 className="text-6xl font-extrabold leading-tight">
              Ready to curate your future?
            </h2>

            <p className="text-xl text-blue-100 mt-8 max-w-2xl mx-auto">
              Join over 50,000 students and organizations redefining
              early-career growth.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <button
                onClick={() => navigate("/register")}
                className="px-10 py-5 rounded-full font-bold text-lg bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-white transition-all duration-300"
              >
                Get Started Free
              </button>

              <button
                onClick={() => navigate("/internships")}
                className="px-10 py-5 rounded-full font-bold text-lg bg-blue-600 text-white hover:bg-white hover:text-blue-600 border border-white transition-all duration-300"
              >
                Browse Internships
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2">
              <h2 className="text-2xl font-extrabold text-blue-700 mb-6">
                InternHub
              </h2>

              <p className="text-gray-500 max-w-xs mb-8">
                Elevating internship experience through premium design.
              </p>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaGlobe />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaShareAlt />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaBullhorn />
                </div>
              </div>
            </div>

            {/* Columns */}
            <div>
              <h3 className="font-bold mb-6">Explore</h3>
              <div className="space-y-4 text-gray-500 text-sm">
                <p
                  onClick={() => navigate("/internships")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Find Internships
                </p>
                <p>Top Companies</p>
                <p>Expert Advice</p>
                <p>Success Stories</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6">Company</h3>
              <div className="space-y-4 text-gray-500 text-sm">
                <p>About Us</p>
                <p>Careers</p>
                <p>Press Kit</p>
                <p
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Contact
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6">Legal</h3>
              <div className="space-y-4 text-gray-500 text-sm">
                <p
                  onClick={() => navigate("/privacy-policy")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Privacy Policy
                </p>
                <p
                  onClick={() => navigate("/terms")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Terms Of Service
                </p>
                <p>Cookie Policy</p>
                <p>Security</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6">Support</h3>
              <div className="space-y-4 text-gray-500 text-sm">
                <p
                  onClick={() => navigate("/help-center")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Help Center
                </p>
                <p
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer hover:text-blue-600"
                >
                  Contact Us
                </p>
                <p>Community</p>
                <p>Accessibility</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 InternHub Global Inc. All rights reserved.
            </p>

            <div className="flex gap-8 text-sm font-semibold text-gray-500">
              <p>English (US)</p>
              <p>EUR (€)</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
