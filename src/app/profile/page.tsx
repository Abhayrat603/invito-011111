
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Bell, Settings, HelpCircle, LogOut, ChevronRight, Camera } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProfileMenuItem = ({ icon: Icon, text, href, onClick, isLogout = false }: { icon: React.ElementType, text: string, href?: string, onClick?: () => void, isLogout?: boolean }) => {
  const content = (
    <div 
        className={cn("flex items-center w-full bg-card p-4 rounded-xl shadow-sm", isLogout ? "text-destructive" : "text-foreground")}
        onClick={onClick}
    >
        <Icon className={cn("h-6 w-6 mr-4", isLogout ? "text-destructive/80" : "text-primary")} />
        <span className="font-medium flex-grow">{text}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return <div className="cursor-pointer">{content}</div>;
};

export default function ProfilePage() {
    const router = useRouter();
    const { signOut, user } = useAuth();

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full mx-auto bg-background text-foreground flex flex-col">
          <header className="p-4 flex items-center justify-center">
            <h1 className="text-xl font-bold text-center flex-grow">Profile</h1>
          </header>

          <main className="flex-grow p-4">
            <div className="flex flex-col items-center">
                <div className="relative mb-6">
                    <Image
                        src={user?.photoURL || "https://picsum.photos/seed/profile-pic/200/200"}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="rounded-full border-4 border-card object-cover"
                        data-ai-hint="man portrait"
                    />
                    <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 bg-white/80 hover:bg-white rounded-full h-9 w-9 shadow-md">
                        <Camera className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>

                <div className="w-full space-y-4">
                    <ProfileMenuItem icon={User} text="My Account" href="#" />
                    <ProfileMenuItem icon={Bell} text="Notifications" href="#" />
                    <ProfileMenuItem icon={Settings} text="Settings" href="#" />
                    <ProfileMenuItem icon={HelpCircle} text="Help Center" href="#" />
                    <ProfileMenuItem icon={LogOut} text="Log Out" onClick={signOut} isLogout />
                </div>
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
