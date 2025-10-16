
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAppState } from "@/components/providers/app-state-provider";
import { format } from "date-fns";

export default function AdminUsersPage() {
    const router = useRouter();
    const { users } = useAppState();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">User Details</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 space-y-4">
                    {users.map(user => (
                        <Card key={user.id}>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" /> {user.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 pt-1">
                                    <Mail className="h-4 w-4 text-muted-foreground" /> {user.email}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <p className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" /> 
                                    {user.phone ? `+91 ${user.phone}` : 'No phone number'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Registered on: {format(new Date(user.createdAt), "PPP")}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </MainLayout>
    );
}
