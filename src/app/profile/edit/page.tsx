
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
import { Loader2, User, ArrowLeft, Mail, Lock, ChevronRight, Phone } from "lucide-react";
import { MainLayout } from "@/components/main-layout";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

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
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col">
          <header className="p-4 flex items-center border-b">
             <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-center flex-grow">Edit Profile</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-grow p-4">
              <div className="space-y-8">
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
                      <SettingsMenuItem icon={Mail} text="Change Email" href="/profile/settings/email" className="mb-2"/>
                      <SettingsMenuItem icon={Lock} text="Change Password" href="/profile/settings/password" className="mb-2"/>
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
