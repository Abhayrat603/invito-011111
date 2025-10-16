
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin, Send, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        router.push('/');
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
                        <p className="text-lg text-foreground/80">We'd love to hear from you! Whether you have a question, feedback, or need help with a design, feel free to reach out.</p>
                    </div>

                    <InfoCard icon={Send} title="Send Us a Message">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Your Name" required className="bg-background" />
                            <Input type="email" placeholder="Your Email" required className="bg-background"/>
                            <Input placeholder="Subject" required className="bg-background"/>
                            <Textarea placeholder="Your Message" required rows={5} className="bg-background"/>
                            <Button type="submit" className="w-full">
                                <Send className="mr-2 h-4 w-4" /> Send Message
                            </Button>
                        </form>
                    </InfoCard>

                    <InfoCard icon={Mail} title="Email Us">
                        <p>For general inquiries, support, or design questions, you can email us directly. We aim to respond within 24 hours.</p>
                        <a href="mailto:abhayrat603@gmail.com" className="font-semibold text-primary hover:underline">abhayrat603@gmail.com</a>
                    </InfoCard>

                    <InfoCard icon={MapPin} title="Visit Our Studio">
                        <p>Come visit us at our design studio. We recommend scheduling an appointment first.</p>
                        <p className="font-medium">123 Design Lane, Creativity City, 452001, India</p>
                    </InfoCard>

                    <InfoCard icon={Clock} title="Business Hours">
                        <ul className="list-none space-y-2">
                            <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                            <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                            <li><strong>Sunday:</strong> Closed</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon={Users} title="Department Contacts">
                         <ul className="list-disc list-inside space-y-2">
                            <li><strong>Customer Support:</strong> <a href="mailto:support@invitedesigner.com" className="text-primary hover:underline">support@invitedesigner.com</a></li>
                            <li><strong>Design Team:</strong> <a href="mailto:design@invitedesigner.com" className="text-primary hover:underline">design@invitedesigner.com</a></li>
                            <li><strong>Careers:</strong> <a href="mailto:careers@invitedesigner.com" className="text-primary hover:underline">careers@invitedesigner.com</a></li>
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
