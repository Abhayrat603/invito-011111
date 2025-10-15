
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
    const image = PlaceHolderImages.find(img => img.id === id);
    if (image) {
        return image;
    }
    // Fallback for images that might not be in the JSON file from mock data
    const productImages: {[key: string]: {url: string, hint: string}} = {
        'product-tee-1': { url: 'https://picsum.photos/seed/tee1/800/800', hint: 'gray t-shirt' },
        'product-shorts-1': { url: 'https://picsum.photos/seed/shorts1/800/800', hint: 'running shorts' },
        'product-sneakers-1': { url: 'https://picsum.photos/seed/sneaker1/800/800', hint: 'white sneakers' },
        'product-hoodie-1': { url: 'https://picsum.photos/seed/hoodie1/800/800', hint: 'gray hoodie' },
    };
    if (productImages[id]) {
        return {
            id: id,
            imageUrl: productImages[id].url,
            imageHint: productImages[id].hint,
            description: "Product image"
        }
    }
    return undefined;
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
              <div className="grid grid-cols-1 gap-4">
                {products.slice(0, 4).map((product) => {
                  const image = getPlaceholderImage(product.images[0]);
                  return (
                    <div key={product.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                       <div className="relative group overflow-hidden">
                          <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold uppercase px-8 py-1.5 -rotate-45 -translate-x-8 translate-y-3 z-10 shadow-md">Sale</div>
                          <div className="relative w-full aspect-square">
                            {image && <Image src={image.imageUrl} alt={product.name} layout="fill" objectFit="cover" data-ai-hint={image.imageHint} />}
                          </div>
                       </div>
                       <div className="p-4 text-left">
                          <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">{product.category}</p>
                          <h3 className="font-semibold text-primary mt-1 truncate text-lg">{product.name}</h3>
                          <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-5 w-5", i < 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
                            ))}
                          </div>
                          <div className="flex items-baseline gap-2 mt-2">
                            <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
                            <p className="text-base text-muted-foreground line-through">${(product.price * 1.1).toFixed(2)}</p>
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
