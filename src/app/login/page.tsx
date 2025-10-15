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
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

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
      <div className="flex items-center justify-center min-h-full py-12">
        <div className="w-full max-w-sm">
            <Card className="rounded-3xl shadow-2xl overflow-hidden border-none">
              <div className="relative h-48 w-full">
                <Image 
                  src="https://picsum.photos/seed/makeup/600/400"
                  alt="Makeup items"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="makeup cosmetics"
                />
              </div>
              <CardContent className="p-8 text-center bg-card">
                 <h1 className="text-4xl font-bold font-headline text-primary mb-2">HELLO!</h1>
                 <p className="text-muted-foreground mb-8">Find the best beauty services near you.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Username" {...field} className="bg-secondary rounded-full border-none h-12 px-6" />
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
                    <Button type="submit" className="w-full rounded-full h-12 text-base" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                      Log In
                    </Button>
                  </form>
                </Form>
                 <Link href="/signup" className="mt-6 inline-block text-sm text-primary hover:underline">
                  Create an account
                </Link>
              </CardContent>
            </Card>
        </div>
      </div>
    </AuthRedirect>
  );
}
