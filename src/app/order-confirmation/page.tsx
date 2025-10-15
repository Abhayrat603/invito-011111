"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

const fetchOrder = async (orderId: string): Promise<Order | null> => {
  const orderRef = doc(db, "orders", orderId);
  const docSnap = await getDoc(orderRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Order;
  }
  return null;
};

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data: order, error, isLoading } = useSWR(
    orderId ? `order/${orderId}` : null,
    () => fetchOrder(orderId!)
  );

  if (isLoading) {
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader className="text-center items-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-8 w-48 mt-4" />
                <Skeleton className="h-5 w-64 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                </div>
                 <Skeleton className="h-12 w-full mt-6" />
            </CardContent>
        </Card>
    );
  }

  if (error || !order) {
    return (
        <Card className="w-full max-w-2xl text-center">
             <CardHeader>
                <CardTitle>Order Not Found</CardTitle>
                <CardDescription>We couldn't find the order you're looking for.</CardDescription>
             </CardHeader>
             <CardContent>
                 <Button asChild>
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
             </CardContent>
        </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center items-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
        <CardTitle className="text-2xl font-bold">Thank You for Your Order!</CardTitle>
        <CardDescription>
          Your order #{order.id.substring(0, 7)} has been placed successfully.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
          We've sent a confirmation email to you. You can view your order details in your account.
        </p>
        <div className="text-left bg-muted p-4 rounded-md mb-6">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-bold">${order.total.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-sm">
                <span>Items:</span>
                <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/account/orders">View My Orders</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export default function OrderConfirmationPage() {
    return (
        <div className="container flex min-h-[80vh] items-center justify-center py-12">
            <Suspense fallback={<Skeleton className="h-96 w-full max-w-2xl" />}>
                <OrderConfirmationContent />
            </Suspense>
        </div>
    )
}
