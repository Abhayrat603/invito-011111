
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { categories, products } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const findImage = (id: string) => {
  return PlaceHolderImages.find(img => img.id === id);
};

const formSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0, { message: "Price cannot be negative." }),
  category: z.string({ required_error: "Please select a category." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
});

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    
    const imageUrl = form.watch("imageUrl");

    useEffect(() => {
        if(imageUrl) {
            setImagePreview(imageUrl);
        }
    }, [imageUrl]);

    useEffect(() => {
        const productToEdit = products.find(p => p.slug === slug);
        if (productToEdit) {
            setProduct(productToEdit);
            const image = findImage(productToEdit.images[0]);
            const currentImageUrl = image?.imageUrl || `https://picsum.photos/seed/${productToEdit.id}/500`;
            
            form.reset({
                name: productToEdit.name,
                description: productToEdit.description,
                price: productToEdit.price,
                category: productToEdit.category,
                imageUrl: currentImageUrl,
            });
            setImagePreview(currentImageUrl);
        } else {
            toast({
                variant: "destructive",
                title: "Product not found",
            });
            router.push('/admin/products');
        }
    }, [slug, form, router, toast]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        console.log("Updating product:", product?.id, values);
        // In a real app, you would update the image URL in your backend.
        // For this mock, we'll just log it.
        toast({
            title: "Product Updated",
            description: `"${values.name}" has been successfully updated.`,
        });
        setIsSubmitting(false);
        router.push("/admin/products");
    };
    
    if (!product) {
        return (
             <MainLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-center flex-grow truncate">Edit: {product.name}</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            
                            {imagePreview && (
                                <div className="relative w-full aspect-square rounded-md overflow-hidden border bg-muted">
                                    <Image src={imagePreview} alt="Product image preview" layout="fill" objectFit="cover" />
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
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl><Input placeholder="E.g., Elegant Wedding Invite" {...field} /></FormControl>
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
                                    <FormControl><Textarea placeholder="Describe the product..." {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl><Input type="number" step="0.01" placeholder="E.g., 5.99" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </form>
                    </Form>
                </main>
            </div>
        </MainLayout>
    );
}
