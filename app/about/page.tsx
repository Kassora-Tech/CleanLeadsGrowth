import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Search, UserCheck, Zap, Shield } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { Section, Container, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:       "About Us — How We Source & Screen Cleaning Leads",
  description: `Learn how ${siteConfig.name} sources, screens, and delivers exclusive cleaning leads to residential and commercial cleaning businesses.`,
  alternates:  { canonical: absoluteUrl("/about") },
};

const screeningSteps = [
  {
    icon: Search,
    title: "1. Targeted Acquisition",
    body: "We run targeted digital campaigns designed to reach homeowners and business owners actively seeking cleaning services — not casual browsers.",
  },
  {
    icon: UserCheck,
    title: "2. Intent Verification",
    body: "Every lead is screened for genuine service intent. We confirm they're actually requesting a quote, not just clicking an ad out of curiosity.",
  },
  {
    icon: CheckCircle,
    title: "3. Contact Validation",
    body: "Phone number and email are verified to ensure deliverability. We filter out test entries, bot submissions, and unresponsive contacts.",
  },
  {
    icon: Zap,
    title: "4. Exclusive Assignment",
    body: "The lead is assigned to exactly one contractor — you. No bidding wars, no shared leads, no race to respond.",
  },
  {
    icon: Shield,
    title: "5. Real-Time Delivery",
    body: "Your lead hits your inbox (and optionally SMS/CRM) within minutes. First-mover advantage is everything in this market.",
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
              We Built the Lead Gen Service We Wished Existed
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed">
              {/* PLACEHOLDER — replace with real founder story */}
              [PLACEHOLDER — Founder story: Who started this company, what problem they experienced
              in the cleaning industry, and why they built a better lead generation solution.
              Keep it specific, personal, and ROI-focused. 2–3 paragraphs.]
            </p>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-white" />

      {/* Lead screening process */}
      <Section bg="white">
        <Container>
          <SectionHeader
            eyebrow="Our Process"
            heading="How We Screen Every Lead"
            subheading="We don't just buy lists and resell them. Every lead passes a 5-step qualification process before it reaches your inbox."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {screeningSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="bg-navy-50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
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
              Service Area Coverage
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {/* PLACEHOLDER — client to confirm service areas */}
              [PLACEHOLDER — List the cities, states, or metro areas covered. Include a map image
              or embed if available. Mention plans for expansion if applicable.]
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
