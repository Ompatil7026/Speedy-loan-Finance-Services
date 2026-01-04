import BlogList from "@/components/Blog/BlogList";
import TicketSection from "@/components/Home/TicketSection";
import HeroSub from "@/components/SharedComponent/HeroSub";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog | Symposium",
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
            <TicketSection/>
        </>
    );
};

export default BlogPage;