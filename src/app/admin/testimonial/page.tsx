
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, User, MessageSquare, Briefcase, Image as ImageIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  quote: z.string().min(10, { message: "Quote must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
});

export default function AdminTestimonialPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { testimonial, updateTestimonial } = useAppState();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: testimonial,
    });
    
    const imagePreview = form.watch("imageUrl");

    useEffect(() => {
        form.reset(testimonial);
    }, [testimonial, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        updateTestimonial(values);
        toast({
            title: "Testimonial Updated",
            description: "The homepage testimonial has been saved.",
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
                    <h1 className="text-xl font-bold text-center flex-grow">Manage Testimonial</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Homepage Testimonial</CardTitle>
                            <CardDescription>
                                Edit the content of the testimonial section on your homepage.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {imagePreview && (
                                        <div className="flex justify-center">
                                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
                                                <Image src={imagePreview} alt="Testimonial preview" layout="fill" objectFit="cover" />
                                            </div>
                                        </div>
                                    )}
                                    <FormField
                                        control={form.control}
                                        name="imageUrl"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input placeholder="https://example.com/image.jpg" {...field} className="pl-10"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input placeholder="E.g., Alan Doe" {...field} className="pl-10"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title / Position</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                    <Input placeholder="E.g., CEO & Founder" {...field} className="pl-10"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="quote"
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quote</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter the testimonial quote here..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        )}
                                    />
                                     <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save Testimonial
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
