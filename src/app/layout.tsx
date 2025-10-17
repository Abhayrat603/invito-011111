import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/auth-provider";
import { AppStateProvider } from "@/components/providers/app-state-provider";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export const metadata: Metadata = {
  title: "Invite Designer",
  description: "Create and customize beautiful invitation cards for every occasion.",
  manifest: "/manifest.json",
  themeColor: "#694736",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Invite Designer",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <FirebaseClientProvider>
          <AuthProvider>
            <AppStateProvider>
              {children}
              <Toaster />
            </AppStateProvider>
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
