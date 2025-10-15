
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, User, Mail, Phone, Send } from "lucide-react";
import { EditIcon } from "@/components/icons/edit-icon";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  description: z.string().min(10, { message: "Please describe your edit request in at least 10 characters." }),
  turnaround: z.enum(["urgent", "1-day", "2-days"], {
    required_error: "You need to select a turnaround time.",
  }),
});

export default function RequestEditPage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            description: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Edit Request Submitted:", values);
        toast({
            title: "Request Sent!",
            description: "We have received your edit request and will get back to you shortly.",
        });
        form.reset();
        router.push('/');
    };

    return (
        <MainLayout>
             <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <EditIcon className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Request an Edit</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6">
                    <p className="text-muted-foreground mb-6 text-center">Need changes to a design? Fill out the form below and we'll get on it!</p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="Enter your full name" {...field} className="pl-10" />
                                            </div>
                                        </FormControl>
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
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="Enter your email" {...field} className="pl-10" />
                                            </div>
                                        </FormControl>
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
                                        <FormControl>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                <Input placeholder="Enter your phone number" {...field} className="pl-10" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What needs to be edited?</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Please describe the changes you need in detail..." {...field} rows={5}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="turnaround"
                                render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>How soon do you need it?</FormLabel>
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="urgent" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Turant (Urgent)
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="1-day" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                1 Day
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="2-days" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                2 Days
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full h-12" disabled={form.formState.isSubmitting}>
                                <Send className="mr-2 h-4 w-4" />
                                {form.formState.isSubmitting ? "Sending..." : "Send Request"}
                            </Button>
                        </form>
                    </Form>
                </main>
            </div>
        </MainLayout>
    );
}
    