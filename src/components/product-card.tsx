
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, Repeat, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

// Find an image from the placeholder data
import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}

const StarRating = ({ rating }: { rating: number }) => {
    const totalStars = 5;
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4",
                        i < rating ? "text-orange-400 fill-orange-400" : "text-gray-300"
                    )}
                />
            ))}
        </div>
    );
};

export function ProductCard({ product, onSale = false }: { product: Product, onSale?: boolean }) {
    const salePrice = product.price * 0.9;
    const productImage = findImage(product.images[0]);

    return (
        <div className="bg-card text-card-foreground rounded-lg shadow-sm overflow-hidden group/card">
            <div className="relative">
                {productImage && (
                    <Image
                        src={productImage.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="object-cover w-full h-auto aspect-square"
                        data-ai-hint={productImage.imageHint}
                    />
                )}
                {onSale && (
                    <div className="absolute top-0 left-0 bg-black text-white text-xs font-semibold px-4 py-2" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}>
                        SALE
                    </div>
                )}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm rounded-full h-9 w-9">
                        <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm rounded-full h-9 w-9">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm rounded-full h-9 w-9">
                        <Repeat className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm rounded-full h-9 w-9">
                        <ShoppingBag className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="p-4 text-center">
                <p className="text-sm text-pink-500 uppercase font-medium">{product.category}</p>
                <h3 className="font-semibold text-lg my-1 hover:text-primary">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <div className="flex justify-center my-2">
                   <StarRating rating={3} />
                </div>
                <div className="flex justify-center items-baseline gap-2">
                    <span className="font-bold text-xl text-primary">${onSale ? salePrice.toFixed(2) : product.price.toFixed(2)}</span>
                    {onSale && <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>}
                </div>
            </div>
        </div>
    );
}

