import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import ContactForm from "@/components/forms/ContactForm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:       "Contact Us — Cleaning Services",
  description: `Get in touch with ${siteConfig.name}. Call, WhatsApp, or email us — we respond within 1 business day.`,
  alternates:  { canonical: absoluteUrl("/contact") },
};

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneTel}`,
    description: `Available ${siteConfig.businessHours}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi! I have a question about your cleaning services.")}`,
    description: "Usually replies within the hour",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Response within 1 business day",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: siteConfig.businessHours,
    href: null,
    description: "[PLACEHOLDER — confirm timezone]",
  },
];

export default function ContactPage() {
  return (
    <>
      <SiteNav />

      <Section bg="navy" className="pt-32 pb-0">
        <Container>
          <div className="max-w-xl pb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">Contact</p>
            <h1 className="text-5xl font-extrabold text-white tracking-tighter mb-4">
              We&apos;re Here to Help
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              Have a question about booking, pricing, or your service? Reach us by
              phone, WhatsApp, or the form below — we respond fast.
            </p>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-white" />

      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Contact methods */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Ways to Reach Us</h2>
              <div className="flex flex-col gap-4">
                {contactMethods.map(({ icon: Icon, label, value, href, description, external }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-navy-50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="text-navy-900 font-semibold hover:text-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-navy-900 font-semibold">{value}</p>
                      )}
                      <p className="text-slate-500 text-xs mt-1">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address placeholder */}
              <div className="mt-6 p-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-500 text-sm">
                [PLACEHOLDER — CLIENT TO PROVIDE ADDRESS / MAP IF APPLICABLE]
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </>
  );
}
