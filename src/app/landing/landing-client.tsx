"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Language = "hi" | "en";

const translations: Record<Language, Record<string, string>> = {
  hi: {
    brand: "Aapki Website",
    nav_home: "होम",
    nav_services: "सेवाएँ",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क",
    hero_title: "हम आपके लिए सुंदर वेबसाइट बनाते हैं",
    hero_sub:
      "तेज़, उत्तरदायी और आधुनिक डिजाइन जो आपके व्यवसाय को आगे बढ़ाए।",
    hero_cta_primary: "शुरू करें",
    hero_cta_secondary: "पोर्टफोलियो देखें",
    services_title: "हम क्या करते हैं",
    s1: "कस्टम वेबसाइट डिजाइन",
    s2: "ई-कॉमर्स स्टोर",
    s3: "एसईओ और परफॉरमेंस",
    about_title: "हमारे बारे में",
    about_text:
      "हम एक छोटी लेकिन अनुभवी टीम हैं जो साफ, उपयोगकर्ता-केंद्रित उत्पाद बनाती है। हम तेज़ डिलिवरी, साफ कोड और शानदार सपोर्ट में विश्वास करते हैं।",
    contact_title: "संपर्क करें",
    contact_name: "नाम",
    contact_email: "ईमेल",
    contact_message: "संदेश",
    contact_send: "भेजें",
    footer_text: "© ",
  },
  en: {
    brand: "Your Website",
    nav_home: "Home",
    nav_services: "Services",
    nav_about: "About",
    nav_contact: "Contact",
    hero_title: "We build beautiful websites for you",
    hero_sub:
      "Fast, responsive and modern designs that accelerate your business.",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "View Portfolio",
    services_title: "What we do",
    s1: "Custom Website Design",
    s2: "E‑commerce Stores",
    s3: "SEO and Performance",
    about_title: "About us",
    about_text:
      "We are a small but experienced team building clean, user‑centric products. We believe in fast delivery, clean code, and great support.",
    contact_title: "Contact us",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_send: "Send",
    footer_text: "© ",
  },
};

export default function LandingClient() {
  const [lang, setLang] = useState<Language>("hi");
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link href="#home" className="font-headline text-xl font-bold text-primary">
            {t.brand}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-primary">{t.nav_home}</a>
            <a href="#services" className="hover:text-primary">{t.nav_services}</a>
            <a href="#about" className="hover:text-primary">{t.nav_about}</a>
            <a href="#contact" className="hover:text-primary">{t.nav_contact}</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-xs"
              onClick={() => setLang((l) => (l === "hi" ? "en" : "hi"))}
            >
              {lang === "hi" ? "EN" : "HI"}
            </Button>
            <Link href="#contact">
              <Button className="hidden md:inline-flex">{t.hero_cta_primary}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold leading-tight mb-4 text-primary">
              {t.hero_title}
            </h1>
            <p className="text-muted-foreground mb-6 text-lg">{t.hero_sub}</p>
            <div className="flex gap-3">
              <Link href="#contact"><Button>{t.hero_cta_primary}</Button></Link>
              <Link href="/"><Button variant="outline">{t.hero_cta_secondary}</Button></Link>
            </div>
          </div>
          <div className="rounded-2xl bg-card p-8 border shadow-sm">
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary/20 to-accent/30" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-12">
        <h2 className="font-headline text-3xl font-semibold mb-6">{t.services_title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[t.s1, t.s2, t.s3].map((label) => (
            <div key={label} className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{label}</h3>
              <p className="text-sm text-muted-foreground">
                {lang === "hi"
                  ? "उत्तरदायी डिजाइन, तेज़ लोडिंग और आसान प्रबंधन।"
                  : "Responsive design, fast loading and easy management."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="container mx-auto px-4 py-12">
        <h2 className="font-headline text-3xl font-semibold mb-4">{t.about_title}</h2>
        <p className="text-muted-foreground max-w-3xl">{t.about_text}</p>
      </section>

      {/* Contact */}
      <section id="contact" className="container mx-auto px-4 py-12">
        <h2 className="font-headline text-3xl font-semibold mb-6">{t.contact_title}</h2>
        <form
          className="grid gap-4 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const name = (data.get("name") as string) || "";
            const email = (data.get("email") as string) || "";
            const message = (data.get("message") as string) || "";
            const subject = encodeURIComponent(`[Website Lead] ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
          }}
        >
          <label className="grid gap-1">
            <span className="text-sm">{t.contact_name}</span>
            <Input name="name" required placeholder={t.contact_name} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">{t.contact_email}</span>
            <Input type="email" name="email" required placeholder={t.contact_email} />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">{t.contact_message}</span>
            <Textarea name="message" required rows={5} placeholder={t.contact_message} />
          </label>
          <div>
            <Button type="submit">{t.contact_send}</Button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-8">
        <div className="container mx-auto px-4 text-sm text-muted-foreground">
          {t.footer_text}{new Date().getFullYear()} Invite Designer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
