
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
                            src="https://picsum.photos/seed/about-hero/800/600"
                            layout="fill"
                            objectFit="cover"
                            alt="Team working"
                            data-ai-hint="team collaboration"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                        <div className="absolute inset-0 flex items-end justify-center pb-8">
                             <h2 className="text-4xl font-headline text-primary-foreground text-center">We Are Night Fury</h2>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-12">
                        <div className="text-center">
                            <p className="text-lg text-foreground/80 leading-relaxed">
                                At Night Fury, we believe that fashion is more than just clothing; it's a statement, an art form, and a way to express your unique identity. We're dedicated to bringing you the latest trends and timeless styles, crafted with quality and passion. Our journey started with a simple idea: to create a fashion destination that is inclusive, innovative, and inspiring.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-border/50 py-8">
                            <FeatureCard icon={Zap} title="Our Mission" description="To empower individuals to express their style confidently through innovative and accessible fashion." />
                            <FeatureCard icon={Eye} title="Our Vision" description="To be a leading global fashion brand known for our creativity, quality, and commitment to sustainability." />
                            <FeatureCard icon={Heart} title="Our Values" description="Passion, Integrity, and Customer-centricity guide everything we do. We are for the bold and the brave." />
                        </div>

                        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50">
                            <div className="flex items-center mb-3">
                                <Users className="h-8 w-8 text-primary mr-4" />
                                <h3 className="text-2xl font-headline text-primary">Our Story</h3>
                            </div>
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>Founded in 2023, Night Fury was born from a desire to break the mold of conventional fashion. We saw a world of fast fashion that lacked soul and a high-fashion industry that felt out of reach. We wanted to build something different: a brand that offers high-quality, trend-setting pieces at a fair price, all while building a community of fashion lovers who aren't afraid to stand out.</p>
                                <p>From a small studio to a burgeoning online presence, our growth has been fueled by the support of our incredible customers. Every collection we release is a new chapter in our story, and we're thrilled to have you along for the ride.</p>
                            </div>
                        </div>

                         <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50">
                            <div className="flex items-center mb-3">
                                <Award className="h-8 w-8 text-primary mr-4" />
                                <h3 className="text-2xl font-headline text-primary">Commitment to Quality</h3>
                            </div>
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>We are obsessed with quality. From the fabrics we source to the craftsmanship of our tailors, every detail is meticulously considered. We partner with ethical manufacturers and artisans who share our commitment to excellence, ensuring that every Night Fury piece is not only beautiful but also built to last.</p>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border/50">
                            <div className="flex items-center mb-3">
                                <Leaf className="h-8 w-8 text-primary mr-4" />
                                <h3 className="text-2xl font-headline text-primary">Sustainability Efforts</h3>
                            </div>
                            <div className="text-foreground/80 space-y-3 leading-relaxed">
                                <p>Fashion should not come at the expense of our planet. We are continuously working to make our processes more sustainable, from using eco-friendly materials and reducing waste in our production cycle to offering recyclable packaging. It's a journey of constant improvement, and we are committed to making a positive impact.</p>
                            </div>
                        </div>
                        
                        <div className="text-center space-y-4">
                             <h3 className="text-3xl font-headline text-primary">Join Our Journey</h3>
                             <p className="text-muted-foreground">Follow us on our social media channels to stay updated with our latest collections, behind-the-scenes content, and special offers. Become a part of the Night Fury family today!</p>
                             <Button size="lg" className="rounded-full">Follow Us</Button>
                        </div>

                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
