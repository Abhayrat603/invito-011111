
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { useAppState } from "@/components/providers/app-state-provider";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product, DealProduct } from "@/lib/types";

export default function WishlistPage() {
    const { wishlist, products, deals } = useAppState();

    const allItems: (Product | DealProduct)[] = [...products, ...deals];

    const wishlistProducts = wishlist.map(wishlistItem => {
        return allItems.find(p => p.id === wishlistItem.productId);
    }).filter((p): p is Product => p !== undefined);

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          <main className="flex-grow p-4">
            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center text-center">
                    <p className="text-lg text-muted-foreground mb-4">Your wishlist is empty.</p>
                    <p className="text-sm text-muted-foreground mb-6">Explore our collections and add your favorite designs!</p>
                    <Link href="/">
                      <Button>Discover Invitations</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {wishlistProducts.map(product => product && (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
          </main>
        </div>
      </MainLayout>
    </AuthRedirect>
  );
}
