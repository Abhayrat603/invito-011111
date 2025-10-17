"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company?: string;
  image: string;
  rating: number;
  quote: string;
  occasion: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Bride",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    quote: "The wedding invitations were absolutely stunning! The AI-powered design suggestions helped us create something truly unique. Our guests are still talking about how beautiful they were.",
    occasion: "Wedding"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    title: "Event Manager",
    company: "Elite Events",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    quote: "As an event manager, I need reliable and creative invitation designs. Invite Designer has become my go-to platform. The quality and turnaround time are exceptional.",
    occasion: "Corporate"
  },
  {
    id: "3",
    name: "Anita Patel",
    title: "Mother",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    quote: "My daughter's birthday party invitations were perfect! The customization options allowed us to match her favorite colors and theme. Highly recommended!",
    occasion: "Birthday"
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "Business Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    quote: "Professional, elegant, and delivered on time. The corporate event invitations helped set the perfect tone for our company's annual gala.",
    occasion: "Corporate"
  },
  {
    id: "5",
    name: "Meera Reddy",
    title: "New Mom",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    quote: "The baby shower invitations were adorable! The team understood exactly what I wanted and delivered beyond my expectations. Thank you for making our day special!",
    occasion: "Baby Shower"
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-secondary/20 to-accent/20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            ⭐ Customer Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4 gradient-text">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied customers who trust us with their special moments
          </p>
        </div>

        {/* Main Testimonial */}
        <Card className="glass hover-lift animate-fadeInUp mb-8">
          <CardContent className="p-8 text-center">
            <Quote className="w-12 h-12 text-primary/50 mx-auto mb-6" />
            
            <blockquote className="text-lg md:text-xl text-foreground/90 italic mb-6 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    i < currentTestimonial.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Avatar className="w-16 h-16 border-4 border-background shadow-md">
                <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                <AvatarFallback>
                  {currentTestimonial.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-left">
                <h4 className="font-semibold text-foreground">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.title}
                  {currentTestimonial.company && ` • ${currentTestimonial.company}`}
                </p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {currentTestimonial.occasion}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mini Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className={cn(
                "hover-lift cursor-pointer transition-all duration-300",
                index === currentIndex ? "ring-2 ring-primary/50" : ""
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="text-xs">
                      {testimonial.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-sm truncate">
                      {testimonial.name}
                    </h5>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}