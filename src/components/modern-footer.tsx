"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Linkedin,
  Send,
  Star,
  Award,
  Users,
  Clock
} from "lucide-react";
import { useState } from "react";

const footerLinks = {
  "Popular Categories": [
    { name: "Wedding Invitations", href: "/products/classic-wedding-invitation" },
    { name: "Birthday Invitations", href: "/products/modern-birthday-bash" },
    { name: "Corporate Events", href: "/products/corporate-gala-invite" },
    { name: "Party Invitations", href: "/products/summer-pool-party" },
    { name: "E-Invites", href: "/products/classic-wedding-invitation" }
  ],
  "Products": [
    { name: "New Designs", href: "/menu" },
    { name: "Special Offers", href: "/deals" },
    { name: "Request For Edit", href: "/request-edit" },
    { name: "Help Center", href: "/help-center" },
    { name: "AI Assistant", href: "/ai-help" }
  ],
  "Company": [
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Careers", href: "#" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" }
];

const features = [
  { icon: Award, text: "Premium Quality" },
  { icon: Users, text: "50K+ Customers" },
  { icon: Clock, text: "24/7 Support" },
  { icon: Star, text: "4.9 Rating" }
];

export function ModernFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-background via-secondary/10 to-accent/20 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <Card className="mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-headline font-bold mb-4">
              Stay Updated with Latest Designs
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new templates, 
              special offers, and design tips for your perfect invitation.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="hover-lift">
                <Send className="w-4 h-4 mr-2" />
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            
            {isSubscribed && (
              <Badge className="mt-3 bg-green-500 text-white animate-fadeInUp">
                ✅ Thank you for subscribing!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
                I
              </div>
              <h3 className="text-xl font-bold">Invite Designer</h3>
            </div>
            
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Create stunning, personalized invitations for every special occasion. 
              From weddings to birthdays, we help you make every moment memorable.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <Card className="mb-8 bg-card/50">
          <CardContent className="p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Get in Touch
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href="mailto:abhayrat603@gmail.com" className="text-muted-foreground hover:text-primary">
                  abhayrat603@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href="tel:+918463062603" className="text-muted-foreground hover:text-primary">
                  +91 84630 62603
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">India</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Invite Designer. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}