"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronUp, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
    const [quantity, setQuantity] = useState(2);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        {/* Left Column */}
        <div className="lg:w-1/2 text-left">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary italic mb-4">
                e-commerce<br/>Website
            </h1>
            <p className="tracking-[0.2em] text-foreground/80 mb-10">SUPPORT LOCAL EVERYTHING</p>
            
            <div className="flex items-center gap-6">
                <div className="bg-secondary p-4 rounded-xl">
                    <p className="text-sm text-foreground/70 mb-2">Choose your</p>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background" onClick={() => setQuantity(q => Math.max(1, q-1))}>
                            <ChevronDown className="h-4 w-4 text-accent" />
                        </Button>
                        <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background" onClick={() => setQuantity(q => q+1)}>
                            <ChevronUp className="h-4 w-4 text-accent" />
                        </Button>
                    </div>
                </div>
                <Button size="lg" className="h-16 bg-accent text-accent-foreground rounded-full px-8 text-base font-bold shadow-lg hover:bg-accent/90">
                    <ShoppingCart className="mr-3 h-6 w-6"/>
                    Buy Now
                </Button>
            </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 relative flex items-center justify-center">
            <div className="absolute w-[30rem] h-[30rem] bg-secondary rounded-full -z-0" />

            <div className="relative z-10 w-[24rem] h-[24rem]">
                 <Image
                    src="https://picsum.photos/seed/chair-main/800/800"
                    alt="Stylish black chair"
                    width={800}
                    height={800}
                    className="object-contain drop-shadow-2xl"
                    data-ai-hint="black chair"
                />
            </div>

            {/* Floating Cards */}
            <div className="absolute z-20 top-8 -right-8 bg-card shadow-lg rounded-full px-6 py-3">
                <p className="font-semibold">Minimalistic</p>
            </div>
             <div className="absolute z-20 bottom-16 -left-12 bg-card shadow-lg rounded-full px-6 py-3">
                <p className="font-semibold text-accent">¡Super cozy!</p>
            </div>

            {/* Image thumbnails */}
            <div className="absolute z-20 top-20 right-0 space-y-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-card shadow-md">
                     <Image
                        src="https://picsum.photos/seed/thumb1/100/100"
                        alt="Kitchen"
                        width={100}
                        height={100}
                        className="object-cover"
                        data-ai-hint="modern kitchen"
                    />
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-card shadow-md">
                     <Image
                        src="https://picsum.photos/seed/thumb2/100/100"
                        alt="Play area"
                        width={100}
                        height={100}
                        className="object-cover"
                        data-ai-hint="kids playroom"
                    />
                </div>
                 <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-card shadow-md">
                     <Image
                        src="https://picsum.photos/seed/thumb3/100/100"
                        alt="Bedroom"
                        width={100}
                        height={100}
                        className="object-cover"
                        data-ai-hint="cozy bedroom"
                    />
                </div>
            </div>
        </div>
         <div className="absolute bottom-12 right-12 hidden lg:block">
             <Link href="/shop" className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground">
                Continue shopping <ArrowRight className="h-4 w-4"/>
            </Link>
        </div>
    </div>
  );
}
