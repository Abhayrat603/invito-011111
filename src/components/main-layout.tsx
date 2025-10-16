
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, User, Menu as MenuIcon, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuPageContent } from "@/app/menu/page";
import { cn } from "@/lib/utils";
import { useAppState } from "./providers/app-state-provider";
import Image from "next/image";

const NavItem = ({ href, icon: Icon, label, pathname, count }: { href: string, icon: React.ElementType, label: string, pathname: string, count?: number }) => (
    <Link href={href}>
        <div className={cn("flex flex-col items-center justify-center gap-1 relative", pathname === href ? "text-primary" : "text-amber-900/60 dark:text-amber-200/70")}>
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
            {count !== undefined && count > 0 && (
                <div className="absolute top-0 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                </div>
            )}
        </div>
    </Link>
);


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cart, wishlist } = useAppState();

  const navItems = [
    { href: "/menu", icon: MenuIcon, label: "Menu" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", count: cart.reduce((acc, item) => acc + item.quantity, 0) },
    { href: "/", icon: Home, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", count: wishlist.length },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-grow pb-16 overflow-y-auto">
        {children}
      </main>

      {pathname === '/' && (
           <footer style={{ backgroundColor: '#FCF9EA' }} className="text-amber-950 p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
                    <div>
                        <h3 className="font-bold mb-2">POPULAR CATEGORIES</h3>
                        <ul className="space-y-2 text-sm text-amber-950/70">
                            <li><a href="#" className="hover:underline">Wedding Invitation</a></li>
                            <li><a href="#" className="hover:underline">Birthday Invitation</a></li>
                            <li><a href="#" className="hover:underline">Corporate</a></li>
                            <li><a href="#" className="hover:underline">Party</a></li>
                            <li><a href="#" className="hover:underline">E-Invites</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">PRODUCTS</h3>
                        <ul className="space-y-2 text-sm text-amber-950/70">
                            <li><a href="#" className="hover:underline">New Designs</a></li>
                            <li><a href="#" className="hover:underline">Special Offers</a></li>
                            <li><a href="/request-edit" className="hover:underline">Request For Edit</a></li>
                            <li><a href="/help-center" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">Sitemap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">OUR COMPANY</h3>
                        <ul className="space-y-2 text-sm text-amber-950/70">
                            <li><a href="/about-us" className="hover:underline">About Us</a></li>
                            <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
                            <li><a href="/terms-and-conditions" className="hover:underline">Terms & Conditions</a></li>
                            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">CONTACT</h3>
                        <ul className="space-y-2 text-sm text-amber-950/70">
                           <li className="flex items-start"><Phone className="h-4 w-4 mr-2 mt-1 shrink-0"/>+91 8463062603</li>
                            <li className="flex items-start"><Mail className="h-4 w-4 mr-2 mt-1 shrink-0"/>abhayrat603@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-amber-900/20 pt-6">
                     <div className="flex justify-center items-center gap-4 mb-4">
                        <h3 className="font-bold">FOLLOW US</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-amber-950/70 hover:text-amber-950"><Facebook /></a>
                            <a href="#" className="text-amber-950/70 hover:text-amber-950"><Instagram /></a>
                            <a href="#" className="text-amber-950/70 hover:text-amber-950"><Twitter /></a>
                            <a href="#" className="text-amber-950/70 hover:text-amber-950"><Linkedin /></a>
                        </div>
                    </div>
                    <p className="text-center text-xs text-amber-950/60">Copyright &copy; Invite Designer All Rights Reserved.</p>
                </div>
            </footer>
        )}


       <Sheet>
        <SheetContent side="left" className="p-0 w-[90vw]">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">The main navigation menu for the application.</SheetDescription>
          <MenuPageContent />
        </SheetContent>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t max-w-md mx-auto z-20">
            <div className="flex justify-around items-center h-16">
              <SheetTrigger asChild>
                <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground cursor-pointer text-amber-900/60 dark:text-amber-200/70">
                    <MenuIcon className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Menu</span>
                </div>
              </SheetTrigger>
              {navItems.slice(1).map((item) => (
                <NavItem key={item.href} {...item} pathname={pathname} />
              ))}
            </div>
        </nav>
      </Sheet>
    </div>
  );
}
