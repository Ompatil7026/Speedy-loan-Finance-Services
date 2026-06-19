"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";

const Footer: FC = () => {

  useEffect(() => {
    const input = document.querySelector(
      ".newsletter-form input[type='email']"
    ) as HTMLInputElement | null;

    if (!input) return;

    const handleInvalid = () => {
      input.setCustomValidity(
        "Please enter a valid email address (for example: name@example.com)."
      );
    };

    const handleInput = () => {
      input.setCustomValidity("");
    };

    input.addEventListener("invalid", handleInvalid);
    input.addEventListener("input", handleInput);

    return () => {
      input.removeEventListener("invalid", handleInvalid);
      input.removeEventListener("input", handleInput);
    };
  }, []);





useEffect(() => {
  const form = document.querySelector(
    ".newsletter-form"
  ) as HTMLFormElement | null;

  if (!form) return;

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const input = form.querySelector(
      "input[type='email']"
    ) as HTMLInputElement | null;

    const userEmail = input?.value;
    if (!userEmail) return;

    const subject = "Enquiry - Speedy Loan Finance Services";

    const body =
      "Hello Speedy Loan Finance Services Team,%0D%0A%0D%0A" +
      "I would like to make an enquiry.%0D%0A%0D%0A" +
      `My Email: ${encodeURIComponent(userEmail)}%0D%0A%0D%0A` +
      "My Query:%0D%0A" +
      "_____________________________________%0D%0A%0D%0A" +
      "Thank you.";

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href =
        `mailto:loanspeedy@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=loanspeedy@gmail.com&su=${encodeURIComponent(
          subject
        )}&body=${body}`,
        "_blank"
      );
    }

    form.reset();  // ✅ now TypeScript is happy
  };

  form.addEventListener("submit", handleSubmit);

  return () => {
    form.removeEventListener("submit", handleSubmit);
  };
}, []);



  return (
    <footer className="bg-secondary">
      <div className="container">

        <div className="flex items-center justify-between flex-wrap lg:pt-56 md:pt-20 pt-16 md:pb-20 pb-6 border-b border-solid border-dark_border">
          <div>
            <Link href="/">
              <Image
                src="/images/footer/footer-logo-white.svg"
                alt="logo"
                width={0}
                height={0}
                quality={100}
                layout="responsive"
                sizes="100vh"
                className="w-full h-full"
              />
            </Link>
          </div>

          <div>
            <ul className="flex items-center flex-wrap md:gap-30 gap-3 md:py-0 py-5">
              {["Home", "Banks", "Schedule", "About"].map((item) => (
                <li
                  key={item}
                  className="text-PaleCerulean sm:text-xl text-lg font-normal transition-all duration-0.4s hover:text-primary"
                >
                  <Link href="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ul className="flex items-center gap-5">
  {/* Facebook */}
  <li>
    <Link
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="white"
        className="group-hover:fill-ElectricAqua transition"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
      </svg>
    </Link>
  </li>

  {/* Instagram */}
  <li>
    <Link
      href="https://www.instagram.com/speedyloanfinance/?hl=en"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="white"
        className="group-hover:fill-ElectricAqua transition"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.75 2h8.5C19.44 2 22 4.56 22 7.75v8.5C22 19.44 19.44 22 16.25 22h-8.5C4.56 22 2 19.44 2 16.25v-8.5C2 4.56 4.56 2 7.75 2zm8.5 1.5h-8.5A6.26 6.26 0 003.5 7.75v8.5A6.26 6.26 0 007.75 20.5h8.5a6.26 6.26 0 004.25-4.25v-8.5A6.26 6.26 0 0016.25 3.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.75a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    </Link>
  </li>

  {/* WhatsApp */}
  <li>
    <Link
      href="https://wa.me/917350005590"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="white"
        className="group-hover:fill-ElectricAqua transition"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.43 0 .14 5.29.14 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.87 11.87 0 005.74 1.47h.01c6.61 0 11.9-5.29 11.9-11.9a11.84 11.84 0 00-3.43-8.44zM12.04 21.3a9.37 9.37 0 01-4.78-1.32l-.34-.2-3.74.98 1-3.64-.22-.37a9.37 9.37 0 117.08 4.55zm5.14-6.9c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.52-.87-2.08-.23-.56-.46-.49-.63-.5-.16-.01-.35-.01-.54-.01s-.49.07-.74.35c-.26.28-.98.96-.98 2.35s1.01 2.74 1.15 2.93c.14.19 1.98 3.02 4.8 4.23.67.29 1.2.46 1.61.59.68.22 1.3.19 1.78.12.54-.08 1.66-.68 1.9-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z" />
      </svg>
    </Link>
  </li>
</ul>

          </div>
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 items-center py-8">
          <div className="col-span-5">
            <p className="text-base font-normal text-PaleCerulean">
              © All rights reserved , speedyloanfinance.com
            </p>
            <p className="text-base font-normal text-PaleCerulean">
              Developed By Om Patil.
            </p>
            <p className="text-base font-normal text-PaleCerulean">
              <Link
                href="https://www.linkedin.com/in/om-patil-30b2b5239/"
                className="hover:text-white"
                target="_blank"
              >
                LinkedIn-URL
              </Link>
            </p>
            <p className="text-base font-normal text-PaleCerulean">
              <Link
                href="https://github.com/Ompatil7026"
                className="hover:text-white"
                target="_blank"
              >
                Github-URL
              </Link>
            </p>
            <p className="text-base font-normal text-PaleCerulean">
              Contact- 9307747984
            </p>
          </div>

          <div className="col-span-7 grid md:grid-cols-12 grid-cols-1 items-center gap-6">
            <p className="text-xl text-PaleCerulean font-normal col-span-4">
              For Any Enquiry -
            </p>

            <div className="w-full col-span-8">
              <form className="newsletter-form bg-white dark:bg-transparent flex rounded-md justify-end overflow-hidden rounded-tl-lg rounded-bl-lg">
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Email address*"
                  className="p-4 text-base border-0 rounded-md outline-0 w-[calc(100%_-_137px)] flex dark:bg-midnight_text dark:text-white dark:rounded-none dark:w-full dark:bg-darkmode"
                />
                <button
                  type="submit"
                  className="btn btn-1 hover-filled-slide-down bg-RegalBlue"
                >
                  <span className="!border-0 !text-white">Subscribe</span>
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
