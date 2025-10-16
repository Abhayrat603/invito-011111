
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
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import type { MenuItem } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(2, { message: "Menu item name must be at least 2 characters." }),
  href: z.string().min(1, { message: "Link is required." }).refine(value => value.startsWith('/'), { message: "Link must be a relative path starting with /"}),
});

export default function EditMenuItemPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { menuItems, updateMenuItem } = useAppState();
    const [menuItem, setMenuItem] = useState<MenuItem | undefined>(undefined);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        const itemToEdit = menuItems.find(item => item.id === id);
        if (itemToEdit) {
            setMenuItem(itemToEdit);
            form.reset({
                name: itemToEdit.name,
                href: itemToEdit.href,
            });
        } else if (menuItems.length > 0) { 
            toast({
                variant: "destructive",
                title: "Menu Item not found",
            });
            router.push('/admin/menu');
        }
    }, [id, menuItems, form, router, toast]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!menuItem) return;
        setIsSubmitting(true);
        
        try {
          await updateMenuItem(menuItem.id, values);
          toast({
              title: "Menu Item Updated",
              description: `"${values.name}" has been successfully updated.`,
          });
          router.push("/admin/menu");
        } catch (error) {
           console.error("Failed to update menu item:", error);
            toast({
                variant: "destructive",
                title: "Failed to update item",
                description: "There was a problem saving your changes. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (!menuItem) {
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
                    <h1 className="text-xl font-bold text-center flex-grow truncate">Edit: {menuItem.name}</h1>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="href"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link (URL)</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
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
