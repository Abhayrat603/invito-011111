
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import Image from "next/image";
import { HelpCircle, LogOut, ChevronRight, Pencil, Shield, FileText, Info, Mail, UserCog, Sparkles, History, Edit, Download, Share2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    const { signOut, user } = useAuth();
    const { toast } = useToast();

    const handleShare = async () => {
      const shareData = {
        title: "Invite Designer",
        text: "Create and customize beautiful invitation cards for every occasion!",
        url: window.location.origin,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(shareData.url);
          toast({
            title: "Link Copied!",
            description: "The website link has been copied to your clipboard.",
          });
        }
      } catch (error: any) {
        if (error.name === 'AbortError') {
            return;
        }
        try {
            await navigator.clipboard.writeText(shareData.url);
            toast({
                title: "Link Copied!",
                description: "Sharing failed, so the link was copied to your clipboard instead.",
            });
        } catch (copyError) {
             toast({
                variant: "destructive",
                title: "Could not share or copy",
                description: "An unexpected error occurred.",
            });
        }
      }
    };
    
    const getUserInitials = (name: string | null | undefined) => {
      if (!name) return "?";
      const parts = name.split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }

    const isAdmin = user?.email === 'abhayrat603@gmail.com';


  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full mx-auto bg-background text-foreground flex flex-col">
          

          <main className="flex-grow p-4">
            <div className="flex flex-col items-center">
                <div className="relative mb-4">
                    <Avatar className="w-32 h-32 border-4 border-card object-cover">
                       <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                           {getUserInitials(user?.displayName)}
                       </AvatarFallback>
                    </Avatar>
                </div>
                
                {user?.displayName && <h2 className="text-2xl font-bold">{user.displayName}</h2>}
                {user?.email && <p className="text-sm text-muted-foreground">{user.email}</p>}


                <div className="w-full space-y-2 mt-6">
                    {isAdmin && (
                        <div className="mb-2">
                            <ProfileMenuItem icon={UserCog} text="Admin Panel" href="/admin" />
                        </div>
                    )}
                    <ProfileMenuItem icon={Pencil} text="Edit Profile" href="/profile/edit" />
                    <div className="mb-2">
                        <ProfileMenuItem icon={Sparkles} text="Help with AI" href="/ai-help" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={History} text="History" href="/history" />
                    </div>
                     <div className="mb-2">
                        <ProfileMenuItem icon={Download} text="Download Report" href="/profile/report" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={Edit} text="Request For Edit" href="/request-edit" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={HelpCircle} text="Help Center" href="/help-center" />
                    </div>
                    <div className="mb-2">
                        <ProfileMenuItem icon={Share2} text="Share App" onClick={handleShare} />
                    </div>
                    
                    <div className="pt-3">
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
