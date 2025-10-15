
"use client";

import Link from "next/link";
import { X, Plus, ChevronLeft, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

const menuItems = [
    { name: "Wedding Invitation", href: "#", expandable: false },
    { name: "Birthday Invitation", href: "#", expandable: false },
    { name: "Engagement Invitation", href: "#", expandable: false },
    { name: "Anniversary Invitation", href: "#", expandable: false },
    { name: "Housewarming Invitation", href: "#", expandable: false },
    { name: "Baby Shower Invitation", href: "#", expandable: false },
    { name: "Graduation Invitation", href: "#", expandable: false },
    { name: "Corporate Invitation", href: "#", expandable: false },
    { name: "Party Invitation", href: "#", expandable: false },
    { name: "E-Invite / Digital Invitation", href: "#", expandable: false },
    { name: "Save-the-Date Card", href: "#", expandable: false },
    { name: "Formal Invitation", href: "#", expandable: false },
    { name: "Casual Invitation", href: "#", expandable: false },
    { name: "Handmade Invitation", href: "#", expandable: false },
    { name: "Poster Presentation", href: "#", expandable: false },
    { name: "Wedding Invitation Video", href: "#", expandable: false },
];

const settingsItems = [
    { name: "Language", href: "#" },
    { name: "Currency", href: "#" },
];

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


export function MenuPageContent() {
    return (
        <div className="w-full h-full bg-background text-foreground flex flex-col">
            <header className="p-4 flex justify-between items-center border-b">
              <h1 className="text-2xl font-bold text-primary">Menu</h1>
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
                        <Mail className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                        <WhatsAppIcon className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                        <Instagram className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-secondary rounded-full">
                        <Facebook className="h-5 w-5 text-muted-foreground" />
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
