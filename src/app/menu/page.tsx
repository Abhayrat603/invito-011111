
"use client";

import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppState } from "@/components/providers/app-state-provider";
import { getIconByName } from "@/lib/icon-map";
import { useMemo } from "react";


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
              </nav>
            </main>
        </div>
    );
}


export default function MenuPage() {
    // Render a simple fallback when navigated directly to /menu,
    // avoiding the Sheet context-only components used inside MenuPageContent.
    return (
        <div className="w-full h-full bg-background text-foreground flex flex-col">
            <header className="p-4 border-b">
                <h1 className="text-2xl font-bold text-primary">Menu</h1>
            </header>
            <main className="p-6 space-y-4">
                <p className="text-muted-foreground">
                    Open the menu from the bottom navigation on the home page.
                </p>
                <Link href="/">
                    <Button>Go to Home</Button>
                </Link>
            </main>
        </div>
    );
}
