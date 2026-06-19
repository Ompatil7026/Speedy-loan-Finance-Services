"use client"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { DocNavigation } from "./DocNavigation"

export const Introduction = () => {
  const [docNavbarOpen, setDocNavbarOpen] = useState(false)

  return (
    <>
      <section
        id="version"
        className="md:scroll-m-[180px] scroll-m-28 flex justify-center"
      >
        <div className="w-full max-w-4xl px-6 text-center">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-MidnightNavyText dark:text-white">
              Speedy Loan Finance Services
            </h1>

            <button
              onClick={() => setDocNavbarOpen(true)}
              className="lg:hidden block"
              aria-label="Open Menu"
            >
              <Icon icon="gg:menu-right" className="text-3xl text-primary" />
            </button>
          </div>

          {/* SHORT INTRO */}
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
            Transparent, compliant, and reliable financial solutions.
          </p>
          <p className="mt-2 text-base text-SlateBlueText dark:text-opacity-80">
            This documentation provides a clear overview of services, processes,
            and required documents.
          </p>

        </div>
      </section>

      {/* MOBILE DOC MENU */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${
          docNavbarOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark_border">
          <h2 className="text-lg font-bold text-MidnightNavyText dark:text-white">
            Documentation
          </h2>
          <button onClick={() => setDocNavbarOpen(false)} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="dark:text-white"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-4">
          <DocNavigation />
        </nav>
      </div>
    </>
  )
}
