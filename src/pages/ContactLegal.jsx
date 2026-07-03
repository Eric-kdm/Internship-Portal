import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function ContactLegal() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.message) newErrors.message = "Please enter a message.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // NOTE: There's no /api/contact endpoint on the backend yet — this
    // submission is UI-only for now.
    setSubmitted(true);
  };

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

      <main className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* LEFT — CONTACT INFO */}
        <div>
          <h1 className="text-5xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-gray-500 text-lg mb-10">
            Questions, feedback, or something not working right? We'd love to
            hear from you.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaEnvelope className="text-blue-700" />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-500">support@internhub.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaPhone className="text-blue-700" />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-500">+1 (555) 000-1234</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-blue-700" />
              </div>
              <div>
                <p className="font-semibold">Office</p>
                <p className="text-gray-500">Remote-first, worldwide</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-3">Legal</h3>
            <div className="flex gap-6 text-blue-700 font-semibold">
              <button onClick={() => navigate("/terms")} className="hover:underline">
                Terms of Service
              </button>
              <button
                onClick={() => navigate("/privacy-policy")}
                className="hover:underline"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — CONTACT FORM */}
        <div className="bg-white rounded-[32px] shadow-lg p-10">
          {submitted ? (
            <div className="text-center py-10">
              <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
              <p className="text-gray-500 mb-8">
                Thanks for reaching out — we'll get back to you soon.
              </p>
              <button
                onClick={() => navigate("/student-dashboard")}
                className="px-8 py-3 bg-blue-700 text-white rounded-full font-semibold hover:bg-blue-800 transition"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="text-3xl font-bold mb-2">Send us a message</h2>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-100 rounded-xl px-4 py-4 outline-none resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-700 text-white rounded-full font-bold hover:bg-blue-800 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

export default ContactLegal;
