
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Edit, Timer, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
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
import { useState, useEffect } from "react";

const editStatusConfig = {
    Successful: {
        icon: CheckCheck,
        color: "bg-blue-500",
        text: "text-blue-800 dark:text-blue-200",
    },
};

export default function SuccessfulRequestsPage() {
    const router = useRouter();
    const { editRequests } = useAppState();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const successfulRequests = editRequests.filter(req => req.status === 'Successful');

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Successful Requests</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 space-y-4">
                    {successfulRequests.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-10">
                            <p>No successful requests found.</p>
                        </div>
                    ) : (
                        successfulRequests.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map(request => {
                            const { icon: Icon, color, text } = editStatusConfig[request.status];
                            return (
                                <Card key={request.id} className="overflow-hidden">
                                    <CardHeader className="p-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-grow overflow-hidden">
                                                <CardTitle className="text-base font-semibold truncate">{request.productName}</CardTitle>
                                                <CardDescription className="text-xs">
                                                    Completed: {isClient ? format(new Date(request.updatedAt), "MMM d, yyyy 'at' h:mm a") : '...'}
                                                </CardDescription>
                                            </div>
                                            <Badge className={cn("text-xs font-bold", color, text)}>
                                                <Icon className="h-3 w-3 mr-1.5" />
                                                {request.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="p-4 space-y-3">
                                        <div>
                                            <h4 className="text-sm font-semibold mb-2 flex items-center"><User className="h-4 w-4 mr-2 text-primary" />Requester Details</h4>
                                            <div className="text-sm text-muted-foreground space-y-1 pl-6">
                                                <p><strong>Name:</strong> {request.userName}</p>
                                                <p><strong>Email:</strong> {request.userEmail}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold mb-2 flex items-center"><Edit className="h-4 w-4 mr-2 text-primary" />Original Request</h4>
                                            <p className="text-sm text-foreground/80 pl-6">{request.requestDetails}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold mb-2 flex items-center"><Timer className="h-4 w-4 mr-2 text-primary" />Turnaround Time</h4>
                                            <p className="text-sm text-foreground/80 pl-6">{request.turnaroundTime}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}
                </main>
            </div>
        </MainLayout>
    );
}
