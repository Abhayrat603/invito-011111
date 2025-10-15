"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { ArrowLeft, Menu, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Haircuts", icon: "https://picsum.photos/seed/haircut-icon/100/100", hint: "scissors comb" },
  { name: "Coloring", icon: "https://picsum.photos/seed/coloring-icon/100/100", hint: "hair dye" },
  { name: "Body Spa", icon: "https://picsum.photos/seed/spa-icon/100/100", hint: "lotions oils" },
  { name: "Make Up", icon: "https://picsum.photos/seed/makeup-icon/100/100", hint: "makeup brushes" },
  { name: "Nails", icon: "https://picsum.photos/seed/nails-icon/100/100", hint: "nail polish" },
  { name: "Skincare", icon: "https://picsum.photos/seed/skincare-icon/100/100", hint: "face cream" },
];

const specialists = [
  { name: "Anne Smith", image: "https://picsum.photos/seed/anne/200/200", rating: 5, hint: "woman smiling" },
  { name: "Alice Hills", image: "https://picsum.photos/seed/alice/200/200", rating: 5, hint: "professional woman" },
  { name: "Julie Haws", image: "https://picsum.photos/seed/julie/200/200", rating: 5, hint: "woman portrait" },
];

export default function ServicesPage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="w-full max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
          <div className="relative flex-grow mx-4">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
            <Input placeholder="Search" className="rounded-full bg-secondary border-none pl-12 h-12" />
          </div>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </header>

        <h1 className="text-3xl font-bold font-headline text-center mb-8">Services</h1>

        <section className="mb-12">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Categories</h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link href="#" key={category.name}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square rounded-2xl bg-card shadow-md overflow-hidden mb-2">
                    <Image src={category.icon} alt={category.name} layout="fill" objectFit="cover" data-ai-hint={category.hint} />
                  </div>
                  <span className="text-xs font-medium">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4">Specialist</h2>
          <div className="space-y-4">
            {specialists.map((specialist) => (
              <div key={specialist.name} className="flex items-center gap-4 p-4 rounded-2xl bg-card shadow-md">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image src={specialist.image} alt={specialist.name} layout="fill" objectFit="cover" data-ai-hint={specialist.hint} />
                </div>
                <div>
                  <h3 className="font-bold">{specialist.name}</h3>
                  <div className="flex items-center">
                    {[...Array(specialist.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AuthRedirect>
  );
}
