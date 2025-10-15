
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EcommerceHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !user.emailVerified) {
      router.replace('/verify-email');
    }
  }, [user, loading, router]);

  if (loading || (user && !user.emailVerified)) {
    // Render a loading state or null while checking auth or redirecting
    return null; 
  }

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="bg-background text-foreground">
            <header className="p-4">
                <h1 className="text-4xl font-bold text-center mb-4">Night Fury</h1>
                <div className="relative">
                    <Input placeholder="Enter your product name..." className="bg-card border-border rounded-lg h-12 pl-4 pr-10 focus-visible:ring-primary/50" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                </div>
            </header>

            <main className="px-4 mt-4">
                <section className="relative mb-6 rounded-lg overflow-hidden">
                    <div className="relative h-[400px] w-full">
                       <Image src="https://picsum.photos/seed/fashion-sale/800/600" layout="fill" objectFit="cover" alt="Fashion Sale" data-ai-hint="fashion models sunglasses" className="rounded-lg" />
                       <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
                                <p className="font-semibold text-primary uppercase text-sm">Trending Item</p>
                                <h2 className="text-3xl font-bold my-2 leading-tight text-foreground">WOMEN'S LATEST<br/>FASHION SALE</h2>
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 py-3 mt-2">SHOP NOW</Button>
                            </div>
                       </div>
                       <div className="absolute top-4 right-4 text-orange-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2c-4 0-4 4-8 4s-4-4-8-4-4 4-4 4v10c0 4 4 4 4 4s4-4 8-4 8 4 8 4 4-4 4-4V6c0-4-4-4-4-4zM14 6s-1.5 2-4 2-4-2-4-2M10 18s1.5-2 4-2 4 2 4 2"/></svg>
                       </div>
                    </div>
                </section>
                
                <section className="mb-8">
                    <div className="bg-card p-3 rounded-lg shadow-sm flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#38A169" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 2l-3 6h-5l4 4-1.5 6.5L12 18l5.5 4.5L16 12l4-4h-5l-3-6z"/><path d="M10 8h4l-2 4-2-4z"/><path d="M7 22h10l1-10H6l1 10z"/></svg>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-foreground">DRESS & FROCK</h3>
                                <span className="text-sm text-muted-foreground">(53)</span>
                            </div>
                            <Link href="#">
                                <div className="text-sm text-primary hover:underline">Show All</div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-center mb-6">Our Products</h2>
                    <div className="space-y-4">
                        {products.slice(0, 4).map((product, index) => (
                           <ProductCard key={product.id} product={product} onSale={index === 2} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
