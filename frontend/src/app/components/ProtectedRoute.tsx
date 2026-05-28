"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { auth } from "../../lib/firebase";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to login if not authenticated
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  if (isLoading) {
    // Render a simple loading state while checking authentication
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
