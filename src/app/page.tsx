
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, ChevronLeft, ChevronRight, X, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { DealOfTheDayCard } from "@/components/deal-of-the-day-card";
import { useAuth } from "@/components/providers/auth-provider";
import { useAppState } from "@/components/providers/app-state-provider";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/lib/types";

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}

const TestimonialCard = () => {
    const testimonialImage = findImage('testimonial-alan');
    return (
        <Card className="bg-card shadow-lg border-border/50 rounded-2xl">
            <CardContent className="p-8 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
                    <AvatarImage src={testimonialImage?.imageUrl} alt="Alan Doe" data-ai-hint="woman portrait" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground">ALAN DOE</h3>
                <p className="text-sm text-muted-foreground mb-4">CEO & Founder Invision</p>
                <Quote className="w-10 h-10 text-primary/50 my-2" />
                <p className="text-foreground/80 italic">
                    "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet."
                </p>
            </CardContent>
        </Card>
    );
};

const PageFooter = () => (
    <footer style={{ backgroundColor: '#FCF9EA' }} className="text-amber-950 p-6 mt-8">
        <div className="grid grid-cols-1 gap-8 mb-6">
            <div>
                <h3 className="font-bold mb-2">POPULAR CATEGORIES</h3>
                <ul className="space-y-2 text-sm text-amber-950/70">
                    <li><a href="/products/classic-wedding-invitation" className="hover:underline">Wedding Invitation</a></li>
                    <li><a href="/products/modern-birthday-bash" className="hover:underline">Birthday Invitation</a></li>
                    <li><a href="/products/corporate-gala-invite" className="hover:underline">Corporate</a></li>
                    <li><a href="/products/summer-pool-party" className="hover:underline">Party</a></li>
                    <li><a href="/products/classic-wedding-invitation" className="hover:underline">E-Invites</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-2">PRODUCTS</h3>
                <ul className="space-y-2 text-sm text-amber-950/70">
                    <li><a href="#" className="hover:underline">New Designs</a></li>
                    <li><a href="#" className="hover:underline">Special Offers</a></li>
                    <li><a href="/request-edit" className="hover:underline">Request For Edit</a></li>
                    <li><a href="/help-center" className="hover:underline">Help Center</a></li>
                    <li><a href="#" className="hover:underline">Sitemap</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-2">OUR COMPANY</h3>
                <ul className="space-y-2 text-sm text-amber-950/70">
                    <li><a href="/about-us" className="hover:underline">About Us</a></li>
                    <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                    <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
                    <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                    <li><a href="#" className="hover:underline">Careers</a></li>
                </ul>
            </div>
        </div>

        <div className="border-t border-amber-900/20 pt-6">
            <p className="text-center text-xs text-amber-950/60">Copyright &copy; Invite Designer All Rights Reserved.</p>
        </div>
    </footer>
)

export default function EcommerceHomePage() {
  const { user, loading } = useAuth();
  const { products, deals } = useAppState();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const mainContentRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Assign the ref from the MainLayout to our local ref
    const mainElement = document.querySelector('main[data-main-layout-scroll]');
    if (mainElement) {
        mainContentRef.current = mainElement as HTMLElement;
    }
  }, []);

  useEffect(() => {
    if (!loading && user && !user.emailVerified) {
      router.replace('/verify-email');
    }
  }, [user, loading, router]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }

  useEffect(() => {
    let results = products;
    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        results = results.filter(product =>
            product.name.toLowerCase().includes(lowercasedQuery) ||
            product.description.toLowerCase().includes(lowercasedQuery)
        );
    }
    if (selectedCategory) {
        results = results.filter(p => p.category === selectedCategory);
    }
    setFilteredProducts(results);
    setCurrentPage(0);
  }, [searchQuery, selectedCategory, products]);
  
  useEffect(() => {
      if (mainContentRef.current) {
          mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [currentPage]);


  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(prev => prev === categoryName ? null : categoryName);
  }

  if (loading || (user && !user.emailVerified)) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  return (
    <MainLayout onSearch={handleSearch}>
      <AuthRedirect to="/login" condition="is-not-auth">
        <div className="bg-background text-foreground">
             <div className="pb-4">
                  {currentPage === 0 && !selectedCategory && !searchQuery && (
                    <>
                      <section className="px-4 my-6">
                        <h2 className="text-2xl font-headline font-bold text-primary text-left mb-2">Deal of the Day</h2>
                         <Carousel
                            opts={{
                              align: "start",
                              loop: true,
                            }}
                            className="w-full max-w-xs mx-auto"
                          >
                            <CarouselContent>
                              {deals.map((product, index) => (
                                <CarouselItem key={index}>
                                  <div className="p-1">
                                    <DealOfTheDayCard product={product} />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="h-8 w-8 -left-4 bg-background/50 hover:bg-background/80" />
                            <CarouselNext className="h-8 w-8 -right-4 bg-background/50 hover:bg-background/80" />
                          </Carousel>
                      </section>
                    </>
                  )}
                  
                  <h2 className="text-2xl font-headline font-bold text-primary text-left mb-2 px-4">Trending Invitation Card</h2>
                  <section className="mb-4">
                      <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex w-max space-x-2 p-4">
                          {categories.map((category) => {
                            const image = findImage(category.imageId);
                            const isSelected = selectedCategory === category.name;
                            return (
                              <figure 
                                  key={category.name} 
                                  className={cn(
                                      "shrink-0 rounded-full bg-secondary/80 flex items-center p-1.5 pr-5 gap-2 cursor-pointer transition-all duration-300",
                                      isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:bg-secondary"
                                  )}
                                  onClick={() => handleCategorySelect(category.name)}
                              >
                                <div className="relative h-10 w-10 shrink-0">
                                  <Image
                                    src={image?.imageUrl || `https://picsum.photos/seed/${category.id}/100`}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                    data-ai-hint={image?.imageHint}
                                  />
                                </div>
                                <figcaption className="text-sm font-medium text-foreground whitespace-nowrap">
                                  {category.name}
                                </figcaption>
                              </figure>
                            );
                          })}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                  </section>
                  
                   <section className="px-4 grid grid-cols-1 gap-4">
                        {displayedProducts.map(product => (
                            <ProductCard key={product.id} product={product} onSale={true} />
                        ))}
                    </section>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-6 px-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                            >
                                <ChevronLeft />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage === totalPages - 1}
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    )}

                  {currentPage === 0 && !selectedCategory && !searchQuery && (
                    <section className="px-4 mt-8 space-y-6">
                      <h2 className="text-2xl font-headline font-bold text-primary text-left mb-6">Testimonial</h2>
                      <TestimonialCard />
                    </section>
                  )}
                  
              </div>
              <PageFooter />
          </div>
      </AuthRedirect>
    </MainLayout>
  );
}
