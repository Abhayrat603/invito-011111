
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, LayoutGrid, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuPageContent } from "@/app/menu/page";

export function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full max-w-md mx-auto bg-background text-foreground min-h-screen flex flex-col">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}

  