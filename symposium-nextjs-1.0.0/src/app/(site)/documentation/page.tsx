
import { Documentation } from "@/components/Documentation/Documentation";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const TicketSection = dynamic(() => import("@/components/Home/TicketSection"));
const Gst = dynamic(() => import("@/components/Home/Gst"));
export const metadata: Metadata = {
  title: "Loan Documentation & GST Guide | Speedy Loan Finance Services",
  description:
    "Get a complete guide on loan documentation requirements, GST details, and financial checklists for home loans, business loans, personal loans, and MSME loans. Everything you need for a smooth loan process.",
  keywords: [
    "loan documentation list",
    "documents required for home loan",
    "documents required for business loan",
    "GST loan India",
    "loan checklist India",
    "MSME loan documents",
    "loan processing guide India",
  ],
  alternates: {
    canonical: "https://speedyloanfinance.com/documentation/",
  },
  openGraph: {
    title: "Loan Documentation & GST Guide | Speedy Loan Finance Services",
    description:
      "Complete loan documentation requirements and GST guide for all loan types – home, business, personal, MSME.",
    url: "https://speedyloanfinance.com/documentation/",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Loan Documentation – Speedy Loan Finance" }],
  },
};


export default function Page() {
    return (
        <>
        <Documentation/>
        <Gst/>
        <TicketSection/>
        </>
    );
};
