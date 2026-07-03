import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import StudentProfileSetup from "./pages/StudentProfileSetup";
import StudentDashboard from "./pages/StudentDashboard";
import MyApplications from "./pages/MyApplications";
import InternshipListings from "./pages/InternshipListings";
import InternshipDetails from "./pages/InternshipDetails";
import ApplyInternship from "./pages/ApplyInternship";
import SavedInternships from "./pages/SavedInternships";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import WelcomeSuccess from "./pages/WelcomeSuccess";
import SessionExpired from "./pages/SessionExpired";
import HelpCenter from "./pages/HelpCenter";
import ContactLegal from "./pages/ContactLegal";
import Settings from "./pages/Settings";
import PostResume from "./pages/PostResume";
import PublicStudentProfile from "./pages/PublicStudentProfile";
import SelfAssessment from "./pages/SelfAssessment";
import TaskManagement from "./pages/TaskManagement";
import CertificatePreview from "./pages/CertificatePreview";
import AttendanceLeave from "./pages/AttendanceLeave";
import PerformanceEvaluation from "./pages/PerformanceEvaluation";
import Message from "./pages/Message";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/welcome" element={<WelcomeSuccess />} />
        <Route path="/session-expired" element={<SessionExpired />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/contact" element={<ContactLegal />} />

        {/* Protected — student must be logged in */}
        <Route
          path="/student-profile"
          element={
            <ProtectedRoute>
              <StudentProfileSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internships"
          element={
            <ProtectedRoute>
              <InternshipListings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/internshipsdetails/:id"
          element={
            <ProtectedRoute>
              <InternshipDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-internship/:id"
          element={
            <ProtectedRoute>
              <ApplyInternship />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-internships"
          element={
            <ProtectedRoute>
              <SavedInternships />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-resume"
          element={
            <ProtectedRoute>
              <PostResume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public-profile"
          element={
            <ProtectedRoute>
              <PublicStudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/self-assessment"
          element={
            <ProtectedRoute>
              <SelfAssessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-management"
          element={
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate"
          element={
            <ProtectedRoute>
              <CertificatePreview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-leave"
          element={
            <ProtectedRoute>
              <AttendanceLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/performance-evaluation"
          element={
            <ProtectedRoute>
              <PerformanceEvaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Message />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
