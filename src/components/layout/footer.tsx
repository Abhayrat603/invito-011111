import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold font-headline">E-motion Commerce</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Dynamic apparel for your active life.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Shop</h4>
            <ul className="mt-2 space-y-2">
              <li><Link href="/shop?category=apparel" className="text-sm hover:underline">Apparel</Link></li>
              <li><Link href="/shop?category=footwear" className="text-sm hover:underline">Footwear</Link></li>
              <li><Link href="/shop?category=accessories" className="text-sm hover:underline">Accessories</Link></li>
              <li><Link href="/shop?category=gear" className="text-sm hover:underline">Gear</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-2 space-y-2">
              <li><Link href="/contact" className="text-sm hover:underline">Contact Us</Link></li>
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-sm hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex mt-2 space-x-4">
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="GitHub"><Github className="h-6 w-6 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-motion Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
