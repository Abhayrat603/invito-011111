
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { AuthRedirect } from "@/components/auth-redirect";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().length(10, { message: "Please enter a valid 10-digit phone number." }),
  productId: z.string({ required_error: "Please select a product to edit." }),
  requestDetails: z.string().min(10, { message: "Details must be at least 10 characters." }).max(500, { message: "Details cannot exceed 500 characters." }),
  turnaroundTime: z.enum(['Urgent', '1 Day', '2 Days'], { required_error: "Please select a turnaround time." }),
});

export default function RequestEditPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { products, addEditRequest } = useAppState();
    const { user } = useAuth();
    
    const allProducts = [...products]; // Can be extended with deals if needed

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
            phone: user?.phoneNumber?.slice(-10) || "",
            requestDetails: "",
        },
    });

     useEffect(() => {
        if (user) {
            form.reset({
                name: user.displayName || "",
                email: user.email || "",
                phone: user.phoneNumber?.slice(-10) || "",
                productId: form.getValues('productId'),
                requestDetails: form.getValues('requestDetails'),
                turnaroundTime: form.getValues('turnaroundTime'),
            });
        }
    }, [user, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!user) {
            toast({
                variant: "destructive",
                title: "Authentication Error",
                description: "You must be logged in to submit a request.",
            });
            return;
        }

        setIsSubmitting(true);
        
        const product = allProducts.find(p => p.id === values.productId);
        if (!product) {
            toast({ variant: "destructive", title: "Product not found" });
            setIsSubmitting(false);
            return;
        }

        addEditRequest({
            userId: user.uid,
            userName: values.name,
            userEmail: values.email,
            productId: values.productId,
            productName: product.name,
            requestDetails: values.requestDetails,
            turnaroundTime: values.turnaroundTime,
        });

        toast({
            title: "Request Submitted",
            description: "Your edit request has been sent to our team. We'll get back to you shortly.",
        });
        setIsSubmitting(false);
        form.reset();
        router.push("/history");
    };

    return (
        <AuthRedirect to="/login" condition="is-not-auth">
            <MainLayout>
                <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                    
                    <main className="flex-grow p-4">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold">Request a Custom Edit</h1>
                            <p className="text-muted-foreground">Select any product and tell us what you'd like to change.</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                 <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="Enter your 10-digit phone number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="productId"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product to Edit</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={allProducts.length === 0}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={allProducts.length > 0 ? "Select a product" : "No products available"} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {allProducts.map(product => (
                                                    <SelectItem key={product.id} value={product.id}>
                                                        {product.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="requestDetails"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edit Details</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="E.g., 'Change name to John & Jane', 'Update event date to Dec 25, 2024', 'Use a gold color for the text'."
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                
                                <Controller
                                    control={form.control}
                                    name="turnaroundTime"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Turnaround Time</FormLabel>
                                             <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="2 Days" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Standard (2 Business Days)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="1 Day" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Expedited (1 Business Day)</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Urgent" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Urgent (Within 12 Hours)</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="mr-2 h-4 w-4" />
                                    )}
                                    Submit Request
                                </Button>
                            </form>
                        </Form>
                    </main>
                </div>
            </MainLayout>
        </AuthRedirect>
    );
}

    