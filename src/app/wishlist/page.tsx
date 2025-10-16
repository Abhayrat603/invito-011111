
"use client";

import { AuthRedirect } from "@/components/auth-redirect";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import { products as allProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export default function WishlistPage() {
    const router = useRouter();
    const { wishlist } = useAppState();

    const wishlistProducts = wishlist.map(wishlistItem => {
        return allProducts.find(p => p.id === wishlistItem.productId);
    }).filter(p => p !== undefined);

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <MainLayout>
        <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
          

          <main className="flex-grow p-4">
            {wishlistProducts.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
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
