
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LifeBuoy, BookOpen, Shield, Truck, RotateCw, Search, CreditCard, Globe, Gift } from "lucide-react";
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
        answer: "We offer a 30-day return policy for a full refund on all items that are unworn, unwashed, and in their original packaging with tags attached. To start a return, please visit our Returns & Exchanges section in your account. Sale items are final and cannot be returned."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the country. Expedited shipping options are available at checkout for an additional fee. You will receive a tracking number via email once your order has shipped, allowing you to follow its journey to your doorstep."
    },
    {
        question: "How do I track my order?",
        answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can also find your tracking information by logging into your account dashboard under the 'My Orders' section. This allows for real-time updates on your package's location."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please be aware that customs fees, import duties, and local taxes are the responsibility of the customer and are not included in the item price or shipping cost."
    },
    {
        question: "Can I change or cancel my order?",
        answer: "We process orders very quickly to ensure you get your items as soon as possible. If you need to change or cancel your order, please contact our customer support team immediately. If the order has already been processed and shipped, you will need to follow the standard return process once you receive it."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept a wide range of payment methods for your convenience. This includes all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment gateways like Apple Pay and Google Pay. All transactions are encrypted with SSL technology for your security."
    },
    {
        question: "Are your products sustainable?",
        answer: "We are deeply committed to sustainability. We prioritize using eco-friendly materials, partner with ethical manufacturers, and utilize recyclable packaging. We are on a continuous journey to improve our environmental footprint. You can learn more on our 'About Us' page."
    },
    {
        question: "How do I find the right size?",
        answer: "Each product page features a detailed sizing guide with measurements to help you find the perfect fit. We also provide model specifications (height, size worn) as a reference. If you are between sizes, we generally recommend sizing up for a more comfortable fit."
    },
    {
        question: "Do you offer gift cards?",
        answer: "Yes, we offer digital gift cards in various denominations. They are the perfect gift for any fashion lover! Gift cards are delivered by email and contain instructions to redeem them at checkout. They have no additional processing fees and do not expire."
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
                            <HelpCategory icon={CreditCard} title="Payment & Pricing" description="Accepted methods and currency" href="#" />
                            <HelpCategory icon={Gift} title="Gift Cards & Promotions" description="Using gift cards and promo codes" href="#" />
                             <HelpCategory icon={Globe} title="International Orders" description="Duties, taxes, and shipping" href="#" />
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
