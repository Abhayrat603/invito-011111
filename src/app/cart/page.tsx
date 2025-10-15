
"use client";

import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Home, ShoppingBag, Heart, LayoutGrid, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
        <header className="p-4 border-b">
          <h1 className="text-2xl font-bold text-center">Shopping Cart</h1>
        </header>

        <main className="flex-grow p-4">
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Your cart is empty.</p>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
          <div className="flex justify-around items-center h-20">
            <Link href="/menu" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                <Menu className="h-8 w-8"/>
                <span className="text-xs mt-1">Menu</span>
              </Button>
            </Link>
            <Link href="/cart" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-primary relative">
                <ShoppingBag className="h-8 w-8"/>
                <span className="text-xs mt-1">Cart</span>
                <span className="absolute top-0 right-0 -mt-1 mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                <Home className="h-8 w-8"/>
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/wishlist" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground relative">
                <Heart className="h-8 w-8"/>
                <span className="text-xs mt-1">Wishlist</span>
                 <span className="absolute top-0 right-0 -mt-1 mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
              </Button>
            </Link>
            <Link href="/profile" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                <LayoutGrid className="h-8 w-8"/>
                <span className="text-xs mt-1">Profile</span>
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </AuthRedirect>
  );
}
