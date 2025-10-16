
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Calendar as CalendarIcon } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAppState } from "@/components/providers/app-state-provider";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3, { message: "Deal name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0, { message: "Price cannot be negative." }),
  discountPrice: z.coerce.number().min(0, { message: "Discount price cannot be negative." }),
  stock: z.coerce.number().int().min(0, { message: "Stock cannot be negative." }),
  offerEndsAt: z.date({ required_error: "Offer end date is required." }),
  category: z.string().default("Deals"),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
  zipFileUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

export default function AddDealPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addDeal } = useAppState();
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            discountPrice: 0,
            stock: 0,
            imageUrl: "",
            zipFileUrl: "",
        },
    });

    const imageUrl = form.watch("imageUrl");

    useEffect(() => {
        if (imageUrl) {
            setImagePreview(imageUrl);
        }
    }, [imageUrl]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await addDeal(values);
            toast({
                title: "Deal Added",
                description: `"${values.name}" has been successfully created.`,
            });
            router.push("/admin/deals");
        } catch (error) {
            console.error("Failed to add deal:", error);
            toast({
                variant: "destructive",
                title: "Failed to add deal",
                description: "There was a problem saving the deal. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow">Add New Deal</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {imagePreview && (
                                <div className="relative w-full aspect-square rounded-md overflow-hidden border bg-muted">
                                    <Image src={imagePreview} alt="Deal image preview" layout="fill" objectFit="cover" />
                                </div>
                            )}
                             <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deal Name</FormLabel>
                                    <FormControl><Input placeholder="E.g., Flash Sale Watch" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl><Textarea placeholder="Describe the deal product..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Original Price (₹)</FormLabel>
                                    <FormControl><Input type="number" step="0.01" placeholder="E.g., 500" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Price (₹)</FormLabel>
                                    <FormControl><Input type="number" step="0.01" placeholder="E.g., 399" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl><Input type="number" placeholder="E.g., 50" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="offerEndsAt"
                                render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Offer End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="zipFileUrl"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip File URL</FormLabel>
                                    <FormControl><Input placeholder="https://example.com/download.zip" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Deal
                            </Button>
                        </form>
                    </Form>
                </main>
            </div>
        </MainLayout>
    );
}
