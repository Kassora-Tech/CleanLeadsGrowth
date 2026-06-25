import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Smile, Users } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:       "About Us — Professional Cleaning Services",
  description: `Learn about ${siteConfig.name} — our team, our standards, and why hundreds of customers trust us with their homes and workplaces.`,
  alternates:  { canonical: absoluteUrl("/about") },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Vetted & Insured",
    body: "Every cleaner on our team is background-checked, fully insured, and trained before they work in any client's property. [CLIENT TO CONFIRM]",
  },
  {
    icon: Clock,
    title: "Reliable Every Time",
    body: "We know how frustrating it is when a cleaner doesn't show up. We have a strict punctuality policy and always communicate in advance if anything changes. [CLIENT TO CONFIRM]",
  },
  {
    icon: Smile,
    title: "Satisfaction Guaranteed",
    body: "If you're not happy with any aspect of the clean, we come back and re-do it free of charge. No questions asked.",
  },
  {
    icon: Users,
    title: "Local & Personal",
    body: "We're a local cleaning company — not a national franchise. You get a consistent team, a direct contact number, and service that feels personal. [CLIENT TO CONFIRM]",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <Section bg="navy" className="pt-32 pb-0">
        <Container>
          <div className="max-w-3xl pb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tighter mb-6 text-balance">
              A Cleaning Service You Can Actually Trust
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              {/* PLACEHOLDER — replace with real founder/company story */}
              [PLACEHOLDER — Company story: Who founded this business, what motivated them,
              how long they&apos;ve been operating, what makes them different from other cleaning
              companies in the area. Keep it genuine and personal — 2–3 paragraphs.]
            </p>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-white" />

      {/* Values */}
      <Section bg="white">
        <Container>
          <SectionHeader
            eyebrow="Our Values"
            heading="What We Stand For"
            subheading="We built this service around the things customers told us mattered most — reliability, trust, and results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-navy-50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">{v.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-50" />

      {/* Service area */}
      <Section bg="light" tight>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tighter mb-4">
              Where We Operate
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {/* PLACEHOLDER — client to confirm service areas */}
              [PLACEHOLDER — List the cities, suburbs, or metro areas serviced. Include a map
              or coverage zone description. Mention if new areas are being added.]
            </p>
            <Button asChild variant="primary" size="lg">
              <Link href="/get-quote">
                Check Your Area <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </>
  );
}
