"use client";

import Link from "next/link";

export default function GSTPage() {

  const gstData = {
    gstin: "27FSGPS6210H1ZJ",
    tradeName: "Speedy Loan Finance Services",
    legalName: "Shashikant Anil Shelke",
    constitution: "Proprietorship",
    registrationDate: "05 January 2026",
    type: "Regular",
    address:
      "Office No. P-227, 2nd Floor, Mayur Trade Center, CTS 4533/4, Chinchwad, Pimpri-Chinchwad, Pune, Maharashtra - 411019",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Title */}

      <h1 className="text-3xl md:text-4xl font-bold mb-6 
      bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 
      bg-clip-text text-transparent">
        GST Registration Details
      </h1>

      {/* Description */}

      <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm md:text-base">
        Official GST registration details of Speedy Loan Finance Services.
        This certificate confirms the business registration under the
        Government of India Goods and Services Tax system.
      </p>

      {/* Card */}

      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 p-6">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">GSTIN</p>
            <p className="font-semibold text-lg text-blue-600 dark:text-blue-400">
              {gstData.gstin}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Trade Name</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.tradeName}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Legal Name</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.legalName}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Business Constitution</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.constitution}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Registration Date</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.registrationDate}</p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Registration Type</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.type}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Business Address</p>
            <p className="font-semibold text-gray-900 dark:text-white">{gstData.address}</p>
          </div>

        </div>

        {/* Download Button */}

        {/* <div className="mt-8 flex gap-4">

          <a
            href="/GST Registration Certificate_Speedy Loan Finance Services.pdf"
            target="_blank"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View GST Certificate
          </a>

        </div> */}

      </div>

    </div>
  );
}