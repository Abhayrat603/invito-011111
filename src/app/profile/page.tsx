
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";

export default function ProfilePage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          <header className="p-4 border-b">
            <h1 className="text-2xl font-bold text-center">Profile</h1>
          </header>

          <main className="flex-grow p-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Profile content goes here.</p>
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
