import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import OrganizationProfileSetup from "./pages/OrganizationProfileSetup";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import ManageApplications from "./pages/ManageApplications";
import PostInternshipStep1 from "./pages/PostInternshipStep1";
import PostInternshipStep2 from "./pages/PostInternshipStep2";
import PostInternshipStep3 from "./pages/PostInternshipStep3";
import PostInternshipReview from "./pages/PostInternshipReview";
import PostInternshipSuccess from "./pages/PostInternshipSuccess";
import MyPostedInternships from "./pages/MyPostedInternships";
import InternshipDetails from "./pages/InternshipDetails";
import EditInternship from "./pages/EditInternship";
import OrganizationSettings from "./pages/OrganizationSettings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/organization-profile-setup"
          element={<OrganizationProfileSetup />}
        />

        <Route
          path="/organization-dashboard"
          element={<OrganizationDashboard />}
        />

        {/* Manage Applications */}
        <Route
          path="/manage-applications"
          element={<ManageApplications />}
        />

        {/* Post Internship Step 1 */}
        <Route
          path="/post-internship"
          element={<PostInternshipStep1 />}
        />

        <Route
          path="/post-internship/requirements"
          element={<PostInternshipStep2 />}
        />

        <Route
          path="/post-internship/details"
          element={<PostInternshipStep3 />}
        />

        <Route
          path="/post-internship/review"
          element={<PostInternshipReview />}
        />

        <Route
          path="/post-internship/success"
          element={<PostInternshipSuccess />}
        />

        <Route
          path="/my-posted-internships"
          element={<MyPostedInternships />}
        />

        <Route
          path="/internship-details"
          element={<InternshipDetails />}
        />

        <Route
          path="/edit-internship"
          element={<EditInternship />}
        />

        <Route
          path="/organization-settings"
          element={<OrganizationSettings />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;