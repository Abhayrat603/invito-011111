
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";


const editStatusConfig = {
  Pending: {
    icon: Clock,
    color: "bg-yellow-500",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  Approved: {
    icon: CheckCircle,
    color: "bg-green-500",
    text: "text-green-800 dark:text-green-200",
  },
  Rejected: {
    icon: XCircle,
    color: "bg-red-500",
    text: "text-red-800 dark:text-red-200",
  },
};

export default function AdminRequestsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { editRequests, updateEditRequestStatus } = useAppState();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleStatusChange = (requestId: string, newStatus: 'Pending' | 'Approved' | 'Rejected') => {
        updateEditRequestStatus(requestId, newStatus);
        toast({
            title: "Status Updated",
            description: `Request ${requestId} has been set to ${newStatus}.`,
        });
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Manage Edit Requests</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 space-y-4">
                    {editRequests.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()).map(request => {
                        const { icon: Icon, color, text } = editStatusConfig[request.status];
                        return (
                            <Card key={request.id} className="overflow-hidden">
                                <CardHeader className="p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-grow overflow-hidden">
                                            <CardTitle className="text-base font-semibold truncate">{request.productName}</CardTitle>
                                            <CardDescription className="text-xs">
                                                Requested: {isClient ? format(new Date(request.requestedAt), "MMM d, yyyy 'at' h:mm a") : '...'}
                                            </CardDescription>
                                        </div>
                                        <Badge className={cn("text-xs font-bold", color, text)}>
                                            <Icon className="h-3 w-3 mr-1.5" />
                                            {request.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <Separator />
                                <CardContent className="p-4 space-y-4">
                                    <p className="text-sm text-foreground/80">{request.requestDetails}</p>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground">Change Status</label>
                                        <Select 
                                            defaultValue={request.status} 
                                            onValueChange={(newStatus: 'Pending' | 'Approved' | 'Rejected') => handleStatusChange(request.id, newStatus)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Change status..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Approved">Approved</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
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
