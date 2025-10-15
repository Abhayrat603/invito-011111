
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import Image from "next/image";
import { products as allProducts } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

const findImage = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id);
};


export default function CartPage() {
    const router = useRouter();
    const { cart, removeFromCart } = useAppState();

    const cartProducts = cart.map(cartItem => {
        const product = allProducts.find(p => p.id === cartItem.productId);
        return product ? { ...product, quantity: cartItem.quantity } : null;
    }).filter(p => p !== null);

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          <header className="p-4 flex items-center border-b">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-center flex-grow">Shopping Cart</h1>
            <div className="w-10"></div>
          </header>

          <main className="flex-grow p-4">
            {cartProducts.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Your cart is empty.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartProducts.map(product => {
                        if (!product) return null;
                        const image = findImage(product.images[0]);
                        return (
                             <div key={product.id} className="flex items-center gap-4 bg-card p-3 rounded-lg border">
                                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-emerald-100/50 p-1">
                                    <Image 
                                        src={image?.imageUrl || `https://picsum.photos/seed/${product.id}/200`}
                                        alt={product.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-muted-foreground">{product.category}</p>
                                    <p className="font-bold text-lg mt-1">₹{product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                     <p className="text-sm">Qty: {product.quantity}</p>
                                    <Button variant="outline" size="icon" className="h-9 w-9 text-destructive" onClick={() => removeFromCart(product.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                     <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span>₹{cartProducts.reduce((acc, p) => acc + (p?.price || 0) * (p?.quantity || 0), 0).toFixed(2)}</span>
                        </div>
                        <Button className="w-full mt-4 h-12">Proceed to Checkout</Button>
                    </div>
                </div>
            )}
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
