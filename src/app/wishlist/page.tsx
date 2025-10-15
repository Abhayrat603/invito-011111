
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
    const router = useRouter();
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          <header className="p-4 flex items-center border-b">
             <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-center flex-grow">Wishlist</h1>
            <div className="w-10"></div>
          </header>

          <main className="flex-grow p-4">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Your wishlist is empty.</p>
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
