
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthRedirect } from "@/components/auth-redirect";
import { Loader2, User, ArrowLeft, Mail, Lock, ChevronRight, Phone, Camera } from "lucide-react";
import { MainLayout } from "@/components/main-layout";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageCropper from "@/components/image-cropper";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const SettingsMenuItem = ({ icon: Icon, text, href, className }: { icon: React.ElementType, text: string, href: string, className?: string }) => {
  return (
    <Link href={href} className={cn("w-full", className)}>
      <div className="flex items-center bg-card p-4 rounded-lg shadow-sm hover:bg-accent transition-colors">
        <Icon className="h-6 w-6 mr-4 text-primary" />
        <span className="font-medium flex-grow text-foreground">{text}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </Link>
  );
};

export default function EditProfilePage() {
  const { user, updateUserProfile, updateUserProfilePicture } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.displayName || "",
    },
  });
  
  React.useEffect(() => {
    if (user) {
      form.reset({ name: user.displayName || "" });
    }
  }, [user, form]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setIsCropperOpen(true);
    }
  };

  const handleProfilePictureChange = async (croppedImage: Blob) => {
    if (!user) return;
    try {
      await updateUserProfilePicture(croppedImage);
      toast({
        title: "Profile Picture Updated",
        description: "Your new profile picture has been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message,
      });
    }
    setIsCropperOpen(false);
    setImage(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateUserProfile({ displayName: values.name });
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "Could not update your profile.",
      });
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

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col">
          <main className="flex-grow p-4">
              <div className="space-y-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-card object-cover">
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback className="text-4xl bg-primary/20 text-primary">
                              {getUserInitials(user?.displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <label htmlFor="profile-picture-upload" className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                          <Camera className="h-4 w-4" />
                          <input id="profile-picture-upload" type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">Click the camera icon to upload a new photo. Recommended: a square image (e.g., 400x400px).</p>
                    </div>
                  </div>
                 {image && (
                  <ImageCropper
                    image={image}
                    onCropComplete={handleProfilePictureChange}
                    onClose={() => {
                      setIsCropperOpen(false);
                      setImage(null);
                    }}
                    isOpen={isCropperOpen}
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold mb-4">Update Your Name</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Enter your name" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : "Save Name"}
                      </Button>
                    </form>
                  </Form>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                  <div className="space-y-2">
                      <SettingsMenuItem icon={Mail} text="Change Email" href="/profile/settings/email" />
                      <div className="pb-2">
                        <SettingsMenuItem icon={Lock} text="Change Password" href="/profile/settings/password" />
                      </div>
                      <SettingsMenuItem icon={Phone} text="Change Phone Number" href="/profile/settings/phone" />
                  </div>
                </div>
              </div>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
