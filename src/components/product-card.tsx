"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/components/providers/cart-provider";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const firstImage = PlaceHolderImages.find(p => p.id === product.images[0]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            {firstImage && (
              <Image
                src={firstImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                data-ai-hint={firstImage.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg leading-tight font-medium line-clamp-2">{product.name}</CardTitle>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold font-headline">${product.price.toFixed(2)}</p>
        <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label={`Add ${product.name} to cart`}>
          <ShoppingCart className="h-5 w-5"/>
        </Button>
      </CardFooter>
    </Card>
  );
}
