import { useState, useEffect } from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import ApplicationsHeader from "../Components/ApplicationsHeader";
import ApplicationsTabs from "../Components/ApplicationsTabs";
import CandidateCard from "../Components/CandidateCard";
import FeaturedMatchCard from "../Components/FeaturedMatchCard";
import ApplicationsFooter from "../Components/ApplicationsFooter";

function ManageApplications() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] =
    useState("All Roles");

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

  const fetchApplicants = async () => {

    try {

      const token = localStorage.getItem("token");

      const internship =
        JSON.parse(localStorage.getItem("selectedInternship"));

      if (!internship?._id) return;

      const response = await fetch(
        `http://localhost:5000/api/applications/internship/${internship._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCandidates(data.applicants);
      } else {
        alert(data.message);
      }

    } catch (error) {

      console.error(error);

    }

  };

  fetchApplicants();

}, []);

  const filteredCandidates = candidates.filter(
    (candidate) => {
      const matchesTab =
  activeTab === "All"
    ? true
    : candidate.status.toLowerCase() ===
      activeTab.toLowerCase();
      const matchesSearch =
        `${candidate.student.firstName} ${candidate.student.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesRole = true;

      return (
        matchesTab &&
        matchesSearch &&
        matchesRole
      );
    }
  );

  return (
    <div className="flex min-h-screen bg-gray-50">

      <DashboardSidebar />

      <main className="flex-1 p-8">

        <div className="max-w-6xl mx-auto">

          <ApplicationsHeader
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
          />

          <ApplicationsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">

            {filteredCandidates.map(
              (candidate) => (
                <CandidateCard
  key={candidate._id}
  applicationId={candidate._id}
  name={`${candidate.student.firstName} ${candidate.student.lastName}`}
  email={candidate.student.email}
  status={candidate.status}
/>
              )
            )}

            <FeaturedMatchCard />

          </div>

          <ApplicationsFooter />

        </div>

      </main>

    </div>
  );
}

export default ManageApplications;