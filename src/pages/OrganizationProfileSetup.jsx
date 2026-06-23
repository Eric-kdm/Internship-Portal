import Navbar from "../components/Navbar";
import OrganizationIdentity from "../components/OrganizationIdentity";
import ProfessionalDetails from "../components/ProfessionalDetails";
import AdditionalInfo from "../components/AdditionalInfo";
import ContactVerification from "../components/ContactVerification";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function OrganizationProfileSetup() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-100 min-h-screen pt-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-3xl font-bold mb-2">
            Organization Profile Setup
          </h1>

          <p className="text-gray-600 mb-10">
            Define your editorial presence and establish your brand architecture.
          </p>

          <div className="grid grid-cols-12 gap-8">

            <div className="col-span-8 space-y-8">
              <OrganizationIdentity />
              <ProfessionalDetails />
              <AdditionalInfo />
              <ContactVerification />
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