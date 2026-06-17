import AdminPage from "./components/AdminPage";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  );
}
