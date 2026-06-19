"use client";

const ICICI = () => {

  const data = [
    {
      cluster: "Gujarat",
      location: "Ahmedabad, Baroda, Surat, Rajkot, Jamnagar, Bhavnagar",
      code: "268592",
    },
    {
      cluster: "Bangalore",
      location: "Bangalore",
      code: "268593",
    },
    {
      cluster: "Calcutta",
      location: "Calcutta",
      code: "268595",
    },
    {
      cluster: "Chandigarh",
      location: "Chandigarh",
      code: "268596",
    },
    {
      cluster: "Chhattisgarh & Orissa",
      location: "Bhubaneshwar, Bilaspur, Cuttack, Raipur",
      code: "268597",
    },
    {
      cluster: "Chennai",
      location: "Chennai",
      code: "268598",
    },
    {
      cluster: "Delhi NCR",
      location: "Delhi, Noida, Gurgaon, Faridabad, Ghaziabad",
      code: "268599",
    },
    {
      cluster: "Haryana",
      location: "Panipat, Rohtak, Yamunanagar, Karnal",
      code: "268600",
    },
    {
      cluster: "Hyderabad",
      location: "Hyderabad",
      code: "268601",
    },
    {
      cluster: "Rajasthan",
      location: "Jaipur, Jodhpur, Udaipur, Bikaner",
      code: "268602",
    },
    {
      cluster: "Kerela",
      location: "Kochi, Trivandrum, Kannur, Kottayam",
      code: "268603",
    },
    {
      cluster: "Madhya Pradesh",
      location: "Indore, Bhopal, Gwalior, Jabalpur",
      code: "268604",
    },
    {
      cluster: "Mumbai",
      location: "Mumbai",
      code: "268605",
    },
    {
      cluster: "Pune",
      location: "Pune",
      code: "268606",
    },
    {
      cluster: "Punjab",
      location: "Amritsar, Bhatinda, Jalandhar",
      code: "268607",
    },
    {
      cluster: "Rest of Andhra Pradesh",
      location: "Vishakhapatnam, Vijayawada, Warangal, Guntur",
      code: "268608",
    },
    {
      cluster: "Rest of Karnataka",
      location: "Mangalore, Mysore, Hubli, Belgaum",
      code: "268610",
    },
    {
      cluster: "Rest of Tamil Nadu",
      location: "Coimbatore, Madurai, Trichy, Vellore",
      code: "268612",
    },
    {
      cluster: "ROM",
      location: "Panjim, Nagpur, Aurangabad, Nasik, Kolhapur",
      code: "268613",
    },
    {
      cluster: "Uttar Pradesh",
      location: "Lucknow, Allahabad, Agra, Mathura, Meerut",
      code: "268615",
    },
    {
      cluster: "Uttarakhand",
      location: "Dehradun, Rishikesh, Mussoorie",
      code: "268616",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Gradient Title */}

      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
        ICICI Bank HL / LAP Location Wise DSA Codes
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Location wise ICICI Bank HL and LAP broker codes used for loan
        processing through Andromeda Sales & Distribution Pvt. Ltd.
      </p>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">

        <table className="min-w-full bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

            <tr>
              <th className="py-3 px-5 text-left">Cluster</th>
              <th className="py-3 px-5 text-left">Location</th>
              <th className="py-3 px-5 text-left">Broker Code</th>
            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >

                <td className="py-4 px-5 font-medium text-gray-800 dark:text-white">
                  {item.cluster}
                </td>

                <td className="py-4 px-5 text-gray-600 dark:text-gray-300">
                  {item.location}
                </td>

                <td className="py-4 px-5 font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.code}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">

        <p>
          Source: Andromeda Sales & Distribution Pvt. Ltd., Santacruz (East),
          Mumbai.
        </p>

      </div>

    </div>
  );
};

export default ICICI;