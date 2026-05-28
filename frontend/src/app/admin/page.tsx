"use client";

import { ProtectedRoute } from "../components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <main>
        <h1>Admin Dashboard</h1>
        <p>Welcome! You are logged in.</p>
      </main>
    </ProtectedRoute>
  );
}
