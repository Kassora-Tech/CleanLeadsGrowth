import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";
import { getServiceBySlug, getAllServiceSlugs, services } from "@/lib/services";
import { absoluteUrl } from "@/lib/utils";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import QuoteForm from "@/components/forms/QuoteForm";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title:       service.metaTitle,
    description: service.metaDescription,
    alternates:  { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph:   { url: absoluteUrl(`/services/${service.slug}`) },
  };
}

export default function ServicePage({ params }: Props) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = services.filter((s) => service.relatedSlugs.includes(s.slug));

  return (
    <>
      <SiteNav />

      {/* Hero */}
      <Section bg="navy" className="pt-32 pb-0">
        <Container>
          <div className="max-w-3xl pb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Exclusive Leads
            </p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tighter mb-6 text-balance">
              {service.h1}
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed mb-8">{service.intro}</p>
            <Button asChild variant="primary" size="lg">
              <Link href="/get-quote">
                Get These Leads <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-white" />

      {/* Sourcing explainer */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">
                How We Source Them
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tighter mb-6">
                Only Pre-Screened Leads Reach You
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">{service.sourcingExplainer}</p>
              <ul className="flex flex-col gap-3">
                {["Verified contact info", "Confirmed service intent", "Exclusive — sent to you only", "Real-time delivery"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-navy-800 font-medium text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy-50 rounded-2xl border border-slate-200 p-8">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-1">Why It Matters</p>
              <p className="text-navy-900 text-lg font-semibold leading-relaxed">
                {service.seoCopy}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-50" />

      {/* Case study */}
      <Section bg="light">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Client Result [PLACEHOLDER]
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tighter mb-8">
              Real Results from Real Cleaning Businesses
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 text-left">
              <Quote className="h-8 w-8 text-green-500 mb-4" aria-hidden="true" />
              <blockquote>
                <p className="text-navy-800 text-lg leading-relaxed italic mb-6">
                  &#34;{service.caseStudy.quote}&#34;
                </p>
                <footer>
                  <div className="font-bold text-navy-900">{service.caseStudy.businessName}</div>
                  <div className="text-slate-500 text-sm">{service.caseStudy.location}</div>
                  <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-green-700 text-sm font-semibold">
                    <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    {service.caseStudy.result}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-900" />

      {/* Embedded quote form */}
      <Section bg="navy">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tighter mb-3">
                Start Receiving {service.h1.split(" ")[0]} Leads Today
              </h2>
              <p className="text-navy-200">Fill out the form and we&apos;ll be in touch within 24 hours.</p>
            </div>
            <QuoteForm variant="embedded" />
          </div>
        </Container>
      </Section>

      {/* Related services */}
      {related.length > 0 && (
        <>
          <Divider variant="down" fill="fill-white" />
          <Section bg="white" tight>
            <Container>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Other Lead Types We Offer</h2>
              <div className="flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-navy-900 text-navy-900 text-sm font-semibold hover:bg-navy-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    {r.h1.replace(" for Cleaning Companies", "")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  See Pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Container>
          </Section>
        </>
      )}

      <SiteFooter />
    </>
  );
}
