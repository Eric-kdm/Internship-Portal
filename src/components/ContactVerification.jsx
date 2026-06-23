import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContactVerification() {
  const navigate = useNavigate();

  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleCompleteSetup = () => {
    if (
      !contactName.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    localStorage.setItem(
      "organizationContact",
      JSON.stringify({
        contactName,
        email,
        phone,
      })
    );

    navigate("/organization-dashboard")
  };

  return (
    <section className="bg-white p-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Contact Verification
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Primary Contact Name
          </label>

          <input
            type="text"
            value={contactName}
            onChange={(e) =>
              setContactName(e.target.value)
            }
            placeholder="First and Last Name"
            className="w-full p-3 rounded-lg bg-gray-100 border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Work Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="email@company.com"
            className="w-full p-3 rounded-lg bg-gray-100 border"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="+91 9876543210"
            className="w-full p-3 rounded-lg bg-gray-100 border"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">

        <button
          type="button"
          className="px-6 py-3 border rounded-lg hover:bg-gray-100"
        >
          Save Draft
        </button>

        <button
          type="button"
          onClick={handleCompleteSetup}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Complete Setup
        </button>

      </div>

    </section>
  );
}

export default ContactVerification;