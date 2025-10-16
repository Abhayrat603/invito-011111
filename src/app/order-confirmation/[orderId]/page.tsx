"use client";

import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/main-layout';
import { useAppState } from '@/components/providers/app-state-provider';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ShoppingCart, CheckCircle, Home, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function OrderConfirmationPage() {
    const router = useRouter();
    const params = useParams();
    const { orderId } = params;
    const { orders } = useAppState();
    const { toast } = useToast();

    const order = orders.find(o => o.id === orderId);

    const handleDownload = (productName: string) => {
        toast({
            title: "Downloading...",
            description: `Your download for ${productName} will begin shortly. (This is a simulation)`,
        });
        // In a real app, you would have a secure download link.
    };

    if (!order) {
        return (
            <MainLayout>
                <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                    
                    <main className="flex-grow p-4 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-lg text-muted-foreground mb-4">We couldn't find the order details.</p>
                            <Button onClick={() => router.push('/')}>Go to Homepage</Button>
                        </div>
                    </main>
                </div>
            </MainLayout>
        );
    }
    
    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                
                <main className="flex-grow p-4 md:p-6 space-y-6">
                    <Card className="text-center shadow-lg border-green-500/50">
                        <CardHeader>
                            <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mb-2">
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Thank You For Your Order!</CardTitle>
                            <CardDescription>Your payment was successful and your order is complete. You can download your digital items below.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="text-sm text-muted-foreground">
                                <p>Order ID: <strong>{order.id}</strong></p>
                                <p>Date: {format(order.createdAt, "MMM d, yyyy 'at' h:mm a")}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><ShoppingCart className="mr-2 h-5 w-5"/>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {order.items.map(item => (
                                    <li key={item.productId} className="flex items-center justify-between text-sm">
                                        <div className="flex-grow pr-4">
                                            <p className="font-semibold">{item.productName}</p>
                                            <p className="text-muted-foreground">Qty: {item.quantity} x ₹{item.price.toFixed(2)}</p>
                                        </div>
                                        <Button size="sm" onClick={() => handleDownload(item.productName)}>
                                            <Download className="mr-2 h-4 w-4"/>
                                            Download
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <Separator className="my-4" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Paid</span>
                                <span>₹{order.total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/" passHref>
                          <Button variant="outline" className="w-full"><Home className="mr-2 h-4 w-4"/>Continue Shopping</Button>
                        </Link>
                        <Link href="/history" passHref>
                          <Button className="w-full"><History className="mr-2 h-4 w-4"/>View History</Button>
                        </Link>
                    </div>

                </main>
            </div>
        </MainLayout>
    )
}