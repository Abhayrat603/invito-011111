
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { editRequests } from "@/lib/mock-data";
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

const statusConfig = {
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


export default function HistoryPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <FileText className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Request History</h1>
                    </div>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow p-4 md:p-6 space-y-4">
                     {editRequests.length === 0 ? (
                        <div className="text-center text-muted-foreground mt-20">
                            <p>You haven't made any edit requests yet.</p>
                        </div>
                    ) : (
                        editRequests.sort((a, b) => b.requestedAt.getTime() - a.requestedAt.getTime()).map(request => {
                            const { icon: Icon, color, text } = statusConfig[request.status];
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
                        })
                    )}
                </main>
            </div>
        </MainLayout>
    );
}

