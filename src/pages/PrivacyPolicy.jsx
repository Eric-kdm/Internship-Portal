import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaDatabase,
  FaChartBar,
  FaFileAlt,
  FaCookieBite,
  FaShieldAlt,
  FaUserCog,
  FaSyncAlt,
  FaEnvelope,
} from "react-icons/fa";

const SECTIONS = [
  {
    id: "collect",
    icon: FaDatabase,
    title: "Information We Collect",
    body: `When you create an account, we collect information such as your name,
    email address, and password. Students may also provide education details,
    skills, resumes, and project information. Organizations provide company
    name, work email, and website.`,
  },
  {
    id: "use",
    icon: FaChartBar,
    title: "How We Use Your Information",
    body: `We use your information to operate InternHub — matching students with
    internships, allowing organizations to review applications, and improving
    the platform. We do not sell your personal information to third parties.`,
  },
  {
    id: "resume",
    icon: FaFileAlt,
    title: "Resume & Profile Data",
    body: `Resumes and profile details you submit are shared only with organizations
    you apply to, or that you make your profile visible to. You can update or
    remove this information from your account at any time.`,
  },
  {
    id: "cookies",
    icon: FaCookieBite,
    title: "Cookies & Local Storage",
    body: `InternHub uses local storage and cookies to keep you signed in and to
    remember preferences such as saved internships. These do not track you
    across other websites.`,
  },
  {
    id: "security",
    icon: FaShieldAlt,
    title: "Data Security",
    body: `We take reasonable technical measures — including password hashing and
    authenticated API access — to protect your data. No system is completely
    secure, so we encourage you to use a strong, unique password.`,
  },
  {
    id: "rights",
    icon: FaUserCog,
    title: "Your Rights",
    body: `You may request access to, correction of, or deletion of your personal
    data at any time by contacting us. You may also delete your account
    directly from your profile settings.`,
  },
  {
    id: "changes",
    icon: FaSyncAlt,
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy periodically. We'll update the "last
    updated" date at the top of this page whenever changes are made.`,
  },
  {
    id: "contact",
    icon: FaEnvelope,
    title: "Contact",
    body: `For any privacy-related questions, contact us at privacy@internhub.com
    or visit our Contact page.`,
  },
];

function PrivacyPolicy() {
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
          <h1 className="text-5xl font-extrabold mb-4">Privacy Policy</h1>
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
            Your privacy matters to us. This policy explains what information
            InternHub collects, how it's used, and the choices you have.
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
              Have questions about how we handle your data?
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

export default PrivacyPolicy;
