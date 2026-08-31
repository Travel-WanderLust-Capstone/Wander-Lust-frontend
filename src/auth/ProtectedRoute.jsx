import { Navigate } from "react-router";
import { useAuth } from "./AuthContext";

//stop someone who is not logged in from opening pages
// that should only be available to authenticated users.
function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
