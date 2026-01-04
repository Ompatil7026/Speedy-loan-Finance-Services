import Image from "next/image";

const Hero = () => {
    return (
        <section className="dark:bg-darkmode">
            <div className="container">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-30">
                    <div className="col-span-6">
                        <p
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                            className="relative z-0  inline-block text-primary text-lg font-bold before:absolute before:content-[''] before:bg-primary/20  before:w-full before:h-2 before:-z-1 dark:before:-z-1 before:bottom-0"
                        >
                            
                        </p>
                        <h1
                            className="py-4"
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1000"
                        >
                        Fast. Secure. Trusted.
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-duration="1000"
                            className="text-xl text-SlateBlueText dark:text-opacity-80 font-normal md:pb-14 pb-6"
                        >
                            We help individuals, professionals, and businesses get the right loan from the right bank,
                             with the best interest rates and quick approvals.
                        </p>
                        <div className="flex items-center md:justify-normal lg:justify-center justify-start flex-wrap gap-4">
                            <a
                                href="https://wa.me/917350005590?text=Hi%20I%20want%20loan%20details"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-duration="1000"
                                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden"
                                >
                                <span className="!flex !items-center gap-14">
                                    <i className="bg-[url('/images/hero/whatsapp.png')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                                    WhatsApp Chat
                                </span>
                                </a>

                            <a
                                href="https://mail.google.com/mail/?view=cm&to=loanspeedy@gmail.com"
                                target="_blank"

                                data-aos="fade-up"
                                data-aos-delay="600"
                                data-aos-duration="1000"
                                className="btn_outline btn-2 hover-outline-slide-down group"
                                >
                                <span className="!flex !items-center gap-14">
                                    <i className="bg-[url('/images/hero/mail.svg')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                                    loanspeedy@gmail.com
                                </span>
                                </a>

                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                        className="col-span-6  lg:flex hidden items-center gap-3"
                    >
                        <div className="bg-ElectricAqua relative rounded-tl-166 rounded-br-166 w-full">
                            <Image
                                src="/images/hero/john.png"
                                alt="hero"
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full"
                            />
            
                        </div>
                        <div className="bg-primary relative rounded-tr-166 rounded-bl-166 w-full mt-32">
                            <Image
                                src="/images/hero/jijuph.png"
                                alt="hero"
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full"
                            />
                            <div className="bg-[#fcf7fb] rounded-22 shadow-hero-box py-1 px-4 absolute -left-24 mr-6 bottom-9 -translate-x-1/2 text-center">
                                <p className="text-lg font-bold text-blue-400">Mr. Shashikant Shelke</p>
                                <p className="text-base font-medium text-green-1000 text-center">
                                    Founder of Speedy Loan Finance Services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
