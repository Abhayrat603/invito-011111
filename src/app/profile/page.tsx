
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import Image from "next/image";
import { User, Bell, Settings, HelpCircle, LogOut, ChevronRight, Camera, Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const ProfileMenuItem = ({ icon: Icon, text, href, onClick, isLogout = false, className }: { icon: React.ElementType, text: string, href?: string, onClick?: () => void, isLogout?: boolean, className?: string }) => {
  const content = (
    <div 
        className={cn("flex items-center w-full bg-card p-4 rounded-xl shadow-sm", isLogout ? "text-destructive" : "text-foreground", className)}
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
    const { signOut, user, updateUserProfilePicture } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleCameraClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await updateUserProfilePicture(file);
                toast({
                    title: "Profile Picture Updated",
                    description: "Your new profile picture has been saved.",
                });
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Update Failed",
                    description: error.message || "Could not update profile picture.",
                });
            }
        }
    };


  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full mx-auto bg-background text-foreground flex flex-col">
          <header className="p-4 flex items-center justify-center">
            <h1 className="text-xl font-bold text-center flex-grow">Profile</h1>
          </header>

          <main className="flex-grow p-4">
            <div className="flex flex-col items-center">
                <div className="relative mb-4">
                    <Image
                        src={user?.photoURL || "https://picsum.photos/seed/profile-pic/200/200"}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="rounded-full border-4 border-card object-cover"
                        data-ai-hint="man portrait"
                        key={user?.photoURL} // Add key to force re-render on URL change
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <Button variant="ghost" size="icon" className="absolute bottom-1 right-1 bg-white/80 hover:bg-white rounded-full h-9 w-9 shadow-md" onClick={handleCameraClick}>
                        <Camera className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
                
                {user?.displayName && <h2 className="text-2xl font-bold mb-6">{user.displayName}</h2>}

                <div className="w-full">
                    <div className="mb-2">
                        <ProfileMenuItem icon={Pencil} text="Edit Profile" href="/profile/edit" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={Bell} text="Notifications" href="#" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={Settings} text="Settings" href="/profile/settings" />
                    </div>
                    <div className="mb-4">
                        <ProfileMenuItem icon={HelpCircle} text="Help Center" href="#" />
                    </div>
                    <ProfileMenuItem icon={LogOut} text="Log Out" onClick={signOut} isLogout />
                </div>
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
