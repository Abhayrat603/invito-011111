
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle, FileText, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div className="flex items-center mb-3">
            <Icon className="h-8 w-8 text-primary mr-4" />
            <h3 className="text-2xl font-headline text-primary">{title}</h3>
        </div>
        <div className="text-foreground/80 space-y-3 leading-relaxed">
            {children}
        </div>
    </div>
);

export default function PrivacyPolicyPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div className="flex-grow flex items-center justify-center">
                       <Shield className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">Privacy Policy</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow p-4 md:p-6 space-y-6">
                    <div className="text-center mb-6">
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <InfoCard icon={FileText} title="Introduction">
                        <p>Welcome to Night Fury. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information through the use of our website and services.</p>
                    </InfoCard>

                    <InfoCard icon={User} title="Information We Collect">
                        <p>We collect information to provide better services to all our users. We collect information in the following ways:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li><strong>Information you give us:</strong> This includes your name, email address, phone number, and password when you create an account.</li>
                            <li><strong>Information we get from your use of our services:</strong> We may collect information about the services that you use and how you use them, like when you visit a certain page or what products you view.</li>
                            <li><strong>Device information:</strong> We may collect device-specific information (such as your hardware model, operating system version, and mobile network information).</li>
                        </ul>
                    </InfoCard>
                    
                    <InfoCard icon={CheckCircle} title="How We Use Information">
                        <p>We use the information we collect to provide, maintain, protect, and improve our services, to develop new ones, and to protect Night Fury and our users. We also use this information to offer you tailored content.</p>
                        <p>We may use the name you provide for your Night Fury Profile across all of the services we offer that require a Night Fury Account. In addition, we may replace past names associated with your Night Fury Account so that you are represented consistently across all our services.</p>
                    </InfoCard>

                     <InfoCard icon={Mail} title="Contact Us">
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul className="list-none space-y-1">
                            <li>By email: privacy@nightfury.com</li>
                            <li>By visiting this page on our website: nightfury.com/contact</li>
                        </ul>
                    </InfoCard>
                </main>
            </div>
        </MainLayout>
    );
}
