"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/components/providers/cart-provider';
import { products } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }
  
  const productImages = product.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <Button variant="ghost" asChild className="mb-4">
        <Link href="/shop"><ChevronLeft className="mr-2 h-4 w-4"/> Back to Shop</Link>
       </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {productImages.map((img, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="relative aspect-square p-0">
                      {img && <Image
                        src={img.imageUrl}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={img.imageHint}
                      />}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2"/>
          </Carousel>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-2xl lg:text-3xl font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 text-center"
              />
              <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-grow">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
