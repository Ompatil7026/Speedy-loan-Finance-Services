"use client";
import Image from "next/image";

const TicketSection = () => {

  // ✅ Email handler (mobile + desktop compatible)
  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const subject =
      "Loan Application Request - Speedy Loan Finance Services";

    const body =
      "Hello Speedy Loan Team,%0D%0A%0D%0A" +
      "I would like to apply for a loan.%0D%0A%0D%0A" +
      "• Name:%20__________%0D%0A" +
      "• Phone:%20__________%0D%0A" +
      "• Type of Loan:%20__________%0D%0A" +
      "• Loan Amount:%20__________%0D%0A" +
      "• City:%20__________%0D%0A%0D%0A" +
      "Please contact me with the next steps.%0D%0A%0D%0A" +
      "Thank you.";

    if (isMobile) {
      // 📱 Mobile → Email App
      window.location.href =
        `mailto:loanspeedy@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    } else {
      // 💻 Desktop → Gmail Web
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=loanspeedy@gmail.com&su=${encodeURIComponent(
          subject
        )}&body=${body}`,
        "_blank"
      );
    }
  };

  return (
    <>
      <section className="dark:bg-darkmode pt-0 pb-0 overflow-visible">
        <div className="container overflow-visible">
          <div className="bg-primary relative md:mx-auto mx-3 overflow-hidden 
                py-6 md:py-0 
                rounded-xl md:rounded-22 
                lg:-mb-48 dark:lg:-mb-48 
                md:mt-20 mt-6">
            <div className="flex flex-wrap items-center justify-between p-5 sm:p-6 md:p-20">

              {/* BACKGROUND IMAGE */}
              <div className="md:w-2/2 w-full -mt-10 absolute top-0 -left-1 ">
                <Image
                  src="/images/ticket-section/ticket.png"
                  alt="Loan Banner"
                  width={0}
                  height={0}
                  quality={100}
                  layout="responsive"
                  sizes="100vh"
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="md:w-2/5 w-full ml-auto lg:text-start text-center">
                <p className="text-xl sm:text-2xl md:text-4xl leading-snug font-bold text-white lg:max-w-364 max-w-full pb-6 md:pb-9">
                  Get Fast & Hassle-Free Loan Approval Today!
                </p>

                {/* APPLY BUTTON (DESKTOP ONLY) */}
                  <a
                    href="#"
                    onClick={handleApplyClick}
                    className="hidden md:block absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 
                    -bottom-6 md:bottom-auto
                    z-10 btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden before:bg-ElectricAqua"
                  >
                    <span className="px-5 py-2 text-xs sm:px-8 sm:py-2 sm:text-sm md:px-16 md:py-3 lg:px-20 !border-ElectricAqua !text-white">
                      Apply for Loan
                    </span>
                  </a>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketSection;
