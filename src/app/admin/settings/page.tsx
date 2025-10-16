
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Link as LinkIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  shareLink: z.string().url({ message: "Please enter a valid URL." }),
});

export default function AdminSettingsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { appSettings, updateShareLink } = useAppState();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shareLink: appSettings.shareLink,
        },
    });

    useEffect(() => {
        form.reset({ shareLink: appSettings.shareLink });
    }, [appSettings, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        updateShareLink(values.shareLink);
        toast({
            title: "Settings Updated",
            description: "The application settings have been saved.",
        });
        setIsSubmitting(false);
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin')}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">App Settings</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Share Link</CardTitle>
                            <CardDescription>
                                This is the link that will be shared when users click the "Share App" button in their profile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="shareLink"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Share App URL</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input placeholder="https://example.com" {...field} className="pl-10"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Settings
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </MainLayout>
    );
}
