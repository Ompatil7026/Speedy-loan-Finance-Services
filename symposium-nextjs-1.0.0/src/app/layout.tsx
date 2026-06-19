import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import ScrollToTop from '@/components/ScrollToTop';
import Aoscompo from "@/utils/aos";
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from "next";
import LoanChatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://speedyloanfinance.com"),
  title: {
    default: "Speedy Loan Finance Services | Fast & Hassle-Free Loan Approval",
    template: "%s | Speedy Loan Finance Services",
  },
  description:
    "Speedy Loan Finance Services offers fast, transparent, and trusted loan solutions in Pune. Get quick approval on personal loans, home loans, business loans, MSME loans, and more through India's top banks and NBFCs.",
  keywords: [
    "loan finance services",
    "personal loan Pune",
    "home loan Pune",
    "business loan",
    "MSME loan",
    "fast loan approval",
    "loan agent Pune",
    "DSA codes",
    "Andromeda partner",
    "loan without documents",
    "speedy loan",
    "loan services Chinchwad",
    "Shashikant Shelke",
  ],
  authors: [{ name: "Speedy Loan Finance Services", url: "https://speedyloanfinance.com" }],
  creator: "Speedy Loan Finance Services",
  publisher: "Speedy Loan Finance Services",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://speedyloanfinance.com",
    siteName: "Speedy Loan Finance Services",
    title: "Speedy Loan Finance Services | Fast & Hassle-Free Loan Approval",
    description:
      "Get fast loan approvals in Pune with Speedy Loan Finance Services. Personal, home, business, and MSME loans through leading banks and NBFCs.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Speedy Loan Finance Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speedy Loan Finance Services | Fast & Hassle-Free Loan Approval",
    description:
      "Get fast loan approvals in Pune. Personal, home, business & MSME loans through top banks and NBFCs.",
    images: ["/logo.png"],
    creator: "@speedyloanfinance",
  },
  alternates: {
    canonical: "https://speedyloanfinance.com",
  },
  category: "Finance",
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Speedy Loan Finance Services",
  description:
    "Fast, transparent, and trusted loan solutions including personal loans, home loans, business loans, and MSME loans through leading banks and NBFCs in India.",
  url: "https://speedyloanfinance.com",
  logo: "https://speedyloanfinance.com/logo.png",
  telephone: "+917350005590",
  email: "loanspeedy@gmail.com",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mayur Trade Center, Near Chinchwad Railway Station",
    addressLocality: "Chinchwad",
    addressRegion: "Maharashtra",
    postalCode: "411033",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 18.6526,
    longitude: 73.7968,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/speedyloanfinance/",
    "https://wa.me/917350005590",
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 18.6526,
      longitude: 73.7968,
    },
    geoRadius: "50000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Loan Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Loan" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Loan" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Loan" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MSME Loan" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Loan Against Property" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Insurance & Investment" } },
    ],
  },
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Chinchwad, Pune, Maharashtra" />
        <meta name="geo.position" content="18.6526;73.7968" />
        <meta name="ICBM" content="18.6526, 73.7968" />
        <meta name="theme-color" content="#1B5BD1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Speedy Loan" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={dmsans.className}>
      <AuthDialogProvider>
      <SessionProviderComp session={session}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <Header />
            <NextTopLoader />
            {children}
            <Footer />
          </Aoscompo>
          <ScrollToTop />
          <LoanChatbot />
        </ThemeProvider>
        </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
