import Link from "next/link";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Product", new: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HeartHomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 12.16c.36.33.64.7.84 1.1.48.96.48 2.14 0 3.1-.48.96-1.34 1.64-2.34 1.64H11c-1.33 0-2.54-.54-3.4-1.4l-2.6-2.6c-.33-.33-.52-.77-.52-1.24v-2.32c0-1.02.83-1.85 1.85-1.85h.65M18 8.84a2.95 2.95 0 0 0-4.17 0l-.18.18-.18-.18a2.95 2.95 0 0 0-4.17 0c-1.15 1.15-1.15 3.02 0 4.17l4.35 4.35 4.35-4.35c1.15-1.15 1.15-3.02 0-4.17Z"/><path d="m2 13 6-6"/>
    </svg>
)


export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6 md:px-10 py-4 rounded-t-2xl">
      <div className="flex h-12 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2 text-accent">
            <HeartHomeIcon className="h-8 w-8" />
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground relative"
              >
                {link.label}
                {link.new && (
                  <Badge variant="secondary" className="absolute -top-3 -right-5 bg-[#FADCD0] text-[#D0995B] text-[10px] px-1.5 py-0.5">New</Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Input type="search" placeholder="Type here" className="h-10 rounded-full pl-10 pr-4 bg-background border-none w-48"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/50"/>
          </div>
          <Button asChild variant="ghost" size="icon" className="bg-background rounded-full text-accent h-10 w-10">
            <Link href="/account">
                <User />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
