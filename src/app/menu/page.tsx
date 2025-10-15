
"use client";

import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";
import { Home, ShoppingBag, Heart, LayoutGrid, Menu as MenuIcon, X, Plus, ChevronLeft, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
    { name: "Home", href: "/", expandable: false },
    { name: "Men's", href: "#", expandable: true },
    { name: "Women's", href: "#", expandable: true },
    { name: "Jewelry", href: "#", expandable: true },
    { name: "Perfume", href: "#", expandable: true },
    { name: "Blog", href: "#", expandable: false },
    { name: "Hot Offers", href: "#", expandable: false },
];

const settingsItems = [
    { name: "Language", href: "#" },
    { name: "Currency", href: "#" },
];

export default function MenuPage() {
  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
        <header className="p-4 flex justify-between items-center border-b">
          <h1 className="text-2xl font-bold text-primary">Menu</h1>
          <Link href="/" passHref>
             <Button variant="ghost" size="icon">
                <X className="h-6 w-6"/>
             </Button>
          </Link>
        </header>

        <main className="flex-grow p-4">
          <nav className="flex flex-col h-full">
            <ul className="flex-grow space-y-2">
                {menuItems.map((item) => (
                    <li key={item.name} className="border-b">
                        <Link href={item.href} passHref>
                            <div className="flex justify-between items-center py-4 text-lg">
                                <span>{item.name}</span>
                                {item.expandable && <Plus className="h-5 w-5 text-muted-foreground" />}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="space-y-2 py-4">
                 {settingsItems.map((item) => (
                    <Link href={item.href} key={item.name}>
                        <div className="flex justify-between items-center py-3 text-lg">
                            <span>{item.name}</span>
                            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                        </div>
                    </Link>
                 ))}
            </div>
            
            <div className="flex justify-center items-center space-x-4 py-4">
                <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                    <Facebook className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                    <Twitter className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                    <Instagram className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                </Button>
            </div>
          </nav>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
          <div className="flex justify-around items-center h-20">
            <Link href="/menu" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-primary">
                <MenuIcon className="h-10 w-10"/>
                <span className="text-xs mt-1">Menu</span>
              </Button>
            </Link>
            <Link href="/cart" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground relative">
                <ShoppingBag className="h-10 w-10"/>
                <span className="text-xs mt-1">Cart</span>
                <span className="absolute top-0 right-0 -mt-1 mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                <Home className="h-10 w-10"/>
                <span className="text-xs mt-1">Home</span>
              </Button>
            </Link>
            <Link href="/wishlist" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground relative">
                <Heart className="h-10 w-10"/>
                <span className="text-xs mt-1">Wishlist</span>
                 <span className="absolute top-0 right-0 -mt-1 mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
              </Button>
            </Link>
            <Link href="/profile" passHref>
              <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                <LayoutGrid className="h-10 w-10"/>
                <span className="text-xs mt-1">Profile</span>
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    </AuthRedirect>
  );
}
