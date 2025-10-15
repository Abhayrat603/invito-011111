
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
import { Loader2, Phone, ArrowLeft } from "lucide-react";
import { MainLayout } from "@/components/main-layout";

const formSchema = z.object({
  phone: z.string().length(10, { message: "Please enter a valid 10-digit phone number." }),
});

export default function EditPhonePage() {
  const { user, updateUserPhoneNumber } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user?.phoneNumber?.slice(-10) || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Note: In a real app, full E.164 format with country code is needed.
      await updateUserPhoneNumber(`+91${values.phone}`);
      toast({
        title: "Phone Number Update Requested",
        description: "In a real app, a verification code would be sent to complete this change.",
      });
      router.push("/profile/edit");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "Could not update your phone number.",
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
            <h1 className="text-xl font-bold text-center flex-grow">Change Phone Number</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-grow p-4">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Update Your Phone Number</CardTitle>
                  <CardDescription>Enter your new phone number below. A verification code will be sent to confirm the change.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Phone Number</FormLabel>
                            <FormControl>
                                <div className="relative flex items-center bg-transparent rounded-lg border border-input h-12 px-4 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                   <span className="text-foreground pl-8 pr-2">+91</span>
                                   <Input placeholder="Phone Number" {...field} className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground" />
                                </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : "Update Phone Number"}
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
