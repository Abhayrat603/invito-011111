
"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, Heart, Eye, Repeat, ShoppingBag, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { products } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

function getPlaceholderImage(id: string) {
    return PlaceHolderImages.find(img => img.id === id);
}

export default function ServicesPage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground">
          <header className="p-4">
            <h1 className="text-4xl font-bold text-center mb-4 font-headline">Anon</h1>
            <div className="relative">
              <Input placeholder="Enter your product name..." className="bg-card border border-border rounded-lg h-12 pl-4 pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
            </div>
          </header>

          <main className="p-4">
            <Link href="#">
              <section className="relative mb-6 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64 w-full">
                   <Image src="https://picsum.photos/seed/fashion-sale/600/400" layout="fill" objectFit="cover" alt="Fashion Sale" data-ai-hint="fashion models" />
                   <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg text-card-foreground">
                        <p className="font-semibold text-primary">Trending Item</p>
                        <h2 className="text-3xl font-bold my-2 leading-tight font-headline">WOMEN'S LATEST<br/>FASHION SALE</h2>
                        <Button className="mt-4 bg-primary text-primary-foreground rounded-lg">SHOP NOW</Button>
                    </div>
                </div>
              </section>
            </Link>

            <section>
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product) => {
                  const image = getPlaceholderImage(product.images[0]);
                  return (
                    <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                       <div className="relative group">
                          <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold uppercase px-3 py-1 -rotate-45 -translate-x-6 translate-y-2 z-10">Sale</div>
                          <div className="relative w-full aspect-square">
                            {image && <Image src={image.imageUrl} alt={product.name} layout="fill" objectFit="cover" data-ai-hint={image.imageHint} />}
                          </div>
                          <div className="absolute top-2 right-2 flex flex-col gap-2">
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm border-border">
                                  <Heart className="h-4 w-4"/>
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm border-border">
                                  <Eye className="h-4 w-4"/>
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm border-border">
                                  <Repeat className="h-4 w-4"/>
                              </Button>
                              <Button variant="outline" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm border-border">
                                  <ShoppingBag className="h-4 w-4"/>
                              </Button>
                          </div>
                       </div>
                       <div className="p-4 text-center">
                          <p className="text-sm text-primary font-bold uppercase">{product.category}</p>
                          <h3 className="font-semibold text-foreground mt-1 truncate">{product.name}</h3>
                          <div className="flex justify-center items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-4 w-4", i < 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                            ))}
                          </div>
                          <div className="flex justify-center items-baseline gap-2 mt-2">
                            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground line-through">${(product.price * 1.1).toFixed(2)}</p>
                          </div>
                       </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
