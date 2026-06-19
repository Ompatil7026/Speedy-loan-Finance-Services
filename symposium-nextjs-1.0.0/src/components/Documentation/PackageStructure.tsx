import { Icon } from "@iconify/react";

export const PackageStructure = () => {
  return (
    <div id="structure" className="md:scroll-m-[130px] scroll-m-28">
      <h3 className="text-MidnightNavyText text-3xl font-bold mt-8 dark:text-white">
        Speedy Loan Finance Services
      </h3>

      <p className="mt-3 text-SlateBlueText dark:text-gray-300 max-w-3xl">
        Product-wise mandatory document checklist designed with a clear numeric
        hierarchy to ensure compliance, transparency, and faster loan processing.
      </p>

      <div className="rounded-xl p-6 border border-border dark:border-dark_border mt-6 bg-white dark:bg-darkmode shadow-sm">
        <ul className="list-none ps-0 space-y-10 text-SlateBlueText dark:text-gray-300">

          {/* 1 Home Loan */}
          <li>
            <div className="flex items-center gap-3 text-xl font-semibold text-blue-600 dark:text-blue-400">
              <span>1.</span>
              <Icon icon="tabler:home" />
              Home Loan
            </div>
            <p className="ps-10 mt-2 text-base font-semibold text-slate-700 dark:text-slate-300">
            - Documents required for residential property purchase or construction.
            </p>


            <ol className="ps-12 mt-3 list-decimal text-sm space-y-1">
              <li>KYC: Aadhaar, PAN, Passport / Voter ID / Driving License</li>
              <li>Address Proof</li>
              <li>Income Proof: Salary Slips / ITR</li>
              <li>Bank Statement (6–12 months)</li>
              <li>Property Documents & Title Papers</li>
              <li>Approved Plan & Occupancy Certificate (if applicable)</li>
              <li>Passport Size Photographs</li>
            </ol>
          </li>

          {/* 2 LAP */}
          <li>
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              <span>2.</span>
              <Icon icon="tabler:building-bank" />
              Loan Against Property (LAP)
            </div>
            <p className="ps-10 mt-2 text-base font-semibold text-slate-700 dark:text-slate-300">
                - Secured loan using residential or commercial property as collateral.
                </p>

            <ol className="ps-12 mt-3 list-decimal text-sm space-y-1">
              <li>KYC Documents</li>
              <li>Income Proof & Bank Statements</li>
              <li>Property Ownership Documents</li>
              <li>Latest Property Tax Receipt</li>
              <li>Legal & Valuation Report</li>
            </ol>
          </li>

          {/* 3 Personal Loan */}
          <li>
            <div className="flex items-center gap-3 text-xl font-semibold text-purple-600 dark:text-purple-400">
              <span>3.</span>
              <Icon icon="tabler:user" />
              Personal Loan
            </div>
            <p className="ps-10 mt-2 text-base font-semibold text-slate-700 dark:text-slate-300">
            - Unsecured loan for personal, medical, or emergency expenses.
            </p>

            <ol className="ps-12 mt-3 list-decimal text-sm space-y-1">
              <li>KYC Documents</li>
              <li>Salary Slips / ITR</li>
              <li>Bank Statement (3–6 months)</li>
              <li>Employment / Business Proof</li>
              <li>Photographs</li>
            </ol>
          </li>

          {/* 4 Business Loan */}
          <li>
            <div className="flex items-center gap-3 text-xl font-semibold text-orange-600 dark:text-orange-400">
              <span>4.</span>
              <Icon icon="tabler:briefcase" />
              Business / MSME Loan
            </div>
            <p className="ps-10 mt-2 text-base font-semibold text-slate-700 dark:text-slate-300">
                - Funding solutions for business expansion and working capital needs.
                </p>

            <ol className="ps-12 mt-3 list-decimal text-sm space-y-1">
              <li>KYC of Proprietor / Partners / Directors</li>
              <li>GST, Udyam, Shop Act Registration</li>
              <li>ITR (2–3 Years)</li>
              <li>Bank Statements (6–12 Months)</li>
              <li>Financial Statements</li>
              <li>Office Address Proof</li>
            </ol>
          </li>

          {/* 5 Education Loan */}
          <li>
            <div className="flex items-center gap-3 text-xl font-semibold text-pink-600 dark:text-pink-400">
              <span>5.</span>
              <Icon icon="tabler:school" />
              Education Loan
            </div>
            <p className="ps-10 mt-2 text-base font-semibold text-slate-700 dark:text-slate-300">
            - Financial support for higher education in India or abroad.
            </p>

            <ol className="ps-12 mt-3 list-decimal text-sm space-y-1">
              <li>Student & Parent KYC</li>
              <li>Admission Letter</li>
              <li>Fee Structure</li>
              <li>Academic Records</li>
              <li>Income Proof of Parent / Guardian</li>
            </ol>
          </li>

        </ul>
      </div>
    </div>
  );
};
