"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle, FileText, User, Mail, Database, Cookie, Globe, Edit, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
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

export default function PrivacyPolicyPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                
                <main className="flex-grow p-4 md:p-6 space-y-8">
                    <div className="text-center mb-4">
                        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <InfoCard icon={FileText} title="Introduction">
                        <p>Welcome to Invite Designer ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website and in using our services. This Privacy Policy ("Policy") outlines our practices regarding the collection, use, and disclosure of your Personal Information when you use our Service. It applies to all visitors, users, and others who access the Service. By using our service, you agree to the collection and use of information in accordance with this policy. We do not sell your personal data to third parties.</p>
                    </InfoCard>

                    <InfoCard icon={User} title="Information We Collect">
                        <p>We collect information that you provide directly to us, information we collect automatically when you use our Services, and information we collect from other sources. This helps us provide and improve our services.</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li><strong>Personal Information you provide:</strong> This includes your name, email address, phone number, and password when you create an account. It also includes payment information when you make a purchase, and any details or images you provide in custom edit requests.</li>
                            <li><strong>Usage Information:</strong> We collect information about how you use our services. This includes designs you view, purchase history, pages you visit, items you add to your cart or wishlist, and your interactions with our features.</li>
                            <li><strong>Log and Device Information:</strong> We automatically collect log and device information when you access and use the Services. This information includes details about how you’ve used the services, IP address, access dates and times, hardware and software information, device information, and cookie data.</li>
                        </ul>
                    </InfoCard>
                    
                    <InfoCard icon={CheckCircle} title="How We Use Your Information">
                         <p>We use the information we collect for a variety of business purposes, including:</p>
                        <ul className="list-disc list-inside space-y-2 pl-2">
                            <li><strong>To Provide, Improve, and Develop the Service:</strong> We use your information to operate and maintain your account, process transactions, fulfill your orders and edit requests, and to provide you with the core features of our Service.</li>
                            <li><strong>To Personalize Your Experience:</strong> We may use your information to offer you tailored content, such as recommending designs and styles that we think you might like based on your browsing history and purchases.</li>
                            <li><strong>To Communicate with You:</strong> To send you service-related notifications, security alerts, and support messages. We may also send you promotional communications about new products, special offers, and other news about Invite Designer, which you can opt out of at any time.</li>
                            <li><strong>To Maintain a Safe and Trusted Environment:</strong> We use your information to detect and prevent fraud, spam, abuse, security incidents, and other harmful activity.</li>
                            <li><strong>For Research and Development:</strong> We analyze user behavior to understand trends, which helps us to develop new services, features, and designs.</li>
                        </ul>
                    </InfoCard>

                    <InfoCard icon={Share2} title="Information Sharing and Disclosure">
                        <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you (such as payment processors or email service providers), so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</p>
                    </InfoCard>

                    <InfoCard icon={Database} title="Data Storage, Security, and Retention">
                        <p>Your information is stored on secure servers, and we use a variety of technical and administrative security measures to maintain the safety of your personal information. These measures include data encryption, firewalls, and secure access controls. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. We will retain your information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements.</p>
                    </InfoCard>

                    <InfoCard icon={Cookie} title="Cookies and Tracking Technologies">
                        <p>We use cookies and similar tracking technologies (like web beacons and pixels) to track the activity on our Service and hold certain information. Cookies are files with a small amount of data. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service. We use them to understand and save your preferences for future visits and compile aggregate data about site traffic and interaction.</p>
                    </InfoCard>

                    <InfoCard icon={Globe} title="Your Privacy Rights &amp; Choices">
                        <p>You have certain rights and choices regarding your personal information. Depending on your location, you may have the right to: access, correct, or delete your data; object to or restrict certain types of processing. You can manage your profile information and communication preferences through your account settings. If you wish to exercise any of these rights, please contact us using the details below. We will respond to your request in accordance with applicable law.</p>
                    </InfoCard>

                    <InfoCard icon={Edit} title="Changes to This Privacy Policy">
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes. Changes to this PrivacyPolicy are effective when they are posted on this page.</p>
                    </InfoCard>

                     <InfoCard icon={Mail} title="Contact Us">
                        <p>If you have any questions, concerns, or complaints about this Privacy Policy, our practices, or our Services, you may contact us:</p>
                        <ul className="list-none space-y-1">
                            <li>By email: <a href="mailto:privacy@invitedesigner.com" className="text-primary hover:underline">privacy@invitedesigner.com</a></li>
                            <li>By phone: <a href="tel:+918463062603" className="text-primary hover:underline">+91 8463062603</a></li>
                            <li>By visiting this page on our website: invitedesigner.com/contact-us</li>
                        </ul>
                    </InfoCard>
                </main>
            </div>
        </MainLayout>
    );
}