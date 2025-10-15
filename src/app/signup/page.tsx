"use client";

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
import { Loader2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
                            <Input type="password" placeholder="Password" {...field} className="bg-secondary rounded-full border-none h-12 px-6" />
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
                            <Input type="password" placeholder="Confirm Password" {...field} className="bg-secondary rounded-full border-none h-12 px-6" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full rounded-full h-12 text-base" disabled={form.formState.isSubmitting}>
                       {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
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
