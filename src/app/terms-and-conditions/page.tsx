
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, Copyright, CheckSquare, Scale, Ban, Box, User, Edit, Shield, Info, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const TermCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50">
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
                
                <main className="flex-grow p-4 md:p-6 space-y-8">
                     <div className="text-center mb-4">
                        <p className="text-muted-foreground">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <TermCard icon={Info} title="Introduction">
                        <p>Welcome to Invite Designer. These Terms and Conditions ("Terms") govern your use of our website, located at invitedesigner.com, and any related services provided by us (collectively, the "Service"). Please read these Terms carefully. By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our Service.</p>
                    </TermCard>

                    <TermCard icon={CheckSquare} title="Acceptance of Terms">
                        <p>By creating an account, purchasing a product, or otherwise using the Service, you confirm that you have read, understood, and agree to be bound by this agreement. Any participation, including browsing, will constitute acceptance. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. We encourage you to review this page periodically for any updates.</p>
                    </TermCard>

                    <TermCard icon={User} title="User Accounts and Responsibilities">
                        <p>To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate. You must notify us immediately of any unauthorized use of your account or any other breach of security. Invite Designer will not be liable for any loss or damage arising from your failure to comply with this section.</p>
                    </TermCard>

                    <TermCard icon={Ban} title="Prohibited Conduct and Use">
                        <p>You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the business of Invite Designer, or any person. Prohibited activities include, but are not limited to: harassing or abusing other users; violating the intellectual property rights of the company or any third party; engaging in fraudulent activity; and uploading or disseminating any computer viruses or other malicious software.</p>
                    </TermCard>

                    <TermCard icon={Box} title="Products, Services, and Payments">
                        <p>All prices for products and services are listed in Indian Rupees (INR) unless otherwise stated. We reserve the right to change prices at any time without notice. We accept various forms of payment as indicated at checkout. By providing payment information, you represent and warrant that you are authorized to use the designated payment method. We reserve the right to refuse or cancel any order for any reason, including limitations on quantities available, inaccuracies in product or pricing information, or problems identified by our fraud avoidance department.</p>
                    </TermCard>

                    <TermCard icon={Copyright} title="Intellectual Property and License">
                        <p>All content on the Service, including but not limited to text, graphics, logos, images, and digital templates ("Content"), is the property of Invite Designer or its content suppliers and is protected by international copyright laws. When you purchase a template, you are granted a limited, non-exclusive, non-transferable license for personal, non-commercial use only. You may not resell, redistribute, share, or otherwise exploit any template for commercial purposes. Modification of our templates for resale is strictly prohibited.</p>
                    </TermCard>

                    <TermCard icon={Edit} title="User-Generated Content">
                        <p>If you submit content to us, such as for a custom edit request, you grant Invite Designer a non-exclusive, worldwide, royalty-free license to use, reproduce, and modify that content for the purpose of fulfilling your request. You warrant that you have the right to submit this content and that it does not infringe on the rights of any third party. We are not responsible for any user-generated content and do not endorse any opinions contained in such content.</p>
                    </TermCard>

                    <TermCard icon={AlertTriangle} title="Disclaimer of Warranties &amp; Limitation of Liability">
                        <p>The Service is provided on an "as is" and "as available" basis. Invite Designer makes no warranties, expressed or implied, and hereby disclaims all other warranties. In no event shall Invite Designer, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this Service, whether such liability is under contract, tort or otherwise, and Invite Designer shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Service.</p>
                    </TermCard>

                    <TermCard icon={Shield} title="Indemnification">
                        <p>You agree to indemnify, defend, and hold harmless Invite Designer, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that such parties may incur as a result of or arising from your (or anyone using your account's) violation of these Terms.</p>
                    </TermCard>

                    <TermCard icon={Scale} title="Governing Law &amp; Jurisdiction">
                        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in Indore, Madhya Pradesh, India to resolve any dispute or claim arising from these Terms.</p>
                    </TermCard>

                    <TermCard icon={Mail} title="Contact Information">
                        <p>Questions about the Terms and Conditions should be sent to us at <a href="mailto:abhayrat603@gmail.com" className="text-primary hover:underline">abhayrat603@gmail.com</a>.</p>
                    </TermCard>
                </main>
            </div>
        </MainLayout>
    );
}