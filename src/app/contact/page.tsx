import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Contact Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-lg border">
            <h2 className="text-2xl font-bold font-headline">Send us a Message</h2>
            <form className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help?" rows={5} />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </div>
          
          <div className="space-y-8">
             <div>
                <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
                <p className="mt-2 text-muted-foreground">Find us here or drop us a line.</p>
             </div>
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Our Office</h3>
                        <p className="text-muted-foreground">123 Motion Drive, Active City, 12345</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <p className="text-muted-foreground">support@emotion.com</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-md mt-1">
                        <Phone className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                </div>
             </div>
             <div>
                <h3 className="font-semibold text-lg">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
