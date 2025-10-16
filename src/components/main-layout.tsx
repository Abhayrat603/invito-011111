
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, User, Menu as MenuIcon, Mail, Sparkles, Plus, X } from "lucide-react";
import Image from "next/image";
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
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { cart, wishlist } = useAppState();
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const navItems = [
    { href: "/menu", icon: MenuIcon, label: "Menu" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", count: cart.reduce((acc, item) => acc + item.quantity, 0) },
    { href: "/", icon: Home, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", count: wishlist.length },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
      <main ref={mainContentRef} className="flex-grow pb-16 overflow-y-auto">
        {children}
      </main>

      {pathname === '/' && (
           <footer style={{ backgroundColor: '#FCF9EA' }} className="text-amber-950 p-6">
                <div className="grid grid-cols-1 gap-8 mb-6">
                    <div>
                        <h3 className="font-bold mb-2">POPULAR CATEGORIES</h3>
                        <ul className="space-y-2 text-sm text-amber-950/70">
                            <li><a href="/products/classic-wedding-invitation" className="hover:underline">Wedding Invitation</a></li>
                            <li><a href="/products/modern-birthday-bash" className="hover:underline">Birthday Invitation</a></li>
                            <li><a href="/products/corporate-gala-invite" className="hover:underline">Corporate</a></li>
                            <li><a href="/products/summer-pool-party" className="hover:underline">Party</a></li>
                            <li><a href="/products/classic-wedding-invitation" className="hover:underline">E-Invites</a></li>
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
                            <li className="flex items-start"><WhatsAppIcon className="h-4 w-4 mr-2 mt-1 shrink-0"/>+91 8463062603</li>
                            <li className="flex items-start"><Mail className="h-4 w-4 mr-2 mt-1 shrink-0"/>abhayrat603@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-amber-900/20 pt-6">
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
        <div className="fixed bottom-24 right-5 z-30 flex flex-col items-center gap-3">
             {isFabMenuOpen && (
                <div className="flex flex-col items-center gap-3 transition-all duration-300">
                    <Link
                        href="/ai-help"
                        className="rounded-full shadow-lg flex items-center justify-center w-12 h-12"
                        aria-label="Help with AI"
                    >
                        <Image src="https://i.ibb.co/VYXGRgSc/IMG-20251016-080138.png" alt="AI Help" width={48} height={48} />
                    </Link>
                    <Link
                        href="mailto:abhayrat603@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full shadow-lg flex items-center justify-center w-12 h-12"
                        aria-label="Send an email"
                    >
                        <Image src="https://i.ibb.co/WNxMRJ2v/vecteezy-gmail-png-icon-16716465.png" alt="Email" width={48} height={48} />
                    </Link>
                    <Link 
                        href="https://wa.me/918463062603"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full shadow-lg flex items-center justify-center w-12 h-12"
                        aria-label="Chat on WhatsApp"
                    >
                        <Image src="https://i.ibb.co/CshBY6P/vecteezy-whatsapp-logo-png-whatsapp-icon-png-whatsapp-transparent-18930748.png" alt="WhatsApp" width={52} height={52} />
                    </Link>
                </div>
            )}
             <Button
                onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
                className="bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-700 transition-transform duration-300 flex items-center justify-center"
                aria-label="Toggle contact menu"
            >
                {isFabMenuOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </Button>
        </div>
    </div>
  );
}
