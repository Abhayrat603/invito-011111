"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/cart-provider";
import { AuthRedirect } from "@/components/auth-redirect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { placeOrderAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import type { Product } from "@/lib/types";
import useSWR from "swr";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

const fetchProductsForCart = async (productIds: string[]): Promise<Product[]> => {
    if (productIds.length === 0) return [];
    const productsQuery = query(collection(db, "products"), where("id", "in", productIds));
    const querySnapshot = await getDocs(productsQuery);
    return querySnapshot.docs.map(doc => doc.data() as Product);
};

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const productIds = items.map(item => item.productId);
  const { data: products, isLoading: isProductsLoading } = useSWR(
      productIds.length > 0 ? `cartProducts/${productIds.join(',')}` : null,
      () => fetchProductsForCart(productIds)
  );

  const cartDetails = items.map(item => {
    const product = products?.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: product ? product.price * item.quantity : 0,
    };
  });

  const total = cartDetails.reduce((sum, item) => sum + item.subtotal, 0);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      const { orderId } = await placeOrderAction();
      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase.",
      });
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to place order. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthRedirect to="/login" condition="is-not-auth">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery details.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {isProductsLoading && <div className="space-y-2">
                    <Skeleton className="h-6 w-full"/>
                    <Skeleton className="h-6 w-full"/>
                </div>}

                <div className="space-y-2 mb-4">
                    {cartDetails.map(item => item.product && (
                        <div key={item.productId} className="flex justify-between text-sm">
                            <p className="text-muted-foreground line-clamp-1 mr-2">{item.product.name} x {item.quantity}</p>
                            <p className="font-medium">${item.subtotal.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>

                <Button onClick={handlePlaceOrder} disabled={isLoading} size="lg" className="w-full mt-6">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
}
