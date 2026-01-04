"use client"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"
import { DocNavigation } from "./DocNavigation"
import nextImg from "/public/images/documentation/Categories=Nextjs.svg"

export const Introduction = () => {
    const [docNavbarOpen, setDocNavbarOpen] = useState(false)
    const PackageVersions = [
        // {
        //     id: "1",
        //     packageName: "NextJs",
        //     img: nextImg,
        //     version: "15.1.1"
        // },
        {
            id: "1",
            packageName: "Personal Loan",
            img: nextImg,
            version: "Instant Approval"
            },
            {
            id: "2",
            packageName: "Business Loan",
            img: nextImg,
            version: "Up to ₹5 Crore"
            },
            {
            id: "3",
            packageName: "Home Loan",
            img: nextImg,
            version: "Low Interest Rates"
            },
            {
            id: "4",
            packageName: "Loan Against Property",
            img: nextImg,
            version: "High Value Funding"
            },
            {
            id: "5",
            packageName: "Working Capital / LRD",
            img: nextImg,
            version: "Flexible Repayment"
            }

    ]
    return (
        <>
            <div id="version" className="md:scroll-m-[180px] scroll-m-28">

                {docNavbarOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" onClick={() => setDocNavbarOpen(false)} />
                )}

                <div className="flex item-center justify-between">
                    <h3 className=" text-MidnightNavyText text-2xl mt-4 font-semibold mb-6 dark:text-white" >Plans Veriations</h3>
                    <button onClick={() => setDocNavbarOpen(true)} className="p-0"> <Icon icon="gg:menu-right" className="text-3xl lg:hidden block" /></button>
                </div>

                
                <div className="mt-5">
                    <p className="text-base font-medium text-SlateBlueText dark:text-opacity-80">
                        Speedy Loan Finance Services helps individuals and businesses achieve their financial goals with fast, transparent, and reliable funding solutions.
                    </p>
                    <p className="text-base font-medium text-SlateBlueText dark:text-opacity-80">
                        From personal and home loans to business finance, LRD, insurance, and investments, we offer customized solutions through top banks and NBFC partners.
                    </p>
                    <p className="text-base font-medium text-SlateBlueText dark:text-opacity-80">
                        With expert guidance, minimal paperwork, and quick disbursal, we make financing simple and stress-free.
                    </p>
                    </div>


            </div>

            <div
                className={`lg:hidden block fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${docNavbarOpen ? "translate-x-0" : "translate-x-full"} z-50`}
            >
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-bold text-midnight_text dark:text-white">Docs Menu</h2>
                    <button onClick={() => setDocNavbarOpen(false)} aria-label="Close mobile menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="dark:text-white">
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
                <nav className="px-4" >
                    <DocNavigation />
                </nav>
            </div>
        </>
    )
}