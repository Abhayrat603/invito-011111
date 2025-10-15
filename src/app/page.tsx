
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}

export default function EcommerceHomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const scrollEl = scrollViewportRef.current;
    if (!scrollEl) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isHoveringRef.current) {
        if (scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth) {
          scrollEl.scrollLeft = 0;
        } else {
          scrollEl.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => { isHoveringRef.current = true; };
    const handleMouseLeave = () => { isHoveringRef.current = false; };

    scrollEl.addEventListener('mouseenter', handleMouseEnter);
    scrollEl.addEventListener('mouseleave', handleMouseLeave);
    scrollEl.addEventListener('touchstart', handleMouseEnter, { passive: true });
    scrollEl.addEventListener('touchend', handleMouseLeave);


    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollEl) {
        scrollEl.removeEventListener('mouseenter', handleMouseEnter);
        scrollEl.removeEventListener('mouseleave', handleMouseLeave);
        scrollEl.removeEventListener('touchstart', handleMouseEnter);
        scrollEl.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

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

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };


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
                  
                  <h2 className="text-xl font-bold text-center mb-6 whitespace-nowrap">{searchQuery ? `Results for "${searchQuery}"` : (selectedCategory ? selectedCategory : "Trending Inovation Card")}</h2>
                  
                  <section className="px-4">
                      {displayedProducts.length > 0 ? (
                          <>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {displayedProducts.map((product, index) => (
                                  <ProductCard key={product.id} product={product} onSale={index % 2 === 0} />
                                  ))}
                              </div>

                              {totalPages > 1 && (
                                  <div className="flex justify-between items-center p-4 mt-4">
                                      <Button variant="outline" onClick={handlePrev} disabled={currentPage === 0}>
                                          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                                      </Button>
                                      <Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages - 1}>
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
              </main>
          </div>
      </AuthRedirect>
    </MainLayout>
  );
}
