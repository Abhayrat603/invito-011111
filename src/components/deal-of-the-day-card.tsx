
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAppState } from './providers/app-state-provider';
import type { DealProduct } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
}

interface Countdown {
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer = ({ expiryDate }: { expiryDate: Date }) => {
    const calculateTimeLeft = () => {
        const difference = +expiryDate - +new Date();
        let timeLeft: Countdown = { hours: 0, minutes: 0, seconds: 0 };

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

    return (
        <div className="flex justify-center gap-2">
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-lg font-bold text-foreground">{format(timeLeft.hours)}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
            </div>
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-lg font-bold text-foreground">{format(timeLeft.minutes)}</div>
                <div className="text-xs text-muted-foreground">Min</div>
            </div>
            <div className="bg-muted p-2 rounded-lg text-center w-16">
                <div className="text-lg font-bold text-foreground">{format(timeLeft.seconds)}</div>
                <div className="text-xs text-muted-foreground">Sec</div>
            </div>
        </div>
    );
};

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-0.5 text-yellow-500">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 fill-current" />)}
            {halfStar && <StarHalf className="h-4 w-4 fill-current" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4" />)}
        </div>
    );
};

export function DealOfTheDayCard({ product }: { product: DealProduct }) {
    const { addToCart } = useAppState();
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || new Date() > product.offerEndsAt) {
        return null; // Don't render if the offer has expired or on server
    }

    const handleAddToCart = () => {
        addToCart(product.id);
        toast({
            title: 'Added to Cart',
            description: `${product.name} has been added to your cart.`
        });
    };

    const productImage = findImage(product.images[0]);
    const progressValue = (product.sold / product.stock) * 100;

    return (
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border">
            <div className="p-4 flex flex-col items-center">
                {productImage && (
                    <Image
                        src={productImage.imageUrl}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="object-contain"
                        data-ai-hint="old spice product"
                    />
                )}
            </div>
            <div className="p-4 space-y-3">
                <StarRating rating={product.rating} />
                <h3 className="font-semibold text-base leading-tight truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-destructive">₹{product.discountPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={handleAddToCart}>
                    Add to Cart
                </Button>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Already Sold: <span className="text-foreground font-bold">{product.sold}</span></span>
                        <span>Available: <span className="text-foreground font-bold">{product.stock - product.sold}</span></span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </div>
                <div className="text-center space-y-2 pt-2">
                    <p className="text-xs font-semibold text-foreground">HURRY UP! OFFER ENDS IN:</p>
                    <CountdownTimer expiryDate={product.offerEndsAt} />
                </div>
            </div>
        </div>
    );
}
