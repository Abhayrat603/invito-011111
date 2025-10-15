"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Search, Home, ShoppingBag, Heart, LayoutGrid, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Haircuts", icon: "https://picsum.photos/seed/haircut-icon/100/100", hint: "scissors comb", count: 53 },
  { name: "Coloring", icon: "https://picsum.photos/seed/coloring-icon/100/100", hint: "hair dye", count: 24 },
  { name: "Body Spa", icon: "https://picsum.photos/seed/spa-icon/100/100", hint: "lotions oils", count: 18 },
  { name: "Make Up", icon: "https://picsum.photos/seed/makeup-icon/100/100", hint: "makeup brushes", count: 45 },
  { name: "Nails", icon: "https://picsum.photos/seed/nails-icon/100/100", hint: "nail polish", count: 32 },
];

export default function ServicesPage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="w-full max-w-md mx-auto bg-background text-foreground">
        <header className="p-4">
          <h1 className="text-4xl font-bold text-center mb-4">Anon</h1>
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
                      <h2 className="text-3xl font-bold my-2 leading-tight">WOMEN'S LATEST<br/>FASHION SALE</h2>
                      <Button className="mt-4 bg-primary text-primary-foreground rounded-lg">SHOP NOW</Button>
                  </div>
              </div>
            </section>
          </Link>

          <section>
            <div className="space-y-3">
              {categories.map((category) => (
                <Link href="#" key={category.name}>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-card border border-border shadow-sm">
                    <div className="relative w-16 h-16 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                       <Image src={category.icon} alt={category.name} width={40} height={40} data-ai-hint={category.hint} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-foreground">{category.name}</h3>
                      <span className="text-sm text-muted-foreground">Show All</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({category.count})</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
          <div className="flex justify-around items-center h-16">
            <Button variant="ghost" className="flex flex-col h-auto p-1 text-muted-foreground">
              <Menu className="h-7 w-7"/>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 text-muted-foreground relative">
              <ShoppingBag className="h-7 w-7"/>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 text-primary">
              <Home className="h-7 w-7"/>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 text-muted-foreground relative">
              <Heart className="h-7 w-7"/>
               <span className="absolute top-0 right-0 -mt-1 -mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
            </Button>
            <Button variant="ghost" className="flex flex-col h-auto p-1 text-muted-foreground">
              <LayoutGrid className="h-7 w-7"/>
            </Button>
          </div>
        </footer>
      </div>
    </AuthRedirect>
  );
}
