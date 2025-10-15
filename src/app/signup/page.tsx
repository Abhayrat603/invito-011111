
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Loader2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(10, { message: "Please enter a valid 10-digit phone number." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function SignupPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signUp(values.email, values.password);
      toast({
        title: "Account Created",
        description: "You've been successfully signed up.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <AuthRedirect to="/" condition="is-auth">
      <div className="flex items-center justify-center min-h-full py-12">
        <div className="w-full max-w-sm">
            <Card className="rounded-3xl shadow-2xl overflow-hidden border-none">
              <div className="relative h-48 w-full">
                <Image 
                  src="https://picsum.photos/seed/makeup-alt/600/400"
                  alt="Makeup items"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="cosmetics palette"
                />
              </div>
              <CardContent className="p-8 text-center bg-card">
                 <h1 className="text-4xl font-bold font-headline text-primary mb-2">Welcome!</h1>
                 <p className="text-muted-foreground mb-8">Create your account to get started.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Name" {...field} className="bg-secondary rounded-full border-none h-12 px-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center bg-secondary rounded-full border-none h-12 px-6">
                               <span className="text-foreground/80 pr-2">+91</span>
                               <Input placeholder="Phone Number" {...field} className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Email" {...field} className="bg-secondary rounded-full border-none h-12 px-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                               <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="bg-secondary rounded-full border-none h-12 px-6 pr-12" />
                               <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground/50 hover:bg-secondary" onClick={() => setShowPassword(p => !p)}>
                                {showPassword ? <EyeOff/> : <Eye />}
                               </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                             <div className="relative">
                               <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" {...field} className="bg-secondary rounded-full border-none h-12 px-6 pr-12" />
                               <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground/50 hover:bg-secondary" onClick={() => setShowPassword(p => !p)}>
                                {showPassword ? <EyeOff/> : <Eye />}
                               </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full h-12 text-base" disabled={form.formState.isSubmitting}>
                       {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin text-foreground/50"/>}
                      Sign Up
                    </Button>
                  </form>
                </Form>
                 <Link href="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
                  Already have an account? Log in
                </Link>
              </CardContent>
            </Card>
        </div>
      </div>
    </AuthRedirect>
  );
}
