import ContactForm from "@/components/Contact/Form";
import ContactInfo from "@/components/Contact/ContactInfo";
import Location from "@/components/Contact/OfficeLocation";
import React from "react";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const TicketSection = dynamic(() => import("@/components/Home/TicketSection"));
export const metadata: Metadata = {
  title: "Contact Us – Get in Touch | Speedy Loan Finance Services",
  description:
    "Contact Speedy Loan Finance Services at Mayur Trade Center, Chinchwad, Pune – 411033. Call us at 73500 05590 or email loanspeedy@gmail.com for loan enquiries.",
  keywords: [
    "contact speedy loan finance",
    "loan agent contact Pune",
    "Chinchwad loan office",
    "Mayur Trade Center loan",
    "loan enquiry Pune",
    "speedy loan phone number",
    "loanspeedy@gmail.com",
  ],
  alternates: {
    canonical: "https://speedyloanfinance.com/contact/",
  },
  openGraph: {
    title: "Contact Speedy Loan Finance Services | Pune",
    description:
      "Reach us at Mayur Trade Center, Chinchwad, Pune 411033. Phone: 73500 05590.",
    url: "https://speedyloanfinance.com/contact/",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Contact Speedy Loan Finance" }],
  },
};


const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <HeroSub
        title="Contact Us"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive understanding of the latest trends."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
      <Location />
      <TicketSection/>
    </>
  );
};

export default page;
