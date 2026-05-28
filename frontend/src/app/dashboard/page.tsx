import AdminPage from "../admin-page/adminPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  );
}
