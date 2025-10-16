
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

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cart, addOrder, clearCart, products, deals, updateDealStockOnOrder } = useAppState();
    
    const allItems: (Product | DealProductType)[] = [...products, ...deals];

    const cartProducts = cart.map(cartItem => {
        const product = allItems.find(p => p.id === cartItem.productId);
        if (product) {
            const price = 'discountPrice' in product ? product.discountPrice : product.price;
            return { ...product, quantity: cartItem.quantity, displayPrice: price };
        }
        return null;
    }).filter((p): p is NonNullable<typeof p> => p !== null);

    const total = cartProducts.reduce((acc, p) => acc + (p.displayPrice * p.quantity), 0);

    const handlePayment = async () => {
        setIsSubmitting(true);

        if (!user) {
            toast({
                variant: "destructive",
                title: "Not logged in",
                description: "You must be logged in to make a purchase."
            });
            setIsSubmitting(false);
            return;
        }

        const razorpayOptions = {
            key: "rzp_test_YourKeyId", 
            amount: total * 100, 
            currency: "INR",
            name: "Invite Designer",
            description: "Invitation Card Purchase",
            image: "https://i.ibb.co/L9LcfJ3/testimonial-alan.jpg",
            handler: async function (response: any) {
                // This function is ONLY called after a SUCCESSFUL payment.
                try {
                    const orderData: Omit<Order, 'id' | 'createdAt' | 'userId'> = {
                        items: cartProducts.map(p => ({
                            productId: p.id,
                            productName: p.name,
                            quantity: p.quantity,
                            price: p.displayPrice
                        })),
                        total: total,
                        status: 'Placed',
                    };

                    const newOrderId = await addOrder(orderData);
                    await updateDealStockOnOrder(cartProducts);
                    await clearCart();
                    
                    toast({
                        title: "Payment Successful!",
                        description: `Your order #${newOrderId} has been placed.`,
                    });

                    // Redirect to the download/confirmation page
                    router.push(`/order-confirmation/${newOrderId}`);

                } catch (error) {
                    console.error("Error processing order after payment:", error);
                    toast({
                        variant: "destructive",
                        title: "Order Processing Failed",
                        description: "Your payment was successful, but we failed to create your order. Please contact support.",
                    });
                     setIsSubmitting(false);
                }
            },
            prefill: {
                name: user.displayName || "Valued Customer",
                email: user.email || "",
                contact: user.phoneNumber || "",
            },
            notes: {
                address: "Invite Designer Corporate Office",
            },
            theme: {
                color: "#694736",
            },
            modal: {
                ondismiss: function() {
                    // This function is called when the user closes the payment window.
                    // We consider this a failed/cancelled payment.
                    toast({
                        variant: "destructive",
                        title: "Payment Cancelled",
                        description: "The payment process was not completed.",
                    });
                    setIsSubmitting(false);
                }
            }
        };

        const razorpayInstance = new window.Razorpay(razorpayOptions);
        
        razorpayInstance.on('payment.failed', function (response: any) {
            // This function is called when the payment fails.
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: response.error.description || "Please try again later.",
            });
            setIsSubmitting(false);
        });

        razorpayInstance.open();
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
                            <div className="bg-card p-4 rounded-lg border space-y-4">
                               <Alert>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Test Mode Enabled</AlertTitle>
                                    <AlertDescription>
                                        You are currently in a test payment environment. No real money will be charged.
                                    </AlertDescription>
                                </Alert>
                                 <div className="flex justify-center items-center p-4 rounded-lg bg-muted/50">
                                   <Image src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" width={100} height={40}/>
                                </div>
                                <Button className="w-full h-12" onClick={handlePayment} disabled={isSubmitting || cartProducts.length === 0}>
                                    {isSubmitting ? (
                                        <Loader2 className="animate-spin mr-2"/>
                                    ) : `Pay ₹${total.toFixed(2)}`}
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
