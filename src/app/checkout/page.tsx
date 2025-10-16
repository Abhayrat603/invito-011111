
"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { Product, DealProduct as DealProductType, Order } from "@/lib/types";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CheckoutPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cart, addOrder, clearCart, orders, products, deals, updateDealStockOnOrder } = useAppState();
    
    const allItems: (Product | DealProductType)[] = [...products, ...deals];

    const cartProducts = cart.map(cartItem => {
        const product = allItems.find(p => p.id === cartItem.productId);
        if (product) {
            const price = 'discountPrice' in product ? product.discountPrice : product.price;
            return { ...product, quantity: cartItem.quantity, displayPrice: price };
        }
        return null;
    }).filter(p => p !== null);

    const total = cartProducts.reduce((acc, p) => acc + (p?.displayPrice || 0) * (p?.quantity || 0), 0);

    const handlePayment = async () => {
        // This function is now a placeholder.
        // A real payment integration would be required here.
        toast({
            variant: "destructive",
            title: "Payment Gateway Not Configured",
            description: "This is a placeholder. A real payment gateway like Razorpay or Stripe must be integrated to process payments."
        });
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                
                <main className="flex-grow p-4">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                            <div className="bg-card p-4 rounded-lg border">
                                {cartProducts.map(item => item && (
                                    <div key={item.id} className="flex justify-between text-sm py-1">
                                        <span className="truncate pr-4">{item.name} x {item.quantity}</span>
                                        <span className="whitespace-nowrap">₹{(item.displayPrice * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="border-t my-2"></div>
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Action Required: Payment Gateway</AlertTitle>
                                <AlertDescription>
                                    This checkout is for demonstration purposes only. To accept real payments, you must integrate a payment provider like Razorpay or Stripe. This involves creating an account with the provider, getting API keys, and implementing both client-side and server-side code.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
