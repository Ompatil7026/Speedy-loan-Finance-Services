// import Newsletter from "@/components/Blog/Newsletter";
// import PopularArticle from "@/components/Blog/PopularArticle";
// import SingleBlog from "@/components/Blog/SingleBlog";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import dynamic from "next/dynamic";

const TicketSection = dynamic(() => import("@/components/Home/TicketSection"));
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: any) {
    const data = await params;
    const post = getPostBySlug(data.slug, [
        "title",
        "author",
        "excerpt",
        "coverImage",
        "content",
        "metadata",
    ]);

    const siteName = "Speedy Loan Finance Services";
    const siteUrl = "https://speedyloanfinance.com";

    if (post) {
        const description =
            post.excerpt ||
            `Read ${post.title} on Speedy Loan Finance Services blog – loan tips, finance guides, and more.`;

        return {
            title: `${post.title || "Blog Post"} | ${siteName}`,
            description,
            authors: [{ name: post.author || siteName }],
            alternates: {
                canonical: `${siteUrl}/blog/${data.slug}/`,
            },
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
                type: "article",
                title: `${post.title} | ${siteName}`,
                description,
                url: `${siteUrl}/blog/${data.slug}/`,
                siteName,
                images: post.coverImage
                    ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
                    : [{ url: "/logo.png", width: 1200, height: 630, alt: siteName }],
            },
            twitter: {
                card: "summary_large_image",
                title: `${post.title} | ${siteName}`,
                description,
                images: post.coverImage ? [post.coverImage] : ["/logo.png"],
            },
        };
    } else {
        return {
            title: `Post Not Found | ${siteName}`,
            description: "The blog article you are looking for could not be found.",
            robots: { index: false, follow: false },
        };
    }
}


export default async function Post({ params }: any) {
    const data = await params;
    const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
    const post = getPostBySlug(data.slug, [
        "title",
        "author",
        "authorImage",
        "content",
        "coverImage",
        "date",
    ]);

    const content = await markdownToHtml(post.content || "");

    return (
        <>
            <section className=" relative pt-44">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center">
                        <div className="col-span-8">
                            <div className="flex flex-col sm:flex-row">
                                <span className="text-base text-midnight_text font-medium dark:text-white pr-7 border-r border-solid border-gray dark:border-white w-fit">
                                    {post.date && format(new Date(post.date), "dd MMM yyyy")}
                                </span>
                                <span className="text-base text-midnight_text font-medium dark:text-white sm:pl-7 pl-0 w-fit">
                                    13 Comments
                                </span>
                            </div>
                            <h2 className="text-midnight_text dark:text-white pt-7">
                                {post.title}
                            </h2>
                        </div>
                        <div className="flex items-center md:justify-center justify-start gap-6 col-span-4 pt-4 md:pt-0">
                            <Image
                                src={post.authorImage}
                                alt="image"
                                className="bg-no-repeat bg-contain inline-block rounded-full !w-20 !h-20"
                                width={40}
                                height={40}
                                layout="responsive"
                                quality={100}
                            />
                            <div className="">
                                <span className="text-[22px] leading-[1.2] font-bold text-midnight_text dark:text-white">
                                    Silicaman
                                </span>
                                <p className="text-xl text-gray dark:text-white">Author</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dark:bg-darkmode py-0">
                <div className="container mx-auto">
                    <div className=" flex flex-wrap justify-center">
                        <div className="w-full px-4">
                            <div className="z-20 mb-16 overflow-hidden rounded">
                                <Image
                                    src={post.coverImage}
                                    alt="image"
                                    width={1170}
                                    height={766}
                                    quality={100}
                                    className="h-full w-full object-cover object-center rounded-3xl"
                                />
                            </div>

                            <div className="-mx-4 flex flex-wrap">
                                <div className="w-full px-4 lg:w-8/12">
                                    <div className="blog-details xl:pr-10">
                                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                    </div>
                                </div>

                                <div className="w-full px-4 lg:w-4/12">
                                    <div>
                                        <div className=" mb-8 flex flex-col">
                                            <div className="w-full py-12 px-11 bg-white dark:bg-darklight shadow-lg border-b-2 border-border dark:border-dark_border rounded-t-lg">
                                                <h2
                                                    className="wow fadeInUp relative mb-5 text-2xl dark:text-white text-black  sm:text-[28px] leading-[1.2]"
                                                    data-wow-delay=".1s"
                                                >
                                                    Share
                                                </h2>

                                                <div className="flex gap-4 flex-col">

                                                    <div className="bg-[#526fa3] py-4 px-6 text-xl rounded-lg text-white">
                                                        <Link href="#" className="flex items-center ">
                                                            Facebook
                                                        </Link>
                                                    </div>

                                                    <div className="bg-[#46C4FF] py-4 px-6 text-xl rounded-lg text-white">
                                                        <Link href="#" className="flex items-center ">
                                                            twitter
                                                        </Link>
                                                    </div>

                                                    <div className="bg-[#3C86AD] py-4 px-6 text-xl rounded-lg text-white">
                                                        <Link href="#" className="flex items-center ">
                                                            linkedin
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="w-full py-12 px-11 bg-white dark:bg-darklight shadow-lg rounded-b-lg">
                                                <p className="text-2xl mb-4">Join our Newsletter</p>

                                                <input
                                                    placeholder="Email address "
                                                    className="p-3 dark:bg-semidark border border-border dark:border-dark_border rounded-lg mb-2 w-full focus:outline-0 focus:border-primary dark:focus:border-primary"
                                                />

                                                <button className="w-full py-4 px-9 text-lg font-medium bg-primary hover:bg-blue-700 rounded-lg text-white">
                                                    Subscribe
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <TicketSection />
        </>
    );
}

export async function generateStaticParams() {
    const slugs = getPostSlugs().map((s) => s.replace(/\.mdx$/, ""));
    return slugs.map((slug) => ({ slug }));
}