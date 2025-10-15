
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, LayoutGrid, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuPageContent } from "@/app/menu/page";
import { cn } from "@/lib/utils";

const NavItem = ({ href, icon: Icon, label, pathname, hasNotification }: { href: string, icon: React.ElementType, label: string, pathname: string, hasNotification?: boolean }) => (
    <Link href={href}>
        <div className={cn("flex flex-col items-center justify-center gap-1 relative", pathname === href ? "text-primary" : "text-muted-foreground")}>
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
            {hasNotification && (
                <div className="absolute top-0 right-1.5 w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    0
                </div>
            )}
        </div>
    </Link>
);


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/menu", icon: MenuIcon, label: "Menu" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", hasNotification: true },
    { href: "/", icon: Home, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", hasNotification: true },
    { href: "/profile", icon: LayoutGrid, label: "Profile" },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-grow pb-24">
        {children}
      </main>

       <Sheet>
        <SheetContent side="left" className="p-0 w-[70vw]">
          <SheetTitle className="hidden">Menu</SheetTitle>
          <MenuPageContent />
        </SheetContent>

        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t max-w-md mx-auto">
            <div className="flex justify-around items-center h-16">
              <SheetTrigger asChild>
                <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground">
                    <MenuIcon className="w-6 h-6" />
                    <span className="text-xs font-medium">Menu</span>
                </div>
              </SheetTrigger>
              {navItems.slice(1).map((item) => (
                <NavItem key={item.href} {...item} pathname={pathname} />
              ))}
            </div>
        </footer>
      </Sheet>
    </div>
  );
}
