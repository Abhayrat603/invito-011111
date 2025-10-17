
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, XCircle, Timer, Edit as EditIcon, CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { cn, toDate } from "@/lib/utils";
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
import Link from "next/link";
import { AuthRedirect } from "@/components/auth-redirect";

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
  Successful: {
    icon: CheckCheck,
    color: "bg-blue-500",
    text: "text-blue-800",
  },
};

export default function MyEditRequestsPage() {
    const router = useRouter();
    const { editRequests } = useAppState();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <AuthRedirect to="/login" condition="is-not-auth">
            <MainLayout>
                <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                    <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft />
                        </Button>
                        <h1 className="text-xl font-bold text-center flex-grow">My Edit Requests</h1>
                         <Link href="/request-edit">
                            <Button variant="outline">New Request</Button>
                        </Link>
                    </header>
                    <main className="flex-grow p-4 space-y-4">
                        {editRequests.length === 0 ? (
                            <div className="text-center text-muted-foreground mt-20">
                                <p>You haven't made any edit requests yet.</p>
                            </div>
                        ) : (
                            editRequests.sort((a, b) => toDate(b.requestedAt).getTime() - toDate(a.requestedAt).getTime()).map(request => {
                                const { icon: Icon, color, text } = editStatusConfig[request.status];
                                return (
                                    <Card key={request.id} className="overflow-hidden">
                                        <CardHeader className="p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-grow overflow-hidden">
                                                    <CardTitle className="text-base font-semibold truncate">{request.productName}</CardTitle>
                                                    <CardDescription className="text-xs">
                                                        Requested: {isClient ? format(toDate(request.requestedAt), "MMM d, yyyy 'at' h:mm a") : '...'}
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
                                                <h4 className="text-sm font-semibold mb-2 flex items-center"><EditIcon className="h-4 w-4 mr-2 text-primary" />Your Request</h4>
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
        </AuthRedirect>
    );
}
