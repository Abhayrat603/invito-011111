
"use client";

import { MainLayout } from "@/components/main-layout";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Shield, Users, ShoppingCart, CreditCard, Edit, Tags, Star, History, Settings, MessageSquare, Menu } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const ADMIN_EMAIL = "abhayrat603@gmail.com";

const AdminCard = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href: string }) => (
    <Link href={href} className="block">
        <Card className="hover:bg-accent hover:border-primary/50 transition-all">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                   <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </CardHeader>
        </Card>
    </Link>
);

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
        
        <main className="flex-grow p-4 space-y-4">
            <AdminCard 
                href="/admin/products"
                icon={ShoppingCart}
                title="Manage Products"
                description="Add, edit, or remove products"
            />
             <AdminCard 
                href="/admin/deals"
                icon={Tags}
                title="Manage Deals"
                description="Add, edit, or remove deals"
            />
            <AdminCard 
                href="/admin/menu"
                icon={Menu}
                title="Manage Menu"
                description="Add, edit, or remove menu items"
            />
             <AdminCard 
                href="/admin/users"
                icon={Users}
                title="View Users"
                description="See registered user details"
            />
             <AdminCard 
                href="/admin/payments"
                icon={CreditCard}
                title="Payment History"
                description="View all transaction records"
            />
             <AdminCard 
                href="/admin/requests"
                icon={Edit}
                title="Edit Requests"
                description="Manage user customization requests"
            />
            <AdminCard 
                href="/admin/requests/successful"
                icon={History}
                title="Successful Requests"
                description="View completed edit requests"
            />
             <AdminCard 
                href="/admin/ratings"
                icon={Star}
                title="App Ratings"
                description="View user feedback and ratings"
            />
             <AdminCard 
                href="/admin/settings"
                icon={Settings}
                title="App Settings"
                description="Configure application settings"
            />
            <AdminCard 
                href="/admin/testimonial"
                icon={MessageSquare}
                title="Manage Testimonial"
                description="Edit the homepage testimonial"
            />
        </main>
      </div>
    </MainLayout>
  );
}
