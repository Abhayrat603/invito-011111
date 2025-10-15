
"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useAppState } from "./providers/app-state-provider";
import { useToast } from "@/hooks/use-toast";

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}

export function ProductCard({ product, onSale = false }: { product: Product, onSale?: boolean }) {
    const { addToCart, toggleWishlist, isInWishlist } = useAppState();
    const { toast } = useToast();
    
    const isLiked = isInWishlist(product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(product.id);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(product.id);
        toast({
            title: isLiked ? "Removed from Wishlist" : "Added to Wishlist",
            description: `${product.name} has been ${isLiked ? 'removed from' : 'added to'} your wishlist.`,
        });
    };

    const productImage = findImage(product.images[0]);

    return (
        <div className="group/card bg-amber-50/20 text-card-foreground rounded-xl shadow-sm overflow-hidden border relative transition-all group-hover/card:shadow-lg">
            
            {onSale && (
                 <div className="absolute top-3 left-3 bg-yellow-500 text-white font-bold px-3 py-1 rounded-md z-10 text-sm shadow-md">
                    Paid
                </div>
            )}

            <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-10 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80" onClick={handleToggleWishlist}>
                <Heart className={cn("w-5 h-5 text-muted-foreground", isLiked && "text-red-500 fill-current")} />
            </Button>
            
            <Link href={`/products/${product.slug}`} passHref>
              <div className="p-4 cursor-pointer">
                  <div className="bg-emerald-100/50 rounded-lg p-3 flex flex-col items-center">
                      {productImage && (
                          <Image
                              src={productImage.imageUrl}
                              alt={product.name}
                              width={500}
                              height={500}
                              className="object-cover rounded-md shadow-sm"
                              data-ai-hint="wedding invitation card"
                          />
                      )}
                  </div>
              </div>
            </Link>

            <div className="px-5 pb-5">
                 <h3 className="font-headline text-xl my-1 text-foreground text-center truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{product.category}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-sm text-destructive">₹{product.price.toFixed(0)}</span>
                    <div className="flex items-center gap-2">
                         <Button size="sm" variant="outline" className="bg-white hover:bg-gray-100 rounded-full shadow-sm text-foreground" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-1.5 h-4 w-4"/>
                            Add
                        </Button>
                        <Link href={`/products/${product.slug}`} passHref>
                             <Button size="sm" className="bg-amber-800 hover:bg-amber-900 rounded-full shadow-sm">
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
