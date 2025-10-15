"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import useSWR from 'swr';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const fetchProductsForCart = async (productIds: string[]): Promise<Product[]> => {
    if (productIds.length === 0) return [];
    const productsQuery = query(collection(db, "products"), where("id", "in", productIds));
    const querySnapshot = await getDocs(productsQuery);
    return querySnapshot.docs.map(doc => doc.data() as Product);
};

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalItems, loading: isCartLoading } = useCart();
  const { toast } = useToast();
  
  const productIds = items.map(item => item.productId);
  const { data: products, isLoading: isProductsLoading } = useSWR(
      productIds.length > 0 ? `cartProducts/${productIds.join(',')}` : null,
      () => fetchProductsForCart(productIds)
  );

  const isLoading = isCartLoading || (productIds.length > 0 && isProductsLoading);

  const cartDetails = items.map(item => {
    const product = products?.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0,
    };
  });

  const total = cartDetails.reduce((sum, item) => sum + item.subtotal, 0);
  
  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
        title: "Item removed",
        description: `${productName} has been removed from your cart.`
    })
  }

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                </div>
                <div className="md:col-span-1">
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (totalItems === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartDetails.map(item => {
            if (!item.product) return <Skeleton key={item.productId} className="h-28 w-full" />;
            
            const productImage = PlaceHolderImages.find(p => p.id === item.product!.images[0]);
            
            return (
              <div key={item.productId} className="flex items-center gap-4 bg-card p-4 rounded-lg border">
                <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted">
                    {productImage && (
                        <Image src={productImage.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint={productImage.imageHint}/>
                    )}
                </div>
                <div className="flex-grow">
                  <Link href={`/product/${item.product.slug}`} className="font-medium hover:underline">{item.product.name}</Link>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                      className="w-20 h-9"
                    />
                     <Button variant="ghost" size="icon" onClick={() => handleRemove(item.productId, item.product!.name)} aria-label="Remove item">
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold text-lg">${item.subtotal.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg border sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2 text-muted-foreground">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
             <div className="flex justify-between mb-4 text-muted-foreground">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <Button asChild size="lg" className="w-full mt-6">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
