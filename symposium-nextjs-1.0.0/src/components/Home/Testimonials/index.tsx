"use client";
import React from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Testimonials = () => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <section className="content-visibility-auto bg-IcyBreeze dark:bg-darklight testimonial py-6">
                <div className="container">
                    <Slider {...settings}>

{/* REVIEW 1 */}

                        <div>
                            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">

                                <div className="col-span-4 bg-LightSkyBlue sm:rounded-br-214 rounded-br-182 sm:rounded-tl-214 rounded-tl-182 relative lg:inline-block hidden">
                                    <Image
                                        src="/images/hero/john.png"
                                        alt="testimonials"
                                        width={0}
                                        height={0}
                                        quality={100}
                                        layout="responsive"
                                        sizes="100vh"
                                        className="w-[60%] h-auto"
                                    />
                                </div>

                                <div className="col-span-8 md:ml-20 ml-0">

                                    <h2 className="max-w-72 text-2xl font-semibold">
                                        What Our Customer Says
                                    </h2>

                                    <p className="text-base font-normal text-SlateBlueText dark:text-opacity-80 py-4 max-w-xl leading-relaxed">
                                        I had a great experience with Speedy Loan Finance Services. 
                                        The entire process was very smooth and transparent from start 
                                        to finish. The team guided me properly through all the 
                                        documentation and explained every step clearly.
                                    </p>

                                    <div className="flex items-center gap-4">

                                        <Image
                                            src="/images/testimonials/men2.jpg"
                                            alt="profile"
                                            width={0}
                                            height={0}
                                            layout="responsive"
                                            className="!w-7 !h-7 rounded-full"
                                        />

                                        <div>
                                            <p className="text-base font-semibold text-secondary">
                                                Mr. Santosh Patil
                                            </p>

                                            <div className="flex items-center">
                                                {[1,2,3,4,5].map((i)=>(
                                                    <svg key={i} className="w-4 h-4 text-yellow-500 ms-1" viewBox="0 0 22 20" fill="currentColor">
                                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


{/* REVIEW 2 */}

                        <div>
                            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">

                                <div className="col-span-4 bg-LightSkyBlue lg:inline-block hidden">
                                    <Image
                                        src="/images/hero/john.png"
                                        alt="testimonials"
                                        width={0}
                                        height={0}
                                        layout="responsive"
                                        className="w-[60%]"
                                    />
                                </div>

                                <div className="col-span-8 md:ml-20 ml-0">

                                    <h2 className="text-2xl font-semibold">
                                        What Our Customer Says
                                    </h2>

                                    <p className="text-base py-4 max-w-xl">
                                        Speedy Loan Finance Services truly lives up to its name.
                                        I needed a loan urgently and their team helped me get
                                        approval much faster than expected. The whole process
                                        was smooth and stress-free.
                                    </p>

                                    <div className="flex items-center gap-4">

                                        <Image
                                            src="/images/testimonials/men1.jpg"
                                            alt="profile"
                                            width={0}
                                            height={0}
                                            layout="responsive"
                                            className="!w-7 !h-7 rounded-full"
                                        />

                                        <p className="text-base font-semibold">
                                            Mr. Saurabh Khandave
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>


{/* REVIEW 3 */}

                        <div>
                            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">

                                <div className="col-span-4 bg-LightSkyBlue lg:inline-block hidden">
                                    <Image
                                        src="/images/hero/john.png"
                                        alt="testimonials"
                                        width={0}
                                        height={0}
                                        layout="responsive"
                                        className="w-[60%]"
                                    />
                                </div>

                                <div className="col-span-8 md:ml-20 ml-0">

                                    <h2 className="text-2xl font-semibold">
                                        What Our Customer Says
                                    </h2>

                                    <p className="text-base py-4 max-w-xl">
                                        I am very satisfied with the service provided by
                                        Speedy Loan Finance Services. Their team explained
                                        all loan options clearly and helped me choose the
                                        best one for my needs.
                                    </p>

                                    <div className="flex items-center gap-4">

                                        <Image
                                            src="/images/testimonials/men1.jpg"
                                            alt="profile"
                                            width={0}
                                            height={0}
                                            layout="responsive"
                                            className="!w-7 !h-7 rounded-full"
                                        />

                                        <p className="text-base font-semibold">
                                            Mr. Samadhan Bhalerao
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>


{/* REVIEW 4 */}

                        <div>
                            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">

                                <div className="col-span-4 bg-LightSkyBlue lg:inline-block hidden">
                                    <Image
                                        src="/images/hero/john.png"
                                        alt="testimonials"
                                        width={0}
                                        height={0}
                                        layout="responsive"
                                        className="w-[60%]"
                                    />
                                </div>

                                <div className="col-span-8 md:ml-20 ml-0">

                                    <h2 className="text-2xl font-semibold">
                                        What Our Customer Says
                                    </h2>

                                    <p className="text-base py-4 max-w-xl">
                                        Excellent service and quick loan processing.
                                        The team was very professional and helped
                                        with all documentation smoothly. Highly
                                        recommended for anyone looking for fast
                                        financial assistance.
                                    </p>

                                    <div className="flex items-center gap-4">

                                        <Image
                                            src="/images/testimonials/men2.jpg"
                                            alt="profile"
                                            width={0}
                                            height={0}
                                            layout="responsive"
                                            className="!w-7 !h-7 rounded-full"
                                        />

                                        <p className="text-base font-semibold">
                                            Mr. Sandip Kalekar
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>


                    </Slider>
                </div>
            </section>
        </>
    );
};

export default Testimonials;