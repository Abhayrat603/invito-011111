"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, LayoutGrid, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuPageContent } from "@/app/menu/page";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/menu-trigger", icon: MenuIcon, label: "Menu" },
    { href: "/cart", icon: ShoppingBag, label: "Cart" },
    { href: "/", icon: Home, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/profile", icon: LayoutGrid, label: "Profile" },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            if (item.href === "/menu-trigger") {
              return (
                <Sheet key={item.label}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="flex flex-col h-auto p-2 text-muted-foreground">
                      <MenuIcon className="h-10 w-10"/>
                      <span className="text-xs mt-1">{item.label}</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[70%] p-0">
                    <MenuPageContent />
                  </SheetContent>
                </Sheet>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link href={item.href} passHref key={item.label}>
                <Button variant="ghost" className={`flex flex-col h-auto p-2 relative ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <item.icon className="h-10 w-10"/>
                  <span className="text-xs mt-1">{item.label}</span>
                  {(item.label === 'Cart' || item.label === 'Wishlist') && (
                     <span className="absolute top-0 right-0 -mt-1 mr-1 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">0</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
