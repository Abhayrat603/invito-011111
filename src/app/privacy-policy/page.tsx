
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle, FileText, User, Mail, Database, Cookie, Globe } from "lucide-react";
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
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="text-center mb-4">
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <InfoCard icon={FileText} title="Introduction">
                        <p>Welcome to Invite Designer. We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information through the use of our website and services (the "Service"). It applies to all visitors, users, and others who access the Service.</p>
                    </InfoCard>

                    <InfoCard icon={User} title="Information We Collect">
                        <p>We collect information to provide better services to all our users. The types of information we collect depend on how you use our Service.</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li><strong>Personal Information you provide:</strong> This includes your name, email address, phone number, and password when you create an account. It also includes details you provide in edit requests.</li>
                            <li><strong>Information from your use of our services:</strong> We collect information about the services you use and how you use them. This includes designs you view or purchase, pages you visit, and your interactions with our features.</li>
                            <li><strong>Device and Log Information:</strong> We may collect device-specific information (such as your hardware model, operating system version). We may also automatically collect and store certain information in server logs, including details of how you used our service and IP address.</li>
                        </ul>
                    </InfoCard>
                    
                    <InfoCard icon={CheckCircle} title="How We Use Information">
                         <p>We use the information we collect for various purposes, including:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li><strong>Provide, maintain, and improve our Service:</strong> To operate our site, process transactions, fulfill edit requests, and provide you with the features and functionality of the Service.</li>
                            <li><strong>Personalize your experience:</strong> To offer you tailored content, such as showing you designs and styles we think you might like.</li>
                            <li><strong>Communicate with you:</strong> To send you service-related notices, including any updates to our terms or policies, and to respond to your inquiries. We may also send you promotional communications, which you can opt out of.</li>
                            <li><strong>Protect Invite Designer and our users:</strong> To detect and prevent fraud, abuse, and other harmful activity.</li>
                            <li><strong>Develop new services:</strong> To understand our user base and develop new designs and features.</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon={Database} title="Data Storage and Security">
                        <p>Your information is stored on secure servers. We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. These measures include data encryption and firewalls. However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.</p>
                    </InfoCard>

                    <InfoCard icon={Cookie} title="Cookies and Similar Technologies">
                        <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
                    </InfoCard>

                    <InfoCard icon={Globe} title="Your Privacy Rights">
                        <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. You can typically manage your profile information through your account settings. If you need further assistance, please contact us using the details below.</p>
                    </InfoCard>

                     <InfoCard icon={Mail} title="Contact Us">
                        <p>If you have any questions about this Privacy Policy, please contact us:</p>
                        <ul className="list-none space-y-1">
                            <li>By email: abhayrat603@gmail.com</li>
                            <li>By phone: +91 8463062603</li>
                            <li>By visiting this page on our website: invitedesigner.com/contact</li>
                        </ul>
                    </InfoCard>
                </main>
            </div>
        </MainLayout>
    );
}
