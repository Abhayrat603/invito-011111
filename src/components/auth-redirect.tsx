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
        router.replace(to);
      }
      if (condition === "is-not-auth" && !user) {
        router.replace(to);
      }
    }
  }, [user, loading, router, to, condition]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <div className="space-y-4 max-w-sm mx-auto">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if ((condition === "is-auth" && user) || (condition === "is-not-auth" && !user)) {
    return null; // or a loading spinner, as redirect is in progress
  }

  return <>{children}</>;
}
