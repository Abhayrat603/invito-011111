"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LifeBuoy, BookOpen, Shield, Search, CreditCard, Gift, FileText as FileTextIcon, Edit } from "lucide-react";
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
        question: "What formats are the invitations available in?",
        answer: "Our invitations are available as high-resolution JPG and print-ready PDF files. You can choose the format that best suits your needs, whether for digital sharing or physical printing."
    },
    {
        question: "How do I request an edit to a design?",
        answer: "On each product page, there is a 'Request For Edit' button. Clicking this will take you to a form where you can describe the changes you need, and our design team will get back to you shortly."
    },
    {
        question: "How long does it take to get a custom edit?",
        answer: "Turnaround time depends on the option you select in the edit request form. We offer 'Urgent', '1 Day', and '2 Days' options to meet your deadline."
    },
    {
        question: "Can I get a design printed?",
        answer: "While we specialize in digital templates, our PDF files are designed to be print-ready. You can take them to any local or online print shop for professional printing."
    },
    {
        question: "Can I change my order after purchase?",
        answer: "Since our products are digital downloads, all sales are final. However, if you have an issue with your file or need an edit, please use the 'Request For Edit' feature or contact our support team, and we'll be happy to help."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept a wide range of payment methods for your convenience. This includes all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment gateways like Apple Pay and Google Pay. All transactions are encrypted for your security."
    },
    {
        question: "Are there any hidden fees?",
        answer: "The price you see is the price you pay for the template. Custom edit requests may have an additional charge depending on the complexity, which will be communicated to you before any work begins."
    },
    {
        question: "How do I download my files after purchase?",
        answer: "Once your purchase is complete, you will see a download link on the confirmation page. You will also receive an email with a link to download your files. You can also access your purchased designs from your account profile."
    },
    {
        question: "Do you offer gift cards?",
        answer: "Yes, we offer digital gift cards in various denominations. They are the perfect gift for anyone planning an event! Gift cards are delivered by email and contain instructions to redeem them at checkout."
    },
];

const HelpCategory = ({ icon: Icon, title, description, href }: { icon: React.ElementType, title: string, description: string, href: string }) => (
    <Link href={href} className="block">
        <div className="bg-card p-4 rounded-lg shadow-sm hover:bg-accent transition-colors border border-border/50">
            <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Icon className="h-6 w-6 text-primary"/>
                </div>
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
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="relative">
                        <Input placeholder="Search for help..." className="pr-10 h-12 rounded-full pl-5 bg-card" />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-headline text-primary">Help Categories</h2>
                         <div className="grid grid-cols-1 gap-3">
                            <HelpCategory icon={Edit} title="Editing & Customization" description="How to request edits and changes" href="/request-edit" />
                            <HelpCategory icon={FileTextIcon} title="File Formats & Downloads" description="JPG, PDF, and how to download" href="#" />
                            <HelpCategory icon={CreditCard} title="Payment & Pricing" description="Accepted methods and currency" href="#" />
                            <HelpCategory icon={Gift} title="Gift Cards & Promotions" description="Using gift cards and promo codes" href="#" />
                            <HelpCategory icon={BookOpen} title="About Our Designs" description="Learn about our creative process" href="/about-us" />
                            <HelpCategory icon={Shield} title="Account & Security" description="Manage your profile and password" href="/profile/edit" />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-headline text-primary mb-4">Frequently Asked Questions</h2>
                         <Accordion type="single" collapsible className="w-full bg-card rounded-lg border p-2">
                            {faqs.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index} className="border-b-border/50">
                                    <AccordionTrigger className="text-left font-semibold text-base p-4 hover:no-underline">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="p-4 pt-0 text-muted-foreground">
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