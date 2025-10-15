
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
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
                        "w-5 h-5",
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
        <div className="bg-card text-card-foreground rounded-lg shadow-sm overflow-hidden group/card border">
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
                     <div className="absolute top-0 left-0 w-24 h-24">
                        <div className="absolute transform -rotate-45 bg-black text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                            SALE
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <p className="text-sm text-pink-500 uppercase font-medium">{product.category}</p>
                <h3 className="font-medium text-base my-1 text-foreground">
                    <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h3>
                <div className="flex my-2">
                   <StarRating rating={3} />
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="font-bold text-lg text-foreground">${onSale ? salePrice.toFixed(2) : product.price.toFixed(2)}</span>
                    {onSale && <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>}
                </div>
            </div>
        </div>
    );
}
