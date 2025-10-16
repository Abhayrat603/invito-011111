
"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Heart, Minus, Plus, Download, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/components/providers/app-state-provider';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const findImage = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id);
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const { products, addToCart, toggleWishlist, isInWishlist } = useAppState();
  const { toast } = useToast();

  const product = products.find(p => p.slug === slug);
  
  const [quantity, setQuantity] = useState(1);
  

  if (!product) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p>Product not found.</p>
        </div>
      </MainLayout>
    );
  }

  const handleBuyNow = () => {
    if (product.zipFileUrl) {
        toast({
            title: "Downloading...",
            description: `Your download for ${product.name} will begin shortly.`,
        });
        const link = document.createElement("a");
        link.href = product.zipFileUrl;
        link.download = `${product.slug}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        addToCart(product.id, quantity);
        router.push('/cart');
    }
  }

  const handleDownload = () => {
    if (product.zipFileUrl) {
        toast({
            title: "Downloading...",
            description: `Your download for ${product.name} will begin shortly.`,
        });
        const link = document.createElement("a");
        link.href = product.zipFileUrl;
        link.download = `${product.slug}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        toast({
            variant: "destructive",
            title: "Download Not Available",
            description: "No download file has been configured for this product.",
        });
    }
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
  }

  const isLiked = isInWishlist(product.id);
  const mainImage = findImage(product.images[0]);
  const thumbnailImage = findImage(product.images[1] || product.images[0]);

  return (
    <MainLayout>
      <div className="w-full mx-auto bg-background text-foreground flex flex-col">
        <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
          
          <div className="flex-grow flex items-center text-xs text-muted-foreground overflow-hidden">
            <Link href="/" className="mr-1 shrink-0 hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="mx-1 shrink-0 truncate">{product.category}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="mx-1 font-medium text-foreground truncate">{product.name}</span>
          </div>
          <div className="w-10 shrink-0"></div>
        </header>

        <main className="flex-grow p-4 md:p-6 space-y-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="relative aspect-[3/4] w-full mb-4">
              <Image 
                src={mainImage?.imageUrl || "https://picsum.photos/seed/product-main/600/800"}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                data-ai-hint="invitation card design"
              />
            </div>
            <div className="flex justify-center">
              <div className="relative w-24 aspect-[3/4] p-1 border rounded-md bg-white">
                <Image
                   src={thumbnailImage?.imageUrl || "https://picsum.photos/seed/product-thumb/150/200"}
                   alt={`${product.name} thumbnail`}
                   layout="fill"
                   objectFit="contain"
                   className="rounded-sm"
                   data-ai-hint="card design"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {product.isPaid && <Badge variant="outline" className="text-sm font-semibold border-yellow-500 text-yellow-600">Paid</Badge>}
            <h1 className="text-lg font-bold leading-tight">{product.name}</h1>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-destructive">₹{product.price.toFixed(2)}</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-stretch gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className='flex-1 min-w-[100px]'>
                         <Button size="sm" className="w-full bg-amber-800 hover:bg-amber-900 h-11 text-xs px-2" onClick={handleDownload} disabled={!product.zipFileUrl}>
                            <Download className="mr-1.5 h-4 w-4" /> Download
                        </Button>
                      </div>
                    </TooltipTrigger>
                     {!product.zipFileUrl && (
                        <TooltipContent>
                            <p>No download available for this item.</p>
                        </TooltipContent>
                     )}
                  </Tooltip>
                </TooltipProvider>

                <Button size="sm" variant="outline" className="flex-1 h-11 min-w-[100px] text-xs px-2" onClick={handleBuyNow}>
                    <ShoppingCart className="mr-1.5 h-4 w-4" /> Buy now
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={handleToggleWishlist}>
                    <Heart className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                </Button>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg border">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-semibold text-foreground">File Type</p>
                    <p className="text-muted-foreground">JPG, PDF</p>
                </div>
                <div>
                    <p className="font-semibold text-foreground">Dimension</p>
                    <p className="text-muted-foreground">10x4</p>
                </div>
                <div className="col-span-2">
                    <p className="font-semibold text-foreground">Required Software</p>
                    <div className="flex gap-2 flex-wrap mt-1 text-xs">
                      <span className="text-primary underline cursor-pointer">CorelDRAW</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-primary underline cursor-pointer">Photoshop</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-primary underline cursor-pointer">Canva</span>
                    </div>
                </div>
            </div>
            <Separator className="my-4"/>
            <Link href="/request-edit" className="w-full">
              <Button className="w-full" variant="secondary">Request For Edit</Button>
            </Link>
          </div>
          
          <div className="space-y-3 text-muted-foreground text-sm">
             <p>Give your shop a professional and eye-catching look with this <strong>{product.name}</strong>. Designed in a modern, attractive style, it's perfect for highlighting your products, services, and offers.</p>
             <ul className="list-disc list-inside space-y-2 pl-2">
                 <li>Ready-to-print, customizable design</li>
                 <li>Easy to edit — no advanced skills needed</li>
                 <li>High-quality, print-ready files with included fonts</li>
                 <li>Ideal for supermarkets, kirana shops, jewellery showrooms, and more</li>
             </ul>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
