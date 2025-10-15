
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import Image from "next/image";
import { HelpCircle, LogOut, ChevronRight, Camera, Pencil, Shield, FileText, Info, Mail, UserCog, Sparkles, History, Edit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { ImageCropper, getCroppedImg } from "@/components/image-cropper";
import type { Area } from 'react-easy-crop';

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
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);

    const handleCameraClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToCrop(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        // Reset file input to allow re-selection of the same file
        if(event.target) {
            event.target.value = "";
        }
    };

    const onCropComplete = useCallback(async (croppedAreaPixels: Area) => {
        if (imageToCrop) {
            try {
                const croppedImageBlobUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);
                // To properly display and save, convert blob URL to data URL
                const response = await fetch(croppedImageBlobUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = async () => {
                    const base64data = reader.result as string;
                    await updateUserProfilePicture(base64data);
                    toast({
                        title: "Profile Picture Updated",
                        description: "Your new profile picture has been saved.",
                    });
                     // Revoke the blob URL to free up memory
                    URL.revokeObjectURL(croppedImageBlobUrl);
                };
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Update Failed",
                    description: error.message || "Could not update profile picture.",
                });
            } finally {
                setImageToCrop(null);
            }
        }
    }, [imageToCrop, updateUserProfilePicture, toast]);

    const isAdmin = user?.email === 'abhayrat603@gmail.com';


  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full mx-auto bg-background text-foreground flex flex-col">
          <header className="p-4 flex items-center justify-center">
            <h1 className="text-xl font-bold text-center flex-grow">Profile</h1>
          </header>

          <main className="flex-grow p-4">
            <ImageCropper 
              image={imageToCrop}
              onCropComplete={onCropComplete}
              onClose={() => setImageToCrop(null)}
            />
            <div className="flex flex-col items-center">
                <div className="relative mb-4">
                    <Image
                        src={user?.photoURL || "https://picsum.photos/seed/profile-pic/200/200"}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="rounded-full border-4 border-card object-cover w-32 h-32"
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
                
                {user?.displayName && <h2 className="text-2xl font-bold">{user.displayName}</h2>}


                <div className="w-full space-y-2 mt-6">
                    {isAdmin && (
                        <div className="mb-4">
                            <ProfileMenuItem icon={UserCog} text="Admin Panel" href="/admin" />
                        </div>
                    )}
                    <ProfileMenuItem icon={Pencil} text="Edit Profile" href="/profile/edit" />
                    <ProfileMenuItem icon={Sparkles} text="Help with AI" href="/ai-help" />
                    <ProfileMenuItem icon={History} text="History" href="/history" />
                    <ProfileMenuItem icon={Edit} text="Request For Edit" href="/request-edit" />
                    <ProfileMenuItem icon={HelpCircle} text="Help Center" href="/help-center" />
                    
                    <div className="pt-2">
                        <ProfileMenuItem icon={Shield} text="Privacy Policy" href="/privacy-policy"/>
                    </div>
                    <ProfileMenuItem icon={FileText} text="Terms & Conditions" href="/terms-and-conditions"/>
                    <ProfileMenuItem icon={Info} text="About Us" href="/about-us"/>
                    <ProfileMenuItem icon={Mail} text="Contact Us" href="/contact-us" />

                    <div className="pt-4">
                        <ProfileMenuItem icon={LogOut} text="Log Out" onClick={signOut} isLogout />
                    </div>
                </div>
            </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
