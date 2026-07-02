import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrganizationIdentity from "../components/OrganizationIdentity";
import ProfessionalDetails from "../components/ProfessionalDetails";
import AdditionalInfo from "../components/AdditionalInfo";
import ContactVerification from "../components/ContactVerification";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function OrganizationProfileSetup() {
  const [formData, setFormData] = useState({
  organizationName: "",
  organizationType: "",
  industry: "",
  workforceSize: "",
  headquarters: "",
  website: "",
  linkedin: "",
  bio: "",
  contactName: "",
  email: "",
  phone: "",
  logo: null,
  profileCompleted: false,
});
const isEditMode = formData.profileCompleted;
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({
          organizationName: data.user.companyName || "",
          organizationType: data.user.organizationType || "",
          industry: data.user.industry || "",
          workforceSize: data.user.workforceSize || "",
          headquarters: data.user.headquarters || "",
          website: data.user.website || "",
          linkedin: data.user.linkedin || "",
          bio: data.user.bio || "",
          contactName: data.user.contactName || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          logo: null,
          profileCompleted: data.user.profileCompleted,
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);
  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-2">
  {isEditMode
    ? "Organization Profile"
    : "Organization Profile Setup"}
</h1>

          <p className="text-gray-600 mb-10">
  {isEditMode
    ? "Update your organization information."
    : "Define your editorial presence and establish your brand architecture."}
</p>

          <div className="grid grid-cols-12 gap-8">

            <div className="col-span-8 space-y-8">
              <OrganizationIdentity
                formData={formData}
                setFormData={setFormData}
              />
              <ProfessionalDetails
                formData={formData}
                setFormData={setFormData}
              />
              <AdditionalInfo
                formData={formData}
                setFormData={setFormData}
              />
              <ContactVerification
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            <div className="col-span-4">
              <Sidebar />
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrganizationProfileSetup;