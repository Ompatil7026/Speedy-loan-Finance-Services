import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const BlogList = dynamic(() => import("@/components/Blog/BlogList"));
const TicketSection = dynamic(() => import("@/components/Home/TicketSection"));
const Gst = dynamic(() => import("@/components/Home/Gst"));
export const metadata: Metadata = {
  title: "Loans | Speedy Loan Finance Services",
};

const BlogPage = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/blog", text: "Blog" },
    ];
    return (
        <>
            <HeroSub
                title="Loans"
                description="Explore our wide range of loan solutions including personal, business, home, and MSME loans with fast approval and minimal documentation."
                breadcrumbLinks={breadcrumbLinks}
            />
            <BlogList />
            <Gst/>
            <TicketSection/>
        </>
    );
};

export default BlogPage;