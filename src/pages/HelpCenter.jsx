import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaEnvelope } from "react-icons/fa";

const FAQS = [
  {
    q: "How do I apply for an internship?",
    a: "Browse internships from the Internships tab, open the one you're interested in, and click Apply Now. You'll fill in a short application form and submit it directly to the organization.",
  },
  {
    q: "Can I edit my application after submitting it?",
    a: "Not yet — once an application is submitted it can't be edited. Make sure to review your cover letter and details before submitting.",
  },
  {
    q: "How do I know if an organization has responded?",
    a: "Check the My Applications page — each application shows a live status (Pending, Accepted, or Rejected) as organizations review it.",
  },
  {
    q: "How do I update my profile or resume?",
    a: "Go to Settings or Student Profile from your dashboard sidebar to update your details, or upload a new resume at any time.",
  },
  {
    q: "Is my data shared with every organization?",
    a: "No — your profile and resume are only shared with organizations you actually apply to. See our Privacy Policy for details.",
  },
];

function HelpCenter() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = FAQS.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-700 font-semibold hover:underline"
        >
          Back
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold text-center mb-4">
          How can we help?
        </h1>
        <p className="text-gray-500 text-center text-lg mb-10">
          Search our FAQs or reach out to our support team directly.
        </p>

        <div className="relative mb-12">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-5 py-4 rounded-full bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4 mb-12">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-400">
              No results for "{search}".
            </p>
          ) : (
            filteredFaqs.map((item, index) => (
              <div
                key={item.q}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold"
                >
                  {item.q}
                  <FaChevronDown
                    className={`transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="bg-blue-700 text-white rounded-3xl p-10 text-center">
          <FaEnvelope className="text-3xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-blue-100 mb-6">
            Our support team typically responds within 24 hours.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Contact Support
          </button>
        </div>
      </main>
    </div>
  );
}

export default HelpCenter;
