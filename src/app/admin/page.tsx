
"use client";

import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const ADMIN_EMAIL = "abhayrat603@gmail.com";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
        <header className="p-4 flex items-center justify-center border-b">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
        </header>
        <main className="flex-grow p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                    <CardDescription>This is your control center. Be careful!</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        You can add admin-specific components and functionality here. This page is only visible to you.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    </MainLayout>
  );
}
