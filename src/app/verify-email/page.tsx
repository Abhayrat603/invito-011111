
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MailCheck } from "lucide-react";
import { getAuth, reload } from "firebase/auth";

const RESEND_TIMEOUT = 60; // seconds

export default function VerifyEmailPage() {
  const { user, sendVerificationEmail, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(RESEND_TIMEOUT);
  const [isResending, setIsResending] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    
    // Periodically check the user's email verification status
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          toast({
            title: "Verification Successful!",
            description: "Your email has been verified. Welcome!",
          });
          router.push("/");
        }
      }
    }, 3000); // Check every 3 seconds

    if (!loading) {
        setIsChecking(false);
        if (user?.emailVerified) {
            clearInterval(interval);
            router.push("/");
        }
    }

    return () => clearInterval(interval);
  }, [user, loading, router, toast]);
  
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((currentCountdown) => {
          if (currentCountdown <= 1) {
            clearInterval(countdownInterval);
            return 0;
          }
          return currentCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);
    try {
      await sendVerificationEmail();
      toast({
        title: "Email Sent",
        description: "A new verification email has been sent.",
      });
      setCountdown(RESEND_TIMEOUT);
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

  if (loading || isChecking) {
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
            We've sent a verification link to <span className="font-semibold text-primary">{user?.email}</span>. Please check your inbox (and spam folder) and follow the link to activate your account.
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
        </CardContent>
      </Card>
    </div>
  );
}
