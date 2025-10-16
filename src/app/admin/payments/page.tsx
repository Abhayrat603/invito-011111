
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const orderStatusConfig = {
    Placed: {
        color: "bg-blue-500",
        text: "text-blue-800",
    },
    Shipped: {
        color: "bg-orange-500",
        text: "text-orange-800",
    },
    Delivered: {
        color: "bg-green-500",
        text: "text-green-800",
    },
    Cancelled: {
        color: "bg-gray-500",
        text: "text-gray-800",
    },
};

export default function AdminPaymentsPage() {
    const router = useRouter();
    const { orders } = useAppState();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Payment History</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 space-y-4">
                     {orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(order => {
                        const { color, text } = orderStatusConfig[order.status];
                        return (
                            <Card key={order.id} className="overflow-hidden">
                                <CardHeader className="p-4 bg-card">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle className="text-base font-semibold">Order #{order.id}</CardTitle>
                                            <CardDescription className="text-xs">
                                                {isClient ? format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a") : '...'}
                                            </CardDescription>
                                        </div>
                                        <Badge className={cn("text-xs font-bold", color, text)}>
                                            {order.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-4">
                                    <ul className="space-y-2 text-sm">
                                        {order.items.map(item => (
                                            <li key={item.productId} className="flex justify-between">
                                                <span>{item.productName} (x{item.quantity})</span>
                                                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Separator className="my-2"/>
                                     <div className="flex justify-between font-bold text-base">
                                        <span>Total</span>
                                        <span>₹{order.total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </main>
            </div>
        </MainLayout>
    );
}
