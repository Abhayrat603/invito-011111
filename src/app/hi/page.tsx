import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "हिंदी - Invite Designer",
  description: "अपने इवेंट/बिज़नेस के लिए खूबसूरत वेबसाइट और इनविटेशन डिज़ाइन बनवाएँ।",
};

export default function HindiLandingPage() {
  return (
    <MainLayout>
      <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="relative w-full h-64 md:h-80">
          <Image
            src="https://picsum.photos/seed/invitedit-hero-hi/1200/800"
            alt="खूबसूरत इनविटेशन और वेबसाइट डिज़ाइन"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl font-headline text-primary-foreground">
                अपने इवेंट के लिए खूबसूरत वेबसाइट/इनविटेशन बनवाएँ
              </h1>
              <p className="mt-2 text-primary-foreground/90 max-w-md mx-auto">
                शादी, बर्थडे, एनिवर्सरी, कॉर्पोरेट इवेंट — सबके लिए कस्टम डिज़ाइन।
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="https://wa.me/918463062603" target="_blank" rel="noopener noreferrer">
                    WhatsApp पर बात करें
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="/contact-us">संपर्क करें</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-border/50">
            <h3 className="text-lg font-semibold mb-1">तेज़ डिलीवरी</h3>
            <p className="text-muted-foreground text-sm">जल्दी चाहिए? हम फ़ास्ट टर्नअराउंड के साथ डिलीवर करते हैं।</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border/50">
            <h3 className="text-lg font-semibold mb-1">कस्टमाइज़ेशन</h3>
            <p className="text-muted-foreground text-sm">नाम, फोटो, कलर, फ़ॉन्ट—सब कुछ आपके हिसाब से।</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border/50">
            <h3 className="text-lg font-semibold mb-1">बेहतरीन क्वालिटी</h3>
            <p className="text-muted-foreground text-sm">मॉडर्न और प्रोफेशनल डिज़ाइन्स जो सबको पसंद आएँ।</p>
          </div>
        </section>

        {/* Categories */}
        <section className="px-6 pb-8 space-y-3">
          <h2 className="text-2xl font-headline font-bold text-primary">हम क्या बनाते हैं</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li className="bg-card p-3 rounded-lg border">शादी का निमंत्रण</li>
            <li className="bg-card p-3 rounded-lg border">बर्थडे इनविटेशन</li>
            <li className="bg-card p-3 rounded-lg border">एंगेजमेंट/एनिवर्सरी</li>
            <li className="bg-card p-3 rounded-lg border">कॉर्पोरेट इनविटेशन</li>
            <li className="bg-card p-3 rounded-lg border">ई‑इनवाइट/डिजिटल</li>
            <li className="bg-card p-3 rounded-lg border">सेव द डेट</li>
          </ul>
        </section>

        {/* Final CTA */}
        <section className="px-6 pb-12 text-center">
          <h3 className="text-xl font-semibold">अपना प्रोजेक्ट शुरू करें</h3>
          <p className="text-muted-foreground mt-1">हमें मैसेज करें या फ़ॉर्म भरें।</p>
          <div className="mt-4 flex justify-center gap-3">
            <Button className="rounded-full" asChild>
              <a href="https://wa.me/918463062603" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="/contact-us">Contact Form</a>
            </Button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
