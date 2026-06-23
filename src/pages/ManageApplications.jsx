import { useState } from "react";

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

  const candidates = [
    {
      name: "Elena Vance",
      degree: "Master of Architecture, MIT",
      status: "Under Review",
      role: "Lead Architect",
      skills: ["Revit", "Sustainable Design"],
    },
    {
      name: "Marcus Thorne",
      degree: "B.Arch, Cooper Union",
      status: "Shortlisted",
      role: "BIM Specialist",
      skills: ["Rhino 3D", "Parametric Design"],
    },
    {
      name: "Sarah Jenkins",
      degree: "PhD Architecture, ETH Zurich",
      status: "Approved",
      role: "Lead Architect",
      skills: ["Urban Planning", "ArcGIS"],
    },
    {
      name: "Leo Zhang",
      degree: "B.S Design, RISD",
      status: "Rejected",
      role: "Junior Designer",
      skills: ["SketchUp", "Photoshop"],
    },
    {
      name: "Maya Patel",
      degree: "M.Arch, Bartlett School",
      status: "Under Review",
      role: "Junior Designer",
      skills: ["Grasshopper", "V-Ray"],
    },
  ];

  const filteredCandidates = candidates.filter(
    (candidate) => {
      const matchesTab =
        activeTab === "All"
          ? true
          : candidate.status === activeTab;

      const matchesSearch =
        candidate.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesRole =
        selectedRole === "All Roles"
          ? true
          : candidate.role === selectedRole;

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
              (candidate, index) => (
                <CandidateCard
                  key={index}
                  name={candidate.name}
                  degree={candidate.degree}
                  status={candidate.status}
                  skills={candidate.skills}
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