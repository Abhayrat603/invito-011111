"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, Users, Building } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
        <div className="flex items-start mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="text-2xl font-headline text-primary">{title}</h3>
            </div>
        </div>
        <div className="text-foreground/80 space-y-4 leading-relaxed pl-2">
            {children}
        </div>
    </div>
);

export default function ContactUsPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would handle the form submission here,
        // e.g., send the data to a server or an email service.
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you shortly.",
        });
        // Reset form fields if needed
        (e.target as HTMLFormElement).reset();
    };

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <Mail className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Contact Us</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="text-center">
                        <p className="text-lg text-foreground/80">We'd love to hear from you! Whether you have a question about a design, need assistance with an order, have feedback, or just want to say hello, our team is here and ready to help.</p>
                    </div>

                    <InfoCard icon={Send} title="Send Us a Message">
                        <p className="text-sm -mt-2 mb-4 text-muted-foreground">Use the form below for the quickest response. We monitor our inbox constantly during business hours.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Your Full Name" required className="bg-background" />
                            <Input type="email" placeholder="Your Email Address" required className="bg-background"/>
                            <Input placeholder="Subject of your message" required className="bg-background"/>
                            <Textarea placeholder="Please enter your message here..." required rows={5} className="bg-background"/>
                            <Button type="submit" className="w-full">
                                <Send className="mr-2 h-4 w-4" /> Send Message
                            </Button>
                        </form>
                    </InfoCard>

                    <InfoCard icon={Mail} title="Email Us Directly">
                        <p>For general inquiries, custom design questions, or support with existing orders, you can email us directly. We are committed to responding to all emails within 24 business hours.</p>
                        <a href="mailto:abhayrat603@gmail.com" className="font-semibold text-primary hover:underline break-words">abhayrat603@gmail.com</a>
                    </InfoCard>

                    <InfoCard icon={Phone} title="Give Us a Call">
                        <p>For urgent matters or if you prefer to speak with a member of our team, you can call us during our business hours. Please note that this line is for customer service inquiries.</p>
                        <a href="tel:+918463062603" className="font-semibold text-primary hover:underline">+91 8463062603</a>
                    </InfoCard>

                    <InfoCard icon={MapPin} title="Our Design Studio">
                        <p>While we are primarily an online-based company, we have a physical studio where our creative team works. Visits are by appointment only. Please contact us to schedule a visit if you are in the area.</p>
                        <p className="font-medium">123 Design Lane, Creativity City, Indore, Madhya Pradesh, 452001, India</p>
                    </InfoCard>

                    <InfoCard icon={Clock} title="Business Hours">
                        <p className="text-sm -mt-2 mb-4 text-muted-foreground">All times are in Indian Standard Time (IST).</p>
                        <ul className="list-none space-y-2">
                            <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                            <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                            <li><strong>Sunday &amp; Public Holidays:</strong> Closed</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon={Users} title="Department Contacts">
                        <p>For specific inquiries, you can reach out to our departments directly. This helps us route your request to the right team for a faster response.</p>
                         <ul className="list-disc list-inside space-y-2">
                            <li><strong>Customer Support:</strong> For help with orders, downloads, and general questions. <a href="mailto:support@invitedesigner.com" className="text-primary hover:underline block">support@invitedesigner.com</a></li>
                            <li><strong>Design Team:</strong> For custom edits and design-specific questions. <a href="mailto:design@invitedesigner.com" className="text-primary hover:underline block">design@invitedesigner.com</a></li>
                            <li><strong>Careers &amp; HR:</strong> For job openings and employment inquiries. <a href="mailto:careers@invitedesigner.com" className="text-primary hover:underline block">careers@invitedesigner.com</a></li>
                            <li><strong>Partnerships:</strong> For business collaborations and media inquiries. <a href="mailto:partners@invitedesigner.com" className="text-primary hover:underline block">partners@invitedesigner.com</a></li>
                        </ul>
                    </InfoCard>

                    <div className="text-center text-muted-foreground pt-4">
                        <p>We look forward to creating with you!</p>
                    </div>

                </main>
            </div>
        </MainLayout>
    );
}
