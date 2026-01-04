import { Icon } from "@iconify/react/dist/iconify.js";

export const PackageStructure = () => {
    return (
        <div id="structure" className="md:scroll-m-[130px] scroll-m-28">
            <h3 className="text-MidnightNavyText text-2xl font-semibold mt-8 dark:text-white">
                Product-wise Loan Documents List (India)
            </h3>

            <p className="mt-2 text-SlateBlueText max-w-3xl">
                A structured overview of mandatory documents required for various
                loan products. This framework ensures faster processing, regulatory
                compliance, and transparent lending.
            </p>

            <div className="rounded-xl p-6 pt-4 border border-border dark:border-dark_border mt-6 bg-white dark:bg-darkmode shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Icon
                        icon="tabler:building-bank"
                        className="text-primary text-xl"
                    />
                    <h5 className="text-base text-MidnightNavyText dark:text-white font-semibold">
                        Speedy Loan Finance Services
                    </h5>
                </div>

                <ul className="ps-0 md:ps-5 list-unstyled">
                    <li className="py-2">
                        <div className="flex items-center gap-3">
                            <span className="text-primary font-semibold">|—</span>
                            <span className="font-medium text-SlateBlueText">
                                <Icon
                                    icon="tabler:folder"
                                    className="text-primary text-base inline-block me-2"
                                />
                                loan-documents
                            </span>
                        </div>

                        <ul className="ps-5 md:ps-5 list-unstyled">

                            {/* Home Loan */}
                            <li className="py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">|—</span>
                                    <span className="font-semibold text-MidnightNavyText dark:text-white">
                                        <Icon icon="tabler:home" className="text-primary me-2" />
                                        Home Loan
                                    </span>
                                </div>
                                <p className="ps-8 text-sm text-SlateBlueText">
                                    Documents required for residential property purchase or construction.
                                </p>
                                <ul className="ps-8 md:ps-12 list-unstyled text-SlateBlueText">
                                    <li className="py-1">|— KYC: Aadhaar, PAN, Passport / Voter ID / Driving License</li>
                                    <li className="py-1">|— Address Proof</li>
                                    <li className="py-1">|— Income Proof: Salary Slips / ITR</li>
                                    <li className="py-1">|— Bank Statement (6–12 months)</li>
                                    <li className="py-1">|— Property Documents & Title Papers</li>
                                    <li className="py-1">|— Approved Plan & OC (if applicable)</li>
                                    <li className="py-1">|— Passport Size Photographs</li>
                                </ul>
                            </li>

                            {/* LAP */}
                            <li className="py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">|—</span>
                                    <span className="font-semibold text-MidnightNavyText dark:text-white">
                                        <Icon icon="tabler:building-bank" className="text-primary me-2" />
                                        Loan Against Property (LAP)
                                    </span>
                                </div>
                                <p className="ps-8 text-sm text-SlateBlueText">
                                    Secured loan using residential or commercial property as collateral.
                                </p>
                                <ul className="ps-8 md:ps-12 list-unstyled text-SlateBlueText">
                                    <li className="py-1">|— KYC Documents</li>
                                    <li className="py-1">|— Income Proof & Bank Statements</li>
                                    <li className="py-1">|— Property Ownership Documents</li>
                                    <li className="py-1">|— Latest Property Tax Receipt</li>
                                    <li className="py-1">|— Valuation & Legal Report</li>
                                </ul>
                            </li>

                            {/* Personal Loan */}
                            <li className="py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">|—</span>
                                    <span className="font-semibold text-MidnightNavyText dark:text-white">
                                        <Icon icon="tabler:user" className="text-primary me-2" />
                                        Personal Loan
                                    </span>
                                </div>
                                <p className="ps-8 text-sm text-SlateBlueText">
                                    Unsecured loan for personal, medical, or emergency expenses.
                                </p>
                                <ul className="ps-8 md:ps-12 list-unstyled text-SlateBlueText">
                                    <li className="py-1">|— KYC Documents</li>
                                    <li className="py-1">|— Salary Slips / ITR</li>
                                    <li className="py-1">|— Bank Statement (3–6 months)</li>
                                    <li className="py-1">|— Employment / Business Proof</li>
                                    <li className="py-1">|— Photographs</li>
                                </ul>
                            </li>

                            {/* Business Loan */}
                            <li className="py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">|—</span>
                                    <span className="font-semibold text-MidnightNavyText dark:text-white">
                                        <Icon icon="tabler:briefcase" className="text-primary me-2" />
                                        Business / MSME Loan
                                    </span>
                                </div>
                                <p className="ps-8 text-sm text-SlateBlueText">
                                    Funding solutions for business expansion and working needs.
                                </p>
                                <ul className="ps-8 md:ps-12 list-unstyled text-SlateBlueText">
                                    <li className="py-1">|— KYC of Proprietor / Partners / Directors</li>
                                    <li className="py-1">|— GST, Udyam, Shop Act Registration</li>
                                    <li className="py-1">|— ITR (2–3 years)</li>
                                    <li className="py-1">|— Bank Statements (6–12 months)</li>
                                    <li className="py-1">|— Financial Statements</li>
                                    <li className="py-1">|— Office Address Proof</li>
                                </ul>
                            </li>

                            {/* Education Loan */}
                            <li className="py-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary">|—</span>
                                    <span className="font-semibold text-MidnightNavyText dark:text-white">
                                        <Icon icon="tabler:school" className="text-primary me-2" />
                                        Education Loan
                                    </span>
                                </div>
                                <p className="ps-8 text-sm text-SlateBlueText">
                                    Financial support for higher education in India or abroad.
                                </p>
                                <ul className="ps-8 md:ps-12 list-unstyled text-SlateBlueText">
                                    <li className="py-1">|— Student & Parent KYC</li>
                                    <li className="py-1">|— Admission Letter</li>
                                    <li className="py-1">|— Fee Structure</li>
                                    <li className="py-1">|— Academic Records</li>
                                    <li className="py-1">|— Income Proof of Parent / Guardian</li>
                                </ul>
                            </li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};
