
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, ChevronLeft, ChevronRight, X, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { DealOfTheDayCard } from "@/components/deal-of-the-day-card";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { dealProduct, dealProduct2, dealProduct3 } from "@/lib/mock-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

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

export default function EcommerceHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  
  const dealProducts = [dealProduct, dealProduct2, dealProduct3];

  useEffect(() => {
    if (!loading && user && !user.emailVerified) {
      router.replace('/verify-email');
    }
  }, [user, loading, router]);
  
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
    setCurrentPage(0); // Reset to first page on new search
  }, [searchQuery, selectedCategory]);

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
    <MainLayout>
      <AuthRedirect to="/login" condition="is-not-auth">
        <div className="bg-background text-foreground">
              <header className="p-4">
                  <h1 className="text-4xl font-bold text-center mb-4 font-headline text-primary">Invite Designer</h1>
                  <div className="relative">
                      <Input 
                          placeholder="Search for invitations..." 
                          className="bg-card border-border rounded-lg h-12 pl-4 pr-10 focus-visible:ring-primary/50" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery ? (
                          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" onClick={() => setSearchQuery('')}>
                              <X className="h-5 w-5 text-muted-foreground"/>
                          </Button>
                      ) : (
                          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                      )}
                  </div>
              </header>

              <main className="pb-4">
                  <section className="px-4 mb-6">
                    <h2 className="text-2xl font-headline text-primary text-left mt-8 mb-2">Deal of the Day</h2>
                     <Carousel
                        plugins={[
                            Autoplay({ delay: 2000, stopOnInteraction: true }),
                            Fade()
                        ]}
                        opts={{
                          align: "start",
                          loop: true,
                        }}
                        className="w-full max-w-[300px] mx-auto"
                      >
                        <CarouselContent>
                          {dealProducts.map((product, index) => (
                            <CarouselItem key={index} className="basis-full">
                              <div className="p-1">
                                <DealOfTheDayCard product={product} />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="h-8 w-8 left-2 bg-background/50 hover:bg-background/80" />
                        <CarouselNext className="h-8 w-8 right-2 bg-background/50 hover:bg-background/80" />
                      </Carousel>
                  </section>
                  
                  <h2 className="text-2xl font-headline text-primary text-left mt-8 mb-2 px-4">Trending Invitation Card</h2>
                  <section className="mb-4">
                      <ScrollArea className="w-full whitespace-nowrap" viewportRef={scrollViewportRef}>
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
                  
                  <section className="px-4">
                      <h2 className="text-2xl font-headline text-primary text-left mb-6">New Arrivals</h2>
                      {displayedProducts.length > 0 ? (
                          <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {displayedProducts.map((product, index) => (
                                  <ProductCard key={product.id} product={product} onSale={index % 2 === 0} />
                                  ))}
                              </div>

                              {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-4 gap-4">
                                    <Button variant="outline" onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}>
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                                    </Button>
                                    <Button variant="outline" onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}>
                                        Next <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                              )}
                          </>
                      ) : (
                          <div className="text-center py-10">
                              <p className="text-lg text-muted-foreground">{selectedCategory ? `No results found in ${selectedCategory}` : 'No results found.'}</p>
                              <Button variant="link" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>Clear filters</Button>
                          </div>
                      )}
                  </section>

                  <section className="px-4 mt-8 space-y-6">
                    <h2 className="text-2xl font-headline text-primary text-left mb-6">Testimonial</h2>
                    <TestimonialCard />
                  </section>
                  
              </main>
          </div>
      </AuthRedirect>
    </MainLayout>
  );
}
