
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, CreditCard, User, Calendar, Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { products as allProducts, dealProduct, dealProduct2, dealProduct3 } from "@/lib/mock-data";
import { Product, DealProduct as DealProductType } from "@/lib/types";

const formSchema = z.object({
  cardholderName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  cardNumber: z.string().length(16, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "Invalid expiry date. Use MM/YY format." }),
  cvc: z.string().length(3, { message: "CVC must be 3 digits." }),
});

const allItems: (Product | DealProductType)[] = [...allProducts, dealProduct, dealProduct2, dealProduct3];


export default function CheckoutPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cart } = useAppState();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cardholderName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
        },
    });

    const cartProducts = cart.map(cartItem => {
        const product = allItems.find(p => p.id === cartItem.productId);
        if (product) {
            const price = 'discountPrice' in product ? product.discountPrice : product.price;
            return { ...product, quantity: cartItem.quantity, displayPrice: price };
        }
        return null;
    }).filter(p => p !== null);

    const total = cartProducts.reduce((acc, p) => acc + (p?.displayPrice || 0) * (p?.quantity || 0), 0);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        console.log("Processing payment for:", values);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
            title: "Payment Successful",
            description: `Your payment of ₹${total.toFixed(2)} has been processed.`,
        });
        setIsSubmitting(false);
        // Here you would typically clear the cart
        router.push("/history");
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Checkout</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                            <div className="bg-card p-4 rounded-lg border">
                                {cartProducts.map(item => item && (
                                    <div key={item.id} className="flex justify-between text-sm py-1">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>₹{(item.displayPrice * item.quantity).toFixed(2)}</span>
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-card p-4 rounded-lg border">
                                     <FormField
                                        control={form.control}
                                        name="cardholderName"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cardholder Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                  <Input placeholder="John Doe" {...field} className="pl-10"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Card Number</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                  <Input placeholder="0000 0000 0000 0000" {...field} className="pl-10" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-4">
                                        <FormField
                                            control={form.control}
                                            name="expiryDate"
                                            render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Expiry Date</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                      <Input placeholder="MM/YY" {...field} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="cvc"
                                            render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>CVC</FormLabel>
                                                <FormControl>
                                                     <div className="relative">
                                                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                      <Input placeholder="123" {...field} className="pl-10" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full mt-4 h-12" disabled={isSubmitting || total === 0}>
                                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : `Pay ₹${total.toFixed(2)}`}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
