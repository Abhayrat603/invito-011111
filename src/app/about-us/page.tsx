
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
                                At Invite Designer, we believe every great event starts with a beautiful invitation. It's the first glimpse your guests have of the special day you're planning, setting the tone and building anticipation. We are a passionate team of designers, artists, and creators dedicated to providing stunning, customizable digital and print invitations crafted with exceptional quality and boundless creativity. Our platform is more than just a store; it’s a space where your vision for the perfect event comes to life.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-border/50 py-8">
                            <FeatureCard icon={Zap} title="Our Mission" description="To empower everyone to create beautiful, memorable, and personalized invitations for life's most important moments, making high-quality design accessible and affordable for all." />
                            <FeatureCard icon={Eye} title="Our Vision" description="To become the world's leading platform for digital and print invitations, celebrated for our innovation, artistic excellence, and an unwavering commitment to our customers' happiness and creative expression." />
                            <FeatureCard icon={Heart} title="Our Values" description="Creativity, Quality, and Customer Happiness are the foundational pillars that support every design we craft and every decision we make. We believe in the power of great design to connect people." />
                        </div>

                        <InfoCard icon={Users} title="Our Story">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>Founded in the vibrant year of 2023, Invite Designer was born from a simple yet powerful idea: to make high-quality, bespoke design accessible to everyone, regardless of their budget or design skills. Our founders, a small group of graphic designers and event enthusiasts, noticed a gap in the market for invitations that were not only beautiful but also truly easy to customize and affordable. They wanted to build a brand that helps people celebrate their special moments—from weddings to birthdays, and every milestone in between—in style, without the traditional hassle and high costs.</p>
                                <p>What started as a boutique design studio has blossomed into a thriving online platform, serving a global community of celebrators. Our growth is a testament to the stories and support of our amazing customers. Every invitation we create becomes a small part of a larger celebration, a piece of someone's personal history, and we are deeply honored to be included in so many joyous occasions around the world.</p>
                            </div>
                        </InfoCard>

                         <InfoCard icon={Award} title="Commitment to Quality">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>We are relentlessly passionate about quality. It’s a non-negotiable aspect of our work. From the initial spark of a design concept to the final digital template or printed card, every detail is meticulously considered and refined. We partner with a curated network of talented independent designers and artists who share our unwavering commitment to excellence. This ensures that every piece from Invite Designer is not just a product, but a work of art that you can be proud to share with your loved ones.</p>
                            </div>
                        </InfoCard>

                        <InfoCard icon={Leaf} title="Sustainability & Responsibility">
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>In today's world, we recognize the importance of environmental responsibility. We actively encourage the use of our digital invitations as a beautiful, eco-friendly, and instantaneous alternative to traditional paper. For those who cherish the tangible feel of a printed card, we provide guidance and recommendations for using recycled paper stocks and partnering with sustainable, local printing services. This is a journey of continuous improvement, and we are steadfast in our commitment to making a positive, lasting impact on our planet.</p>                            </div>
                        </InfoCard>
                        
                        <div className="text-center space-y-4">
                             <h3 className="text-3xl font-headline text-primary">Join Our Journey</h3>
                             <p className="text-muted-foreground">Become a part of the Invite Designer family today! Follow us on our social media channels to stay updated with our latest designs, exclusive collections, party-planning tips, and special offers. We love seeing how you use our designs, so be sure to tag us in your event photos!</p>
                             <Button size="lg" className="rounded-full">Follow Us</Button>
                        </div>

                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
