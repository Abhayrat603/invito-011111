import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/auth-provider";
import Header from "@/components/layout/header";
import { CartProvider } from "@/components/providers/cart-provider";

export const metadata: Metadata = {
  title: "E-commerce Website",
  description: "A beautiful and modern e-commerce website.",
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
        <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">
                <div className="container mx-auto p-4 lg:p-8">
                  <div className="bg-card rounded-2xl shadow-lg min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-6.5rem)] flex flex-col">
                    <Header />
                    <main className="flex-1 p-6 md:p-8 lg:p-12">
                      {children}
                    </main>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
