
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LifeBuoy, BookOpen, Shield, Truck, RotateCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for a full refund on all items that are unworn, unwashed, and in their original packaging with tags attached. Sale items are final and cannot be returned."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for an additional fee. You will receive a tracking number once your order has shipped."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find your tracking information in your account dashboard under 'My Orders'."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and times vary depending on the destination. Please note that customs fees and import duties are the responsibility of the customer."
    },
    {
        question: "Can I change or cancel my order?",
        answer: "We process orders quickly, but we will do our best to accommodate any changes. Please contact our customer support team as soon as possible. If the order has already been shipped, you will need to follow the standard return process."
    },
     {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment gateways. All transactions are encrypted for your security."
    },
];

const HelpCategory = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href: string }) => (
    <Link href={href}>
        <div className="bg-card p-4 rounded-lg shadow-sm hover:bg-accent transition-colors">
            <div className="flex items-center">
                <Icon className="h-8 w-8 text-primary mr-4"/>
                <div>
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    </Link>
);

export default function HelpCenterPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <LifeBuoy className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Help Center</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="relative">
                        <Input placeholder="Search for help..." className="pr-10 h-11" />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Help Categories</h2>
                         <div className="grid grid-cols-1 gap-3">
                            <HelpCategory icon={Truck} title="Shipping & Delivery" description="Track your order, learn about times" href="#" />
                            <HelpCategory icon={RotateCw} title="Returns & Exchanges" description="Our policy and how to start a return" href="#" />
                            <HelpCategory icon={Shield} title="Account & Security" description="Manage your profile and password" href="/profile/edit" />
                            <HelpCategory icon={BookOpen} title="About Our Products" description="Sizing, materials, and care" href="/about-us" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
                         <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="text-center text-muted-foreground pt-4">
                        <p>Can't find what you're looking for?</p>
                        <p>Our AI assistant might be able to help, or you can <Link href="/contact-us" className="text-primary underline">contact our support team</Link>.</p>
                    </div>

                </main>
            </div>
        </MainLayout>
    );
}
