import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { absoluteUrl } from "@/lib/utils";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhoThisIsFor from "@/components/sections/WhoThisIsFor";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import SocialProof from "@/components/sections/SocialProof";
import PricingTeaser from "@/components/sections/PricingTeaser";
import GuaranteesBar from "@/components/sections/GuaranteesBar";
import FinalCTA from "@/components/sections/FinalCTA";
import { Divider } from "@/components/ui/Divider";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { url: absoluteUrl("/") },
};

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <Hero />
      <Divider variant="down" fill="fill-white" />
      <HowItWorks />
      <Divider variant="down" fill="fill-white" />
      <WhoThisIsFor />
      <Divider variant="down" fill="fill-navy-50" />
      <WhyChooseUs />
      <Divider variant="down" fill="fill-navy-900" />
      <SocialProof />
      <Divider variant="down" fill="fill-navy-50" />
      <PricingTeaser />
      <GuaranteesBar />
      <Divider variant="down" fill="fill-navy-900" />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
