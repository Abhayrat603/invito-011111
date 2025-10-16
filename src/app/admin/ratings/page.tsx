
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Star, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/components/providers/app-state-provider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function AdminRatingsPage() {
    const router = useRouter();
    const { appRatings } = useAppState();
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
                    <h1 className="text-xl font-bold text-center flex-grow">App Ratings</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 space-y-4">
                    {appRatings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(rating => (
                        <Card key={rating.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        <CardTitle className="text-lg">{rating.userName}</CardTitle>
                                    </div>
                                    <StarRating rating={rating.rating} />
                                </div>
                                <CardDescription className="pt-1">
                                    {isClient ? format(new Date(rating.createdAt), "PPP 'at' h:mm a") : '...'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                               <div className="flex items-start gap-2 text-muted-foreground">
                                    <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                                    <p className="italic">"{rating.comment}"</p>
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </MainLayout>
    );
}
