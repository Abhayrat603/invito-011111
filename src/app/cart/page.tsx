"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import Image from "next/image";
import { products as allProducts, dealProduct, dealProduct2, dealProduct3 } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Product, DealProduct as DealProductType } from "@/lib/types";

const findImage = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id);
};

const allItems: (Product | DealProductType)[] = [...allProducts, dealProduct, dealProduct2, dealProduct3];

export default function CartPage() {
    const router = useRouter();
    const { cart, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useAppState();

    const cartProducts = cart.map(cartItem => {
        const product = allItems.find(p => p.id === cartItem.productId);
        if (product) {
            const price = 'discountPrice' in product ? product.discountPrice : product.price;
            return { ...product, quantity: cartItem.quantity, displayPrice: price };
        }
        return null;
    }).filter(p => p !== null);

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          

          <main className="flex-grow p-4">
            {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-muted-foreground text-lg mb-4">Your cart is empty.</p>
                    <Link href="/">
                      <Button>Continue Shopping</Button>
                    </Link>
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
                                    <p className="font-bold text-lg mt-1 text-destructive">₹{product.displayPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                     <div className="flex items-center gap-2">
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => decreaseCartQuantity(product.id)}>
                                            <Minus className="h-4 w-4"/>
                                        </Button>
                                        <span className="font-bold text-base w-5 text-center">{product.quantity}</span>
                                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => increaseCartQuantity(product.id)}>
                                            <Plus className="h-4 w-4"/>
                                        </Button>
                                     </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70" onClick={() => removeFromCart(product.id)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                     <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total</span>
                            <span className="text-destructive">₹{cartProducts.reduce((acc, p) => acc + (p?.displayPrice || 0) * (p?.quantity || 0), 0).toFixed(2)}</span>
                        </div>
                        <Link href="/checkout" passHref>
                          <Button className="w-full mt-4 h-12">Proceed to Checkout</Button>
                        </Link>
                    </div>
                </div>
            )}
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}