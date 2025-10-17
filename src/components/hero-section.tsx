"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Heart, Gift, Calendar, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Create stunning invitations with our intelligent design assistant"
  },
  {
    icon: Heart,
    title: "Personalized Touch",
    description: "Customize every detail to match your unique style and occasion"
  },
  {
    icon: Gift,
    title: "Special Occasions",
    description: "Perfect for weddings, birthdays, corporate events, and more"
  },
  {
    icon: Calendar,
    title: "Quick Delivery",
    description: "Fast turnaround times to meet your event deadlines"
  }
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "100K+", label: "Invitations Created" },
  { number: "4.9", label: "Average Rating", icon: Star },
  { number: "24/7", label: "Support Available" }
];

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative px-4 py-16 mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <Badge className="mb-4 animate-fadeInUp" variant="secondary">
            ✨ Welcome to Invite Designer
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 animate-fadeInUp gradient-text">
            Create Beautiful
            <br />
            Invitation Cards
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slideInRight">
            Design stunning, personalized invitations for every special occasion. 
            From weddings to birthdays, make your events unforgettable with our 
            professional templates and AI-powered customization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
            <Button size="lg" className="hover-lift animate-pulse-glow">
              <Link href="/menu" className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Start Creating
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="hover-lift">
              <Link href="/about-us">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="glass hover-lift animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </span>
                  {stat.icon && <stat.icon className="w-5 h-5 ml-1 text-yellow-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 animate-fadeInUp">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-headline font-bold mb-4">
              Join Thousands of Happy Customers
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Create your first invitation today and experience the magic of professional design 
              made simple. No design experience required!
            </p>
            <Button size="lg" className="hover-lift">
              <Link href="/signup">
                Get Started Free
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}