
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function EcommerceHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    if (!loading && user && !user.emailVerified) {
      router.replace('/verify-email');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategoryIndex(prevIndex => (prevIndex + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading || (user && !user.emailVerified)) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const productsInCategory = products.filter(p => p.category === currentCategory.name);
  
  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };


  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="bg-background text-foreground">
            <header className="p-4">
                <h1 className="text-4xl font-bold text-center mb-4">Invite Designer</h1>
                <div className="relative">
                    <Input placeholder="Search for invitations..." className="bg-card border-border rounded-lg h-12 pl-4 pr-10 focus-visible:ring-primary/50" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                </div>
            </header>

            <main className="px-4 mt-4">
                <section className="relative mb-6 rounded-lg overflow-hidden">
                    <div className="relative h-[400px] w-full">
                       <Image src="https://picsum.photos/seed/invitation-hero/800/600" layout="fill" objectFit="cover" alt="Beautifully designed invitation cards" data-ai-hint="invitation cards spread" className="rounded-lg" />
                       <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg">
                                <h2 className="text-3xl font-bold my-2 leading-tight text-foreground">BEAUTIFUL INVITATIONS<br/>FOR ANY OCCASION</h2>
                            </div>
                       </div>
                       <div className="absolute top-4 right-4 text-orange-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2c-4 0-4 4-8 4s-4-4-8-4-4 4-4 4v10c0 4 4 4 4s4-4 8-4 8 4 8 4 4-4 4-4V6c0-4-4-4-4-4zM14 6s-1.5 2-4 2-4-2-4-2M10 18s1.5-2 4-2 4 2 4 2"/></svg>
                       </div>
                    </div>
                </section>
                
                <section className="mb-8">
                    <div className="bg-card p-3 rounded-lg shadow-sm flex items-center space-x-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-semibold text-foreground uppercase">{currentCategory.name}</h3>
                                <span className="text-sm text-muted-foreground">({productsInCategory.length})</span>
                            </div>
                            <Link href="#">
                                <div className="text-sm text-primary hover:underline">Show All</div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-center mb-6">Our Designs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayedProducts.map((product, index) => (
                           <ProductCard key={product.id} product={product} onSale={index % 2 === 0} />
                        ))}
                    </div>

                    <div className="flex justify-between items-center p-4 mt-4">
                        <Button variant="outline" onClick={handlePrev}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <Button variant="outline" onClick={handleNext}>
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </section>
            </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
