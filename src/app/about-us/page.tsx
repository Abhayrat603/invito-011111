
"use client";

import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Eye, Zap, Heart, Users, Award, Leaf } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="text-center p-4">
        <div className="flex justify-center items-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
                <Icon className="h-8 w-8 text-primary" />
            </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </div>
);

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


export default function AboutUsPage() {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="w-full max-w-md mx-auto bg-background text-foreground flex flex-col min-h-screen">
                <header className="p-4 flex items-center border-b sticky top-0 bg-background z-10">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                     <div className="flex-grow flex items-center justify-center">
                       <Info className="h-6 w-6 text-primary mr-2"/>
                       <h1 className="text-xl font-bold">About Us</h1>
                    </div>
                    <div className="w-10"></div>
                </header>
                <main className="flex-grow">
                    <div className="relative h-64 w-full">
                         <Image 
                            src="https://picsum.photos/seed/about-invite/800/600"
                            layout="fill"
                            objectFit="cover"
                            alt="Designers collaborating on invitation cards"
                            data-ai-hint="designers collaboration invitations"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        <div className="absolute inset-0 flex items-end justify-center pb-8">
                             <h2 className="text-4xl font-headline text-primary-foreground text-center">We Are Invite Designer</h2>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        <div className="text-center">
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                At Invite Designer, we believe every great event starts with a beautiful invitation. It's the first glimpse your guests have of the special day you're planning. We're dedicated to providing stunning, customizable digital and print invitations crafted with quality and passion.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-border/50 py-8">
                            <FeatureCard icon={Zap} title="Our Mission" description="To empower everyone to create beautiful, personalized invitations for life's most important moments." />
                            <FeatureCard icon={Eye} title="Our Vision" description="To be the leading platform for digital and print invitations, known for creativity, quality, and ease of use." />
                            <FeatureCard icon={Heart} title="Our Values" description="Creativity, Quality, and Customer Happiness are at the core of everything we design." />
                        </div>

                        <InfoCard icon={Users} title="Our Story">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>Founded in 2023, Invite Designer was born from a desire to make high-quality design accessible to everyone. We saw a need for invitations that were not only beautiful but also easy to customize and affordable. We wanted to build a brand that helps people celebrate their special moments in style, without the hassle.</p>
                                <p>From a small design studio to a growing online platform, our growth is driven by our amazing customers and their stories. Every invitation we create is a part of a celebration, and we're honored to be included.</p>
                            </div>
                        </InfoCard>

                         <InfoCard icon={Award} title="Commitment to Quality">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>We are obsessed with quality. From the digital templates we design to the paper we recommend for printing, every detail is meticulously considered. We partner with talented designers and artists who share our commitment to excellence, ensuring every Invite Designer piece is a work of art.</p>
                            </div>
                        </InfoCard>

                        <InfoCard icon={Leaf} title="Sustainability">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>We encourage digital invitations as a beautiful, eco-friendly alternative to paper. For those who love print, we recommend using recycled paper and sustainable printing practices. It's a journey of constant improvement, and we are committed to making a positive impact.</p>
                            </div>
                        </InfoCard>
                        
                        <div className="text-center space-y-4">
                             <h3 className="text-3xl font-headline text-primary">Join Our Journey</h3>
                             <p className="text-muted-foreground">Follow us on our social media channels to stay updated with our latest designs, tips, and special offers. Become a part of the Invite Designer family today!</p>
                             <Button size="lg" className="rounded-full">Follow Us</Button>
                        </div>

                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
