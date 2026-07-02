
import { useEffect, useState } from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardStats from "../Components/DashboardStats";
import ActiveInternships from "../Components/ActiveInternships";
import RecentActivity from "../Components/RecentActivity";
import FeaturedBanner from "../Components/FeaturedBanner";
import DashboardFooter from "../Components/DashboardFooter";

function OrganizationDashboard() {
 
  const [profile, setProfile] = useState(null);

  useEffect(() => {
  window.scrollTo(0, 0);

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
        setProfile(data.user);
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <DashboardSidebar profile={profile} />

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <DashboardHeader profile={profile} />

        {/* Quick Actions */}
        

        {/* Stats Section */}
        <div className="mt-8">
          <DashboardStats />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mt-8">

          {/* Active Internships */}
          <div className="lg:col-span-8">
            <ActiveInternships />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-4">
            <RecentActivity />
          </div>

        </div>

        {/* Featured Banner */}
        <div className="mt-8">
          <FeaturedBanner />
        </div>

        {/* Footer */}
        <DashboardFooter />

      </main>

    </div>
  );
}

export default OrganizationDashboard;