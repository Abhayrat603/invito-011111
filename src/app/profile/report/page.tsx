
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, User, ShoppingCart, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { orders, editRequests } from "@/lib/mock-data";
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

const orderStatusConfig = {
    Placed: { color: "bg-blue-500", text: "text-blue-800" },
    Shipped: { color: "bg-orange-500", text: "text-orange-800" },
    Delivered: { color: "bg-green-500", text: "text-green-800" },
    Cancelled: { color: "bg-gray-500", text: "text-gray-800" },
};

const editStatusConfig = {
  Pending: { icon: Clock, color: "bg-yellow-500", text: "text-yellow-800" },
  Approved: { icon: CheckCircle, color: "bg-green-500", text: "text-green-800" },
  Rejected: { icon: XCircle, color: "bg-red-500", text: "text-red-800" },
};

export default function ReportPage() {
    const router = useRouter();
    const { user } = useAuth();

    const handlePrint = () => {
        window.print();
    };

    // Filter for delivered orders only
    const deliveredOrders = orders.filter(order => order.status === 'Delivered');
    // Filter for approved edit requests only
    const approvedRequests = editRequests.filter(request => request.status === 'Approved');

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10 print:hidden">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <FileText className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">User Report</h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handlePrint}>
                        <Printer />
                    </Button>
                </header>

                <main className="flex-grow p-4 md:p-6 space-y-8">
                    {/* User Details Section */}
                    <section>
                         <h2 className="text-lg font-semibold flex items-center mb-4"><User className="h-5 w-5 mr-2 text-primary"/> User Details</h2>
                         <Card>
                            <CardContent className="pt-6">
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
                                    <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {user?.phoneNumber || 'N/A'}</p>
                                </div>
                            </CardContent>
                         </Card>
                    </section>

                    {/* Order History Section */}
                    <section>
                         <h2 className="text-lg font-semibold flex items-center mb-4"><ShoppingCart className="h-5 w-5 mr-2 text-primary"/> Completed Purchase History</h2>
                         {deliveredOrders.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No completed orders found.</p>
                         ) : (
                            <div className="space-y-4">
                                {deliveredOrders.map(order => (
                                    <Card key={order.id} className="overflow-hidden">
                                        <CardHeader className="p-4 bg-card">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <CardTitle className="text-base font-semibold">Order #{order.id}</CardTitle>
                                                    <CardDescription className="text-xs">
                                                        {format(order.createdAt, "MMM d, yyyy 'at' h:mm a")}
                                                    </CardDescription>
                                                </div>
                                                <Badge className={cn("text-xs font-bold", orderStatusConfig[order.status].color, orderStatusConfig[order.status].text)}>
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
                                ))}
                            </div>
                         )}
                    </section>
                    
                    {/* Edit Request History Section */}
                    <section>
                        <h2 className="text-lg font-semibold flex items-center mb-4"><FileText className="h-5 w-5 mr-2 text-primary"/> Approved Edit Request History</h2>
                        {approvedRequests.length === 0 ? (
                             <p className="text-muted-foreground text-sm">No approved edit requests found.</p>
                        ) : (
                            <div className="space-y-4">
                                {approvedRequests.map(request => {
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
