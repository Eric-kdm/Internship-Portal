import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardStats from "../Components/DashboardStats";
import ActiveInternships from "../Components/ActiveInternships";
import RecentActivity from "../Components/RecentActivity";
import FeaturedBanner from "../Components/FeaturedBanner";
import DashboardFooter from "../Components/DashboardFooter";

function OrganizationDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <DashboardHeader />

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mt-6">

          <button
            onClick={() =>
              navigate("/my-posted-internships")
            }
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            My Posted Internships
          </button>

        </div>

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