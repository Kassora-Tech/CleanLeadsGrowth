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

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const defaultServiceType = service.slug === "residential" ? "residential" : "commercial";

  return (
    <>
      <SiteNav />

      {/* Hero */}
      <Section bg="navy" className="pt-32 pb-0">
        <Container>
          <div className="max-w-3xl pb-16">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Professional Cleaning
            </p>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tighter mb-6 text-balance">
              {service.h1}
            </h1>
            <p className="text-navy-200 text-lg leading-relaxed mb-8">{service.intro}</p>
            <Button asChild variant="primary" size="lg">
              <Link href="/get-quote">
                Get a Free Quote <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-white" />

      {/* What's included */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">
                What&apos;s Included
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-navy-900 tracking-tighter mb-6">
                Every Standard Clean Includes
              </h2>
              <ul className="flex flex-col gap-3">
                {service.whatIsIncluded.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-navy-800 font-medium text-sm">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add-ons */}
            <div className="bg-navy-50 rounded-2xl border border-slate-200 p-8">
              <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold mb-3">
                Optional Add-Ons
              </p>
              <ul className="flex flex-col gap-4">
                {service.addOns.map((addon) => (
                  <li key={addon.name} className="flex flex-col gap-0.5">
                    <span className="font-semibold text-navy-900 text-sm">{addon.name}</span>
                    <span className="text-slate-500 text-xs leading-relaxed">{addon.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Divider variant="down" fill="fill-navy-50" />

      {/* Customer testimonial */}
      <Section bg="light">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-green-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Customer Review [PLACEHOLDER]
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 tracking-tighter mb-8">
              What Our Customers Say
            </h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8 text-left">
              <Quote className="h-8 w-8 text-green-500 mb-4" aria-hidden="true" />
              <blockquote>
                <p className="text-navy-800 text-lg leading-relaxed italic mb-6">
                  &#34;{service.testimonial.quote}&#34;
                </p>
                <footer>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: service.testimonial.rating }, (_, i) => (
                      <svg key={i} className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="font-bold text-navy-900">{service.testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{service.testimonial.location}</div>
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
                Get a Free Quote for {service.h1}
              </h2>
              <p className="text-navy-200">
                Instant estimate, confirmed booking within 24 hours.
              </p>
            </div>
            <QuoteForm variant="embedded" defaultServiceType={defaultServiceType} />
          </div>
        </Container>
      </Section>

      {/* Other services */}
      {otherServices.length > 0 && (
        <>
          <Divider variant="down" fill="fill-white" />
          <Section bg="white" tight>
            <Container>
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Other Services We Offer</h2>
              <div className="flex flex-wrap gap-3">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-navy-900 text-navy-900 text-sm font-semibold hover:bg-navy-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  >
                    {s.h1}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                >
                  Get a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
