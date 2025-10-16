
"use client";

import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Product, DealProduct as DealProductType, Order } from "@/lib/types";
import Image from "next/image";

export default function CheckoutPage() {
    const router = useRouter();
    const { toast } = useToast();
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
        setIsSubmitting(true);
        console.log("Simulating Razorpay payment for:", `₹${total.toFixed(2)}`);

        // Check if a deal product in the cart has already been purchased.
        for (const cartItem of cartProducts) {
            if (cartItem && 'discountPrice' in cartItem) { // It's a deal product
                const alreadyPurchased = orders.some(order => 
                    order.items.some(item => item.productId === cartItem.id)
                );
                if (alreadyPurchased) {
                    toast({
                        variant: "destructive",
                        title: "Purchase limit reached",
                        description: `You have already purchased the deal "${cartItem.name}".`,
                    });
                    setIsSubmitting(false);
                    return;
                }
            }
        }
        
        // Simulate API call to Razorpay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create a new order object
        const newOrder: Order = {
            id: `ord${Date.now()}`,
            items: cartProducts.map(p => ({
                productId: p!.id,
                productName: p!.name,
                quantity: p!.quantity,
                price: p!.displayPrice,
            })),
            total: total,
            status: 'Delivered', // Simulating instant delivery for digital goods
            createdAt: new Date(),
        };

        // Decrease stock for deal products
        updateDealStockOnOrder(cartProducts);

        // Add order to state and clear cart
        addOrder(newOrder);
        clearCart();
        
        toast({
            title: "Payment Successful",
            description: `Your payment of ₹${total.toFixed(2)} has been processed.`,
        });
        
        setIsSubmitting(false);
        router.push(`/order-confirmation/${newOrder.id}`);
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
                            <div className="bg-card p-4 rounded-lg border text-center">
                                <p className="text-muted-foreground mb-4">Click the button below to complete your payment securely with Razorpay.</p>
                                <Button 
                                    onClick={handlePayment} 
                                    className="w-full h-12 bg-[#02042b] hover:bg-[#02042b]/90 text-white" 
                                    disabled={isSubmitting || total === 0}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <Image src="https://razorpay.com/favicon.ico" alt="Razorpay" width={24} height={24} className="mr-2"/>
                                            <span>Pay ₹{total.toFixed(2)} with Razorpay</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
