
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, Copyright, CheckSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const TermCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
        <div className="flex items-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-headline text-primary">{title}</h3>
        </div>
        <div className="text-foreground/80 space-y-4 leading-relaxed">
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
                       <h1 className="text-xl font-bold">Terms & Conditions</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-8">
                     <div className="text-center mb-4">
                        <p className="text-muted-foreground">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <TermCard icon={CheckSquare} title="Acceptance of Terms">
                        <p>By accessing and using Night Fury (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.</p>
                    </TermCard>

                    <TermCard icon={AlertTriangle} title="User Conduct">
                        <p>You agree not to use the Service to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li>Post any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable.</li>
                            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            <li>Upload or transmit any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware.</li>
                        </ul>
                    </TermCard>

                    <TermCard icon={Copyright} title="Intellectual Property">
                        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Night Fury and its licensors. The Service is protected by copyright, trademark, and other laws of both the India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Night Fury.</p>
                    </TermCard>
                </main>
            </div>
        </MainLayout>
    );
}
