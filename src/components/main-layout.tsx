
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, User, Menu as MenuIcon, Mail, Sparkles, Plus, X, Search, LogOut, Crop } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuPageContent } from "@/app/menu/page";
import { cn } from "@/lib/utils";
import { useAppState } from "./providers/app-state-provider";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "./providers/auth-provider";

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


export function MainLayout({ children, onSearch }: { children: React.ReactNode, onSearch?: (query: string) => void }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { cart, wishlist } = useAppState();
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const getUserInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  }

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
    setIsSearchOpen(false);
  }

  const navItems = [
    { href: "/menu", icon: MenuIcon, label: "Menu" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", count: cart.reduce((acc, item) => acc + item.quantity, 0) },
    { href: "/", icon: Home, label: "Home" },
    { href: "/wishlist", icon: Heart, label: "Wishlist", count: wishlist.length },
    { href: "/profile", icon: User, label: "Profile" },
  ];
  
  const showHeader = !['/login', '/signup', '/forgot-password', '/verify-email'].includes(pathname);

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
       {showHeader && (
         <header className="px-4 py-2 flex items-center justify-between gap-4 border-b sticky top-0 bg-background z-30">
            <Link href="/" className="flex items-center gap-2">
                <div className="bg-[#694736] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                    I
                </div>
                <h1 className="text-xl font-bold">Invitedit</h1>
            </Link>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(prev => !prev)}>
                  <Search className="h-5 w-5" />
              </Button>
            </div>
         </header>
      )}
      {isSearchOpen && (
        <div className="p-4 border-b bg-background sticky top-[61px] z-20">
           <div className="relative">
              <Input
                placeholder="Search products..."
                className="bg-card border-border rounded-full h-9 pl-4 pr-10 text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
              {searchQuery ? (
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full" onClick={handleClearSearch}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              ) : (
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              )}
            </div>
        </div>
      )}
      <main ref={mainContentRef} className="flex-grow pb-16 overflow-y-auto">
        {children}
      </main>

       <Sheet>
        <SheetContent side="left" className="p-0 w-[90vw]">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">The main navigation menu for the application.</SheetDescription>
          <MenuPageContent />
        </SheetContent>

        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t max-w-md mx-auto z-40">
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
        {pathname === '/' && (
            <div className="fixed bottom-24 right-5 z-30 flex flex-col items-end gap-3">
                {isFabMenuOpen && (
                    <div className="flex flex-col items-end gap-4 transition-all duration-300">
                        <Link href="/ai-help" className="flex items-center gap-3" aria-label="Help with AI">
                            <span className="bg-background text-foreground text-[10px] font-medium px-2 py-1 rounded-full shadow-lg">Help with AI</span>
                            <div className="rounded-full shadow-lg flex items-center justify-center w-10 h-10">
                                <Image src="https://i.ibb.co/VYXGRgSc/IMG-20251016-080138.png" alt="AI Help" width={40} height={40} />
                            </div>
                        </Link>
                        <Link href="mailto:abhayrat603@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" aria-label="Send an email">
                           <span className="bg-background text-foreground text-[10px] font-medium px-2 py-1 rounded-full shadow-lg">Email</span>
                            <div className="rounded-full shadow-lg flex items-center justify-center w-10 h-10">
                                <Image src="https://i.ibb.co/WNxMRJ2v/vecteezy-gmail-png-icon-16716465.png" alt="Email" width={40} height={40} />
                            </div>
                        </Link>
                        <Link href="https://wa.me/918463062603" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" aria-label="Chat on WhatsApp">
                            <span className="bg-background text-foreground text-[10px] font-medium px-2 py-1 rounded-full shadow-lg">WhatsApp</span>
                            <div className="relative rounded-full shadow-lg flex items-center justify-center w-10 h-10 overflow-hidden">
                                <Image src="https://i.ibb.co/Z1WdFS28/vecteezy-whatsapp-logo-png-whatsapp-icon-png-whatsapp-transparent-18930748.png" alt="WhatsApp" layout="fill" objectFit="cover" />
                            </div>
                        </Link>
                    </div>
                )}
                <div className="flex flex-col items-center">
                    <Button
                        onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
                        className="bg-transparent text-white rounded-full w-10 h-10 shadow-lg hover:bg-transparent transition-transform duration-300 flex items-center justify-center p-0"
                        aria-label="Toggle contact menu"
                    >
                        {isFabMenuOpen ? <X className="h-5 w-5 text-slate-700" /> : <Image src="https://i.ibb.co/8ZyBd6d/contact-us.png" alt="Contact Us" width={40} height={40} />}
                    </Button>
                    {!isFabMenuOpen && <span className="text-xs font-medium text-slate-700 mt-1">Contact</span>}
                </div>
            </div>
        )}
    </div>
  );
}
