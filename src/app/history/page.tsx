
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText, ShoppingCart, History as HistoryIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { editRequests, orders } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const editStatusConfig = {
  Pending: {
    icon: Clock,
    color: "bg-yellow-500",
    text: "text-yellow-800",
  },
  Approved: {
    icon: CheckCircle,
    color: "bg-green-500",
    text: "text-green-800",
  },
  Rejected: {
    icon: XCircle,
    color: "bg-red-500",
    text: "text-red-800",
  },
};

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


export default function HistoryPage() {
    const router = useRouter();
    
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');
    const approvedRequests = editRequests.filter(request => request.status === 'Approved');

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <HistoryIcon className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">History</h1>
                    </div>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <section>
                         <h2 className="text-lg font-semibold flex items-center mb-4"><ShoppingCart className="h-5 w-5 mr-2 text-primary"/> Order History</h2>
                         {deliveredOrders.length === 0 ? (
                            <div className="text-center text-muted-foreground mt-10">
                                <p>You have no delivered orders.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                            {deliveredOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(order => {
                                const { color, text } = orderStatusConfig[order.status];
                                return (
                                    <Card key={order.id} className="overflow-hidden">
                                        <CardHeader className="p-4 bg-card">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle className="text-base font-semibold">Order #{order.id}</CardTitle>
                                                    <CardDescription className="text-xs">
                                                        {format(order.createdAt, "MMM d, yyyy 'at' h:mm a")}
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
                            </div>
                        )}
                    </section>
                    
                    <section>
                        <h2 className="text-lg font-semibold flex items-center mb-4"><FileText className="h-5 w-5 mr-2 text-primary"/> Edit Request History</h2>
                        {approvedRequests.length === 0 ? (
                            <div className="text-center text-muted-foreground mt-10">
                                <p>You have no approved edit requests.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                            {approvedRequests.sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime()).map(request => {
                                const { icon: Icon, color, text } = editStatusConfig[request.status];
                                return (
                                    <Card key={request.id} className="overflow-hidden">
                                        <CardHeader className="flex flex-row items-center justify-between p-4 bg-card">
                                            <div className="flex-grow">
                                                <CardTitle className="text-base font-semibold truncate">{request.productName}</CardTitle>
                                                <CardDescription className="text-xs">
                                                    Requested: {format(request.requestedAt, "MMM d, yyyy 'at' h:mm a")}
                                                </CardDescription>
                                            </div>
                                            <Badge className={cn("text-xs font-bold", color, text)}>
                                                <Icon className="h-3 w-3 mr-1.5" />
                                                {request.status}
                                            </Badge>
                                        </CardHeader>
                                        <Separator />
                                        <CardContent className="p-4">
                                            <p className="text-sm text-foreground/80">{request.requestDetails}</p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </MainLayout>
    );
}
