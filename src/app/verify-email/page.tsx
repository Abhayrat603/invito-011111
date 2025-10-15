
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MailCheck } from "lucide-react";

const RESEND_TIMEOUT = 60; // seconds

export default function VerifyEmailPage() {
  const { user, signOut, sendVerificationEmail, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!loading && user && user.emailVerified) {
      router.push("/");
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          clearInterval(interval);
          return 0;
        }
        return currentCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendEmail = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    try {
      await sendVerificationEmail();
      toast({
        title: "Email Sent",
        description: "A new verification email has been sent to your address.",
      });
      setCountdown(RESEND_TIMEOUT);
      // Restart countdown
      const interval = setInterval(() => {
        setCountdown((currentCountdown) => {
          if (currentCountdown <= 1) {
            clearInterval(interval);
            return 0;
          }
          return currentCountdown - 1;
        });
      }, 1000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send email",
        description: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
               <MailCheck className="h-12 w-12 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to <span className="font-semibold text-primary">{user?.email}</span>. Please check your inbox and follow the link to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleResendEmail}
            disabled={countdown > 0 || isResending}
            className="w-full"
          >
            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {countdown > 0 ? `Resend link in ${countdown}s` : "Resend link"}
          </Button>
          <div className="text-sm text-muted-foreground">
             <p>Clicked the link? <Button variant="link" className="p-0 h-auto" onClick={() => window.location.reload()}>Refresh this page</Button>.</p>
             <p className="mt-4">Wrong account? <Button variant="link" className="p-0 h-auto" onClick={signOut}>Log out</Button>.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
