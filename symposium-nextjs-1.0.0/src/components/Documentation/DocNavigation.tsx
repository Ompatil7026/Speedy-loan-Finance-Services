"use client"
import Link from "next/link";
import { useState } from "react";

export const DocNavigation = () => {

    const [navItem, setNavItem] = useState("version");

    function getNavItem(item:string){
        setNavItem(item)
    }

    const DocsNav = [
        {
            id: 1,
            navItem: "Loan Types",
            hash: "loan-types",
            },
            {
            id: 2,
            navItem: "Eligibility Criteria",
            hash: "eligibility",
            },
            {
            id: 3,
            navItem: "Required Documents",
            hash: "documents",
            },
            {
            id: 4,
            navItem: "Application Process",
            hash: "process",
            },

    ]

    return (
        <div className="flex flex-col gap-0.5 mt-4 items-start fixed pe-4" >
          {
            DocsNav.map((item) => {
                return (
                    <Link key={item.id} href={`#${item.hash}`} onClick={() => getNavItem(item.hash)} className={`py-2.5 hover:bg-primary/20 hover:text-primary dark:hover:text-primary xl:min-w-60 lg:min-w-52 min-w-full px-4 rounded-md text-midnight_text text-base font-medium  ${item.hash === navItem ? "bg-primary text-white hover:!bg-primary hover:!text-white dark:!text-opacity-100 dark:hover:text-white" : "text-MidnightNavyText dark:text-SlateBlueText dark:text-opacity-80"}`}>{item.navItem}</Link>
                )
            })
          }
        </div>
    )
}