
"use client";

import Link from "next/link";
import { ChevronRight, Facebook, Instagram, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppState } from "@/components/providers/app-state-provider";
import { getIconByName } from "@/lib/icon-map";
import { useMemo } from "react";


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
    const pathname = usePathname();
    const { menuItems } = useAppState();

    const sortedMenuItems = useMemo(() => {
        return [...menuItems].sort((a, b) => a.order - b.order);
    }, [menuItems]);

    return (
        <div className="w-full h-full bg-background text-foreground flex flex-col">
            <header className="p-4 flex justify-between items-center border-b">
              <h1 className="text-2xl font-bold text-primary">Menu</h1>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                </Button>
              </SheetClose>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
              <nav className="flex flex-col h-full">
                <ul className="flex-grow space-y-1">
                    {sortedMenuItems.map((item) => {
                        const Icon = getIconByName(item.icon);
                        return (
                            <li key={item.id}>
                                <SheetClose asChild>
                                    <Link href={item.href} passHref>
                                        <div className={cn(
                                            "flex justify-between items-center py-3 px-3 rounded-md transition-colors",
                                            pathname === item.href ? "bg-primary/10 text-primary font-semibold" : "hover:bg-accent"
                                        )}>
                                            <div className="flex items-center overflow-hidden">
                                                <Icon className="h-5 w-5 mr-3 text-primary/80 shrink-0" />
                                                <span className="text-sm truncate">{item.name}</span>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                                        </div>
                                    </Link>
                                </SheetClose>
                            </li>
                        )
                    })}
                </ul>
                
                <div className="flex justify-center items-center space-x-4 py-4 mt-4 border-t">
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
