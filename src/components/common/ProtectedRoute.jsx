import { Navigate } from "react-router-dom";

// Wrap any route that requires the user to be logged in.
// Usage: <Route path="/x" element={<ProtectedRoute><X /></ProtectedRoute>} />
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
