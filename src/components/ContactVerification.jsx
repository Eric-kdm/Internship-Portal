import { useNavigate } from "react-router-dom";

function ContactVerification({ formData, setFormData }) {
  const navigate = useNavigate();


const handleCompleteSetup = async () => {
  if (
    !formData.contactName.trim() ||
    !formData.email.trim() ||
    !formData.phone.trim()
  ) {
    alert("Please fill all fields.");
    return;
  }

  if (!formData.email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  if (formData.phone.length < 10) {
    alert("Please enter a valid phone number.");
    return;
  }

  try {

  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/users/profile",
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        companyName: formData.organizationName,
        website: formData.website,
        organizationType: formData.organizationType,
        industry: formData.industry,
        workforceSize: formData.workforceSize,
        headquarters: formData.headquarters,
        linkedin: formData.linkedin,
        bio: formData.bio,
        contactName: formData.contactName,
        phone: formData.phone,
      }),
    }
  );

  const data = await response.json();

  if (response.ok) {

    alert(data.message);

    if (response.ok) {
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  alert(data.message);

  if (response.ok) {
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  alert(data.message);

  navigate("/organization-dashboard");
}
}

  } else {

    alert(data.message);

  }

} catch (error) {

  console.error(error);

  alert("Server Error");

}
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
            value={formData.contactName}
onChange={(e) =>
  setFormData({
    ...formData,
    contactName: e.target.value,
  })
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
            value={formData.email}
onChange={(e) =>
  setFormData({
    ...formData,
    email: e.target.value,
  })
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
            value={formData.phone}
onChange={(e) =>
  setFormData({
    ...formData,
    phone: e.target.value,
  })
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
          {formData.profileCompleted ? "Update Profile" : "Complete Setup"}
        </button>

      </div>

    </section>
  );
}

export default ContactVerification;