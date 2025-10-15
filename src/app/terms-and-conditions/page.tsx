
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, Copyright, CheckSquare, Scale, Ban, Box, User } from "lucide-react";
import { useRouter } from "next/navigation";

const TermCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
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

export default function TermsAndConditionsPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <FileText className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Terms &amp; Conditions</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-8">
                     <div className="text-center mb-4">
                        <p className="text-muted-foreground">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <TermCard icon={CheckSquare} title="Acceptance of Terms">
                        <p>By accessing and using Invite Designer (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service, including purchasing templates or requesting edits, will constitute acceptance of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
                    </TermCard>

                    <TermCard icon={User} title="Your Account">
                        <p>If you create an account on the Service, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages incurred as a result of such acts or omissions.</p>
                    </TermCard>

                    <TermCard icon={AlertTriangle} title="User Conduct">
                        <p>You agree not to use the Service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You are prohibited from using the site or its content to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</p>
                    </TermCard>

                    <TermCard icon={Copyright} title="Intellectual Property">
                        <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Invite Designer and its licensors. All templates are for personal use only and may not be resold or redistributed. You are granted a limited license only, for purposes of viewing and using the material contained on this Service for your personal events.</p>
                    </TermCard>

                     <TermCard icon={Box} title="Products and Services">
                        <p>We reserve the right to refuse any order you place with us. Prices for our products (templates and edit services) are subject to change without notice. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>
                    </TermCard>

                    <TermCard icon={Ban} title="Termination">
                        <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including a breach of the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
                    </TermCard>
                    
                    <TermCard icon={Scale} title="Governing Law">
                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions will remain in effect.</p>
                    </TermCard>
                </main>
            </div>
        </MainLayout>
    );
}
