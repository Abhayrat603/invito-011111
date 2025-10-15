"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart" className="relative" aria-label={`Cart with ${totalItems} items`}>
        <ShoppingBag />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
}
