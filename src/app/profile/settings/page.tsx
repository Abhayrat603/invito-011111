
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SettingsMenuItem = ({ icon: Icon, text, href }: { icon: React.ElementType, text: string, href: string }) => {
  return (
    <Link href={href} className="w-full">
      <div className="flex items-center bg-card p-4 rounded-lg shadow-sm hover:bg-accent transition-colors">
        <Icon className="h-6 w-6 mr-4 text-primary" />
        <span className="font-medium flex-grow text-foreground">{text}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  );
};


export default function SettingsPage() {
  const router = useRouter();
  
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col">
          <header className="p-4 flex items-center border-b">
             <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-center flex-grow">Settings</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-grow p-4">
            <div className="space-y-4">
                <SettingsMenuItem icon={User} text="Change Name" href="/profile/edit" />
                <SettingsMenuItem icon={Mail} text="Change Email" href="/profile/settings/email" />
                <SettingsMenuItem icon={Lock} text="Change Password" href="/profile/settings/password" />
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
