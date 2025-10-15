"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

type AuthRedirectProps = {
  to: string;
  condition: "is-auth" | "is-not-auth";
  children: React.ReactNode;
};

export function AuthRedirect({ to, condition, children }: AuthRedirectProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (condition === "is-auth" && user) {
        router.push(to);
      }
      if (condition === "is-not-auth" && !user) {
        router.push(to);
      }
    }
  }, [user, loading, router, to, condition]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-8 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if ((condition === "is-auth" && user) || (condition === "is-not-auth" && !user)) {
    return null; // or a loading spinner, as redirect is in progress
  }

  return <>{children}</>;
}
