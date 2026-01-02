
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MainLayout } from '@/components/main-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppState } from '@/components/providers/app-state-provider';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

const CountdownTimer = ({ expiryDate }: { expiryDate: Date }) => {
    const calculateTimeLeft = () => {
        const difference = +expiryDate - +new Date();
        let timeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    
    const format = (num: number) => num.toString().padStart(2, '0');

    if (+expiryDate < +new Date()) {
        return <div className="text-center text-lg font-bold text-destructive">Offer Expired</div>;
    }

    return (
        <div className="flex justify-center gap-2">
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-xl font-bold text-foreground">{format(timeLeft.hours)}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-xl font-bold text-foreground">{format(timeLeft.minutes)}</div>
                <div className="text-xs text-muted-foreground">Min</div>
            </div>
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-xl font-bold text-foreground">{format(timeLeft.seconds)}</div>
                <div className="text-xs text-muted-foreground">Sec</div>
            </div>
        </div>
    );
};

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
);


export default function DealDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;

  const { deals, addToCart, toggleWishlist, isInWishlist, findImage } = useAppState();
  const { toast } = useToast();

  const deal = deals.find(d => d.slug === slug);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
      setIsClient(true);
  }, []);

  if (!deal) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p>Deal not found.</p>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(deal.id, 1, true);
  }

  const handleToggleWishlist = () => {
    toggleWishlist(deal.id);
  }

  const isLiked = isInWishlist(deal.id);
  const mainImage = deal.images && deal.images.length > 0 ? findImage(deal.images[0]) : undefined;
  const progressValue = (deal.sold / deal.stock) * 100;


  return (
    <MainLayout>
      <div className="w-full mx-auto bg-background text-foreground flex flex-col">
        <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
          
          <div className="flex-grow flex items-center text-xs text-muted-foreground overflow-hidden">
            <Link href="/" className="mr-1 shrink-0 hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="mx-1 shrink-0 truncate">Deals</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
            <span className="mx-1 font-medium text-foreground truncate">{deal.name}</span>
          </div>
          <div className="w-10 shrink-0"></div>
        </header>

        <main className="flex-grow p-4 md:p-6 space-y-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="relative aspect-square w-full mb-4">
              <Image 
                src={mainImage?.imageUrl || "https://picsum.photos/seed/deal-main/600/600"}
                alt={deal.name}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                data-ai-hint="deal product image"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl font-bold leading-tight">{deal.name}</h1>
            <div className="flex items-center justify-between">
                <StarRating rating={deal.rating} />
                <Badge variant="destructive">DEAL</Badge>
            </div>
            
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-destructive">₹{deal.discountPrice.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">₹{deal.price.toFixed(2)}</span>
            </div>

            <div className="flex flex-wrap items-stretch gap-2">
                <Button size="lg" className="flex-1 min-w-[150px] h-12 text-base" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 shrink-0" onClick={handleToggleWishlist}>
                    <Heart className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                </Button>
            </div>
          </div>
          
           <div className="bg-card p-4 rounded-lg border space-y-4">
                <h3 className="text-center text-sm font-semibold text-foreground">HURRY UP! OFFER ENDS IN:</h3>
                {isClient && <CountdownTimer expiryDate={new Date(deal.offerEndsAt as any)} />}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Already Sold: <span className="text-foreground font-bold">{deal.sold}</span></span>
                        <span>Available: <span className="text-foreground font-bold">{deal.stock - deal.sold}</span></span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </div>
           </div>

          <div className="space-y-3 text-muted-foreground text-sm">
             <h3 className="font-semibold text-lg text-foreground">Description</h3>
             <p>{deal.description}</p>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
