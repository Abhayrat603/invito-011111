
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/main-layout";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function EditEmailPage() {
  const { user, updateUserEmail } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.email === user?.email) {
        toast({
            variant: "destructive",
            title: "No Change Detected",
            description: "The new email is the same as the current one.",
        });
        return;
    }
    try {
      await updateUserEmail(values.email);
      toast({
        title: "Email Update Pending",
        description: "A verification link has been sent to your new email address. Please verify to complete the change.",
      });
      router.push("/profile/settings");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "Could not update your email. You may need to log in again.",
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
            <h1 className="text-xl font-bold text-center flex-grow">Change Email</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-grow p-4">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Update Your Email</CardTitle>
                  <CardDescription>A verification link will be sent to your new email address to confirm the change.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Enter your new email" {...field} className="pl-10" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : "Update Email"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
