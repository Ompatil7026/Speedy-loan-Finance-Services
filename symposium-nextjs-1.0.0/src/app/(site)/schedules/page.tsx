// Server Component — metadata export requires this to stay a Server Component
import HeroSub from "@/components/SharedComponent/HeroSub";
import SchedulesContent from "./SchedulesContent";
import '@/Style/style.css';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Plans & Types – Personal, Home, Business, MSME | Speedy Loan Finance",
  description:
    "Explore all types of loan plans at Speedy Loan Finance Services: personal loans, home loans, business loans, MSME loans, loan against property, car loans, and education loans. Fast approvals, transparent terms.",
  keywords: [
    "loan plans India",
    "personal loan plans",
    "home loan plans Pune",
    "business loan options",
    "MSME loan types",
    "loan against property",
    "car loan Pune",
    "education loan India",
    "best loan schemes India",
  ],
  alternates: {
    canonical: "https://speedyloanfinance.com/schedules/",
  },
  openGraph: {
    title: "Loan Plans & Types | Speedy Loan Finance Services",
    description:
      "Personal, home, business, MSME, LAP, car & education loans – all in one place with fast approvals.",
    url: "https://speedyloanfinance.com/schedules/",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Loan Plans – Speedy Loan Finance" }],
  },
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/schedules", text: "Loans" },
  ];

  return (
    <>
      {/* Rendered server-side — instant, no JS needed */}
      <HeroSub
        title="Types Of Loans We Covered"
        description="Explore a wide range of loan solutions designed to meet personal, business, and property needs. Our services are crafted to offer fast approvals, transparent terms, and the best financial options from trusted lenders."
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Client Component handles all ssr:false dynamic imports */}
      <SchedulesContent />
    </>
  );
};

export default page;
