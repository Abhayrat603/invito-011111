
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
import { Loader2, User, Lock, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn(values.email, values.password);
      toast({
        title: "Success",
        description: "You've been signed in.",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again.",
      });
    }
  };

  return (
    <AuthRedirect to="/" condition="is-auth">
      <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
        <div className="w-full max-w-sm relative">
            <div className="relative h-48 w-full rounded-t-3xl overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/makeup/600/400"
                alt="Makeup items"
                layout="fill"
                objectFit="cover"
                data-ai-hint="makeup cosmetics"
              />
            </div>
            <Card className="rounded-b-3xl shadow-2xl border-none pt-8">
              <CardContent className="relative p-8 text-center bg-card overflow-hidden">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-1/3 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-1/4 translate-y-1/4"></div>

                 <div className="relative z-10">
                   <h1 className="text-5xl font-bold font-headline text-primary mb-2">HELLO!</h1>
                   <p className="text-primary/80 mb-8">Find the best beauty services near you.</p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50 opacity-50" />
                                <Input placeholder="Username" {...field} className="bg-transparent rounded-lg border-primary/50 text-primary placeholder:text-primary/50 h-12 pl-12 pr-4 focus-visible:ring-primary/50" />
                              </div>
                            </FormControl>
                            <FormMessage className="text-destructive/80 text-xs"/>
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
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/50 opacity-50" />
                                <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} className="bg-transparent rounded-lg border-primary/50 text-primary placeholder:text-primary/50 h-12 pl-12 pr-12 focus-visible:ring-primary/50" />
                                <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-muted-foreground/50 hover:bg-transparent" onClick={() => setShowPassword(p => !p)}>
                                  {showPassword ? <EyeOff className="h-5 w-5 opacity-50"/> : <Eye className="h-5 w-5 opacity-50"/>}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage className="text-destructive/80 text-xs"/>
                          </FormItem>
                        )}
                      />
                      <div className="text-right">
                        <Link href="/forgot-password" className="text-sm text-primary/80 hover:underline">
                            Forgot Password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full rounded-lg h-12 text-base bg-primary/90 hover:bg-primary text-primary-foreground" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground/50"/>}
                        Log In
                      </Button>
                    </form>
                  </Form>
                   <Link href="/signup" className="mt-6 inline-block text-sm text-primary/80 hover:underline">
                    Create an account
                  </Link>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </AuthRedirect>
  );
}
