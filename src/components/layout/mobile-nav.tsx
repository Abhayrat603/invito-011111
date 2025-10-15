"use client";

import Link from "next/link";
import { Home, ShoppingCart, User, Plus, LogOut, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "../providers/auth-provider";
import { useCart } from "../providers/cart-provider";

const mainNavItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: ShoppingCart, label: "Shop" },
  { href: "/account", icon: User, label: "Account" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full px-2">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
          <li>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center justify-center gap-1 p-2 h-auto text-muted-foreground">
                  <Plus className="h-6 w-6" />
                   <span className="text-xs font-medium">More</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-lg">
                <SheetHeader>
                  <SheetTitle>Quick Actions</SheetTitle>
                </SheetHeader>
                <div className="grid gap-3 py-4">
                  <Button variant="outline" asChild className="justify-start gap-3">
                    <Link href="/cart">
                      <ShoppingCart className="h-5 w-5"/>
                      View Cart
                      {totalItems > 0 && <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>}
                    </Link>
                  </Button>
                  {user && (
                    <>
                    <Button variant="outline" asChild className="justify-start gap-3">
                        <Link href="/account/orders">
                            <Package className="h-5 w-5"/>
                            My Orders
                        </Link>
                    </Button>
                    <Separator />
                    <Button variant="destructive" className="justify-start gap-3" onClick={signOut}>
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </Button>
                    </>
                  )}
                  {!user && (
                     <Button asChild className="justify-start gap-3">
                        <Link href="/login">
                            <LogOut className="h-5 w-5" />
                            Sign In
                        </Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </nav>
    </div>
  );
}
