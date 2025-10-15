
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// In a real app, this data would come from your user database
const mockUsers = [
  { id: 'usr1', name: 'John Doe', email: 'john.doe@example.com', registered: '2023-10-01' },
  { id: 'usr2', name: 'Jane Smith', email: 'jane.smith@example.com', registered: '2023-09-25' },
  { id: 'usr3', name: 'Admin User', email: 'abhayrat603@gmail.com', registered: '2023-09-20' },
];

export default function AdminUsersPage() {
    const router = useRouter();

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
                    {mockUsers.map(user => (
                        <Card key={user.id}>
                            <CardHeader>
                                <CardTitle className="text-lg">{user.name}</CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Registered on: {user.registered}</p>
                            </CardContent>
                        </Card>
                    ))}
                </main>
            </div>
        </MainLayout>
    );
}
