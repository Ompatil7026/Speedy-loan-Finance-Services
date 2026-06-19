import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/Home/Testimonials"));
const Andro = dynamic(() => import("@/components/Home/Andro"));
const ICICI = dynamic(() => import("@/components/Home/ICICI"));
const LocationSecCode = dynamic(() => import("@/components/Home/LocationSecCode"));
const TicketSection = dynamic(() => import("@/components/Home/TicketSection"));
const WorkSpeakers = dynamic(() => import("@/components/Home/WorkSpeakers"));
export const metadata: Metadata = {
  title: "Bankers Panel – DSA Codes & Bank One-Pagers | Speedy Loan Finance",
  description:
    "Access Andromeda DSA codes for 200+ banks and NBFCs including ICICI, Axis, HDFC, Bajaj, AU Small, and more. Download bank one-pagers and find location-wise DSA codes for quick loan processing.",
  keywords: [
    "Andromeda DSA codes",
    "bank DSA codes list",
    "ICICI bank DSA code",
    "Bajaj Finance DSA code",
    "Axis bank DSA code",
    "HDFC bank DSA code",
    "loan broker codes India",
    "Andromeda location sec code",
  ],
  alternates: {
    canonical: "https://speedyloanfinance.com/speakers/",
  },
  openGraph: {
    title: "Bankers Panel – DSA Codes & Bank One-Pagers | Speedy Loan Finance",
    description:
      "Find Andromeda DSA codes for 200+ banks and NBFCs. Access bank one-pagers for fast loan processing.",
    url: "https://speedyloanfinance.com/speakers/",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Bankers Panel – Speedy Loan Finance" }],
  },
};


const page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/speakers", text: "Speakers" },
      ];
  return (
    <>
      <HeroSub
        title="OnePagers of Banks & Andro Codes"
        description="Access one-pagers of various banks and NBFC partners along with their Andromeda DSA codes. This section helps loan advisors quickly find lender details, product information, and processing guidelines in one place."        breadcrumbLinks={breadcrumbLinks}
      />
      <WorkSpeakers showTitle={false} />
      <Andro/>
      <ICICI/>
      <LocationSecCode/>
      <Testimonials/>
      <TicketSection/>
    </>
  );
};

export default page;
