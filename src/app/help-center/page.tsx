
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LifeBuoy, BookOpen, Shield, Truck, RotateCw, Search, CreditCard, Globe, Gift, FileText as FileTextIcon } from "lucide-react";
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
                            <HelpCategory icon={RotateCw} title="Editing & Customization" description="How to request edits and changes" href="/request-edit" />
                            <HelpCategory icon={FileTextIcon} title="File Formats & Downloads" description="JPG, PDF, and how to download" href="#" />
                            <HelpCategory icon={CreditCard} title="Payment & Pricing" description="Accepted methods and currency" href="#" />
                            <HelpCategory icon={Gift} title="Gift Cards & Promotions" description="Using gift cards and promo codes" href="#" />
                            <HelpCategory icon={BookOpen} title="About Our Designs" description="Learn about our creative process" href="/about-us" />
                            <HelpCategory icon={Shield} title="Account & Security" description="Manage your profile and password" href="/profile/edit" />
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
