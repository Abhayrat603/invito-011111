
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, HelpCircle, Search, User, ShoppingCart, Truck, RefreshCw, Star, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const faqData = {
    "Account & Profile": {
        icon: User,
        questions: [
            { q: "How do I create an account?", a: "To create an account, click on the 'Sign Up' button on the login page and fill in your details. You'll receive a verification email to activate your account." },
            { q: "How can I change my password?", a: "You can change your password by navigating to 'Profile' > 'Edit Profile' > 'Change Password'. Follow the instructions to set a new password." },
            { q: "How do I update my profile information?", a: "Go to 'Profile' > 'Edit Profile' to update your name, profile picture, and other details." },
        ],
    },
    "Orders & Shipping": {
        icon: ShoppingCart,
        questions: [
            { q: "How can I track my order?", a: "Once your order is shipped, you will receive an email with a tracking number and a link to the courier's website. You can also find tracking information in your order history." },
            { q: "What are the shipping costs and delivery times?", a: "Shipping costs and delivery times vary depending on your location. Standard shipping usually takes 3-5 business days. You can see the exact details at checkout." },
            { q: "Can I change my shipping address after placing an order?", a: "If your order has not yet been shipped, you can contact our customer support to request a change of address. We cannot change the address once the order is in transit." },
        ],
    },
    "Returns & Exchanges": {
        icon: RefreshCw,
        questions: [
            { q: "What is your return policy?", a: "We accept returns within 30 days of delivery for a full refund or exchange. Items must be in their original condition, unworn, with all tags attached." },
            { q: "How do I initiate a return or exchange?", a: "Please visit our 'Returns' section in your account to start the process. You will need your order number and email address." },
        ],
    },
    "Products & Sizing": {
        icon: Star,
        questions: [
            { q: "How do I find the right size?", a: "Each product page has a detailed size guide with measurements. If you are still unsure, feel free to contact our support team for a recommendation." },
            { q: "Are your products ethically sourced?", a: "Yes, we are committed to ethical manufacturing and sustainable sourcing. You can read more about our efforts on our 'About Us' page." },
        ],
    },
};

type FaqCategory = keyof typeof faqData;

export default function HelpCenterPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <HelpCircle className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Help Center</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-headline text-foreground">How can we help?</h2>
                        <div className="relative">
                            <Input placeholder="Search for help..." className="pr-10" />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                        {Object.entries(faqData).map(([category, data]) => {
                            const Icon = data.icon;
                            return (
                                <div key={category} className="mb-6 bg-card p-4 rounded-lg border">
                                    <div className="flex items-center mb-4">
                                        <Icon className="h-6 w-6 text-primary mr-3" />
                                        <h4 className="text-xl font-semibold text-foreground">{category}</h4>
                                    </div>
                                    <Accordion type="single" collapsible className="w-full">
                                        {data.questions.map((faq, index) => (
                                            <AccordionItem value={`item-${index}`} key={index}>
                                                <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-accent/30 text-center p-6 rounded-lg border border-primary/20">
                        <h3 className="text-xl font-semibold mb-2">Can't find what you're looking for?</h3>
                        <p className="text-muted-foreground mb-4">Our support team is here to help. Get in touch with us for any questions.</p>
                        <Link href="/contact-us" passHref>
                           <Button>Contact Support</Button>
                        </Link>
                    </div>

                </main>
            </div>
        </MainLayout>
    );
}
