
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from './providers/app-state-provider';
import type { DealProduct } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DealOfTheDayCard({ product }: { product: DealProduct }) {
    const { addToCart, findImage } = useAppState();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || new Date() > new Date(product.offerEndsAt as any)) {
        return null; // Don't render if the offer has expired or on server
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(product.id, 1, true);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    const productImage = product.images && product.images.length > 0 ? findImage(product.images[0]) : undefined;
    
    return (
        <Link href={`/deals/${product.slug}`} passHref>
            <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border h-full flex flex-col group cursor-pointer">
                <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] p-4 flex items-center justify-center">
                        <Image
                            src={productImage?.imageUrl || `https://picsum.photos/seed/${product.id}/400/533`}
                            alt={product.name}
                            width={400}
                            height={533}
                            className="object-contain w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint="deal product"
                        />
                    </div>
                     <Badge variant="destructive" className="absolute top-4 left-4 z-10 text-base px-4 py-1.5 shadow-lg">
                        DEAL
                    </Badge>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="font-bold text-lg text-white leading-tight truncate">{product.name}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-white">₹{product.discountPrice.toFixed(2)}</span>
                            <span className="text-sm text-white/80 line-through">₹{product.price.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="p-4 space-y-3 bg-card flex flex-col flex-grow">
                     <Button className="w-full" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    );
}
