
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, Copyright, CheckSquare, Scale, Ban, Box } from "lucide-react";
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
                        <p>By accessing and using Night Fury (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                    </TermCard>

                    <TermCard icon={User} title="Your Account">
                        <p>If you create an account on the Service, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.</p>
                    </TermCard>

                    <TermCard icon={AlertTriangle} title="User Conduct">
                        <p>You agree not to use the Service to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Post any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            <li>Upload or transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment.</li>
                            <li>Interfere with or disrupt the Service or servers or networks connected to the Service.</li>
                        </ul>
                    </TermCard>

                    <TermCard icon={Copyright} title="Intellectual Property">
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Night Fury and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Night Fury. You are granted a limited license only, subject to the restrictions provided in these Terms, for purposes of viewing the material contained on this Service.</p>
                    </TermCard>

                     <TermCard icon={Box} title="Products and Sales">
                        <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. Prices for our products are subject to change without notice.</p>
                    </TermCard>

                    <TermCard icon={Ban} title="Termination">
                        <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
                    </TermCard>
                    
                    <TermCard icon={Scale} title="Governing Law">
                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
                    </TermCard>
                </main>
            </div>
        </MainLayout>
    );
}
