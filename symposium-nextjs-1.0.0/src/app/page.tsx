import Hero from '@/components/Home/Hero';
import HeroSub from "@/components/SharedComponent/HeroSub";
import dynamic from "next/dynamic";

const ThumbnailCarousel = dynamic(() => import('@/components/Home/Conferences'));
const BlogList = dynamic(() => import('@/components/Blog/BlogList'));
const WorkSpeakers = dynamic(() => import('@/components/Home/WorkSpeakers'));
const EventTicket = dynamic(() => import('@/components/Home/EventTicket'));
const Highlight = dynamic(() => import('@/components/Home/YearHighlight/page'));
const Upcoming = dynamic(() => import('@/components/Home/Upcoming'));
const Testimonials = dynamic(() => import('@/components/Home/Testimonials'));
const TicketSection = dynamic(() => import('@/components/Home/TicketSection'));
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Speedy Loan Finance Services | Fast & Hassle-Free Loan Approval in Pune",
  description:
    "Speedy Loan Finance Services helps you get fast loan approvals in Pune with minimal documentation. Personal loans, home loans, business loans, MSME loans & more through India's top banks and NBFCs.",
  keywords: [
    "speedy loan finance services",
    "personal loan Pune",
    "home loan Pune",
    "business loan Pune",
    "MSME loan",
    "fast loan approval",
    "loan DSA agent Pune",
    "loan without documents",
    "Andromeda DSA",
    "Shashikant Shelke loan agent",
  ],
  alternates: {
    canonical: "https://speedyloanfinance.com/",
  },
  openGraph: {
    title: "Speedy Loan Finance Services | Fast & Hassle-Free Loan Approval in Pune",
    description:
      "Get fast loan approvals in Pune with Speedy Loan Finance Services. Personal, home, business, and MSME loans through leading banks and NBFCs.",
    url: "https://speedyloanfinance.com/",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Speedy Loan Finance Services" }],
  },
  twitter: {
    title: "Speedy Loan Finance Services | Fast Loan Approval Pune",
    description:
      "Personal, home, business & MSME loans. Fast approvals, minimal documentation.",
    images: ["/logo.png"],
  },
};


export default function Home() {
  const breadcrumbLinks = [
          { href: "/", text: "Home" },
          { href: "/blog", text: "Blog" },
      ];
  return (
    <main>
      <Hero />
      <ThumbnailCarousel/>

      <HeroSub
                      title="Types Of Loans Covered At Speedy Loan Finance."
                      description="Explore our wide range of loan solutions including personal, business, home, and MSME loans with fast approval and minimal documentation."
                      breadcrumbLinks={breadcrumbLinks}
                      />
      <BlogList />
      <WorkSpeakers/>
      <EventTicket/>
      <Highlight/>
      <Upcoming/>
      <Testimonials/>
      <TicketSection/>
    </main>
  )
}
