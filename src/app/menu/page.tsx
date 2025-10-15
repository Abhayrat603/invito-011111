
"use client";

import Link from "next/link";
import { X, Plus, ChevronLeft, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

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


export function MenuPageContent() {
    return (
        <div className="w-full h-full bg-background text-foreground flex flex-col">
            <header className="p-4 flex justify-between items-center border-b">
              <h1 className="text-2xl font-bold text-primary">Menu</h1>
              <SheetClose asChild>
                 <Button variant="ghost" size="icon">
                    <X className="h-6 w-6"/>
                 </Button>
              </SheetClose>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
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
        </div>
    );
}


export default function MenuPage() {
    // This default export is now only for direct navigation, 
    // which shouldn't happen with the new sheet-based layout.
    // We keep it for completeness.
    return <MenuPageContent />;
}
