import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaFileContract,
  FaUserCheck,
  FaUserShield,
  FaBriefcase,
  FaExclamationTriangle,
  FaBan,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

const SECTIONS = [
  {
    id: "acceptance",
    icon: FaFileContract,
    title: "Acceptance of Terms",
    body: `By creating an account or using InternHub, you agree to be bound by these
    Terms of Service. If you do not agree with any part of these terms, please
    do not use the platform.`,
  },
  {
    id: "eligibility",
    icon: FaUserCheck,
    title: "Who Can Use InternHub",
    body: `InternHub is available to students seeking internships and organizations
    looking to hire interns. Students must provide accurate information about
    their education and skills. Organizations must provide accurate company
    details and only post legitimate internship opportunities.`,
  },
  {
    id: "account",
    icon: FaUserShield,
    title: "Account Responsibilities",
    body: `You are responsible for maintaining the confidentiality of your account
    credentials and for all activity that occurs under your account. Notify us
    immediately if you suspect any unauthorized use of your account.`,
  },
  {
    id: "listings",
    icon: FaBriefcase,
    title: "Internship Listings",
    body: `Organizations are responsible for the accuracy of the internships they
    post, including role details, compensation, and duration. InternHub does
    not guarantee the outcome of any application and is not a party to any
    agreement between a student and an organization.`,
  },
  {
    id: "acceptable-use",
    icon: FaExclamationTriangle,
    title: "Acceptable Use",
    body: `You agree not to misuse the platform — this includes posting false
    information, spamming applications, attempting to access accounts that
    aren't yours, or using InternHub for any unlawful purpose.`,
  },
  {
    id: "termination",
    icon: FaBan,
    title: "Termination",
    body: `We reserve the right to suspend or terminate accounts that violate these
    terms or engage in fraudulent or harmful activity on the platform.`,
  },
  {
    id: "changes",
    icon: FaSyncAlt,
    title: "Changes to These Terms",
    body: `We may update these Terms of Service from time to time. Continued use of
    InternHub after changes are posted constitutes acceptance of the updated
    terms.`,
  },
  {
    id: "contact",
    icon: FaEnvelope,
    title: "Contact",
    body: `If you have questions about these terms, reach out to us at
    support@internhub.com or visit our Contact page.`,
  },
];

function Terms() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm h-16 flex items-center justify-between px-8">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-700 cursor-pointer"
        >
          InternHub
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 font-semibold hover:text-blue-700 transition"
        >
          <FaArrowLeft />
          Back
        </button>
      </nav>

      {/* HERO */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-500 pt-28 pb-20 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/15 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Legal
          </span>
          <h1 className="text-5xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-blue-100 text-lg">Last updated: July 2, 2026</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-10">
        {/* TABLE OF CONTENTS */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 bg-white rounded-3xl shadow-sm p-6">
            <p className="text-xs font-bold tracking-[2px] uppercase text-gray-400 mb-4">
              On this page
            </p>
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="lg:col-span-9 bg-white rounded-[32px] shadow-lg p-10 lg:p-14">
          <p className="text-gray-500 leading-relaxed mb-12 text-lg">
            These Terms of Service govern your use of InternHub. Please read
            them carefully — they explain what you can expect from us, and
            what we expect from you.
          </p>

          <div className="space-y-14">
            {SECTIONS.map((section, index) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Icon />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {index + 1}. {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed pl-15 lg:pl-[60px]">
                    {section.body}
                  </p>
                </section>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Have questions about these terms?
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Terms;
