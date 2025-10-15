
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthRedirect } from "@/components/auth-redirect";
import { Loader2, Mail } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await sendPasswordReset(values.email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your spam folder for instructions to reset your password.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send email",
        description: error.message || "Please check the email and try again.",
      });
    }
  };

  return (
    <AuthRedirect to="/" condition="is-auth">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm">
            <div className="relative h-48 w-full rounded-t-3xl overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/forgot/600/400"
                alt="Forgot Password"
                layout="fill"
                objectFit="cover"
                data-ai-hint="padlock key"
              />
            </div>
            <Card className="rounded-b-3xl shadow-2xl border-none pt-8">
              <CardHeader className="text-center p-8 pb-4">
                 <CardTitle className="text-4xl font-bold font-headline text-primary mb-2">Forgot Password?</CardTitle>
                 <CardDescription className="text-primary/80">No worries, we'll send you reset instructions.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50 opacity-50" />
                              <Input placeholder="Enter your email" {...field} className="bg-transparent rounded-lg border-primary/50 text-primary placeholder:text-primary/50 h-12 pl-12 pr-4 focus-visible:ring-primary/50" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-destructive/80 text-xs"/>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-lg h-12 text-base bg-primary/90 hover:bg-primary text-primary-foreground" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                      Send Reset Link
                    </Button>
                  </form>
                </Form>
                 <div className="text-center mt-6">
                    <Link href="/login" className="text-sm text-primary/80 hover:underline">
                        &larr; Back to Log In
                    </Link>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </AuthRedirect>
  );
}
