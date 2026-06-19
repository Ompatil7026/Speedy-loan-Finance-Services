"use client";

const LocationSecCode = () => {

  const data = [
    { location: "Ahmedabad", code: "ASDAH" },
    { location: "Bangalore", code: "ASDBG" },
    { location: "Chennai", code: "ASDCH" },
    { location: "Coimbatore", code: "ASDCO" },
    { location: "Delhi", code: "ASDDE" },
    { location: "Jaipur", code: "ASDJP" },
    { location: "Guwahati", code: "ASDGW" },
    { location: "Hyderabad", code: "ASDHY" },
    { location: "Kochi", code: "ASDKC" },
    { location: "Kolkata", code: "ASDKO" },
    { location: "Ludhiana", code: "ASDLD" },
    { location: "Mumbai", code: "ASDMU" },
    { location: "Mysore", code: "ASDMY" },
    { location: "Pune", code: "ASDPU" },
    { location: "Siliguri", code: "ASDCL" },
    { location: "Surat", code: "ASDSU" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Title */}

      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
        Andromeda Location Sec Codes
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Location wise Andromeda Sec Codes used for loan processing and
        partner identification across different cities.
      </p>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">

        <table className="min-w-full bg-white dark:bg-gray-900">

          <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">

            <tr>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Sec Code</th>
            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >

                <td className="py-4 px-6 font-medium text-gray-800 dark:text-white">
                  {item.location}
                </td>

                <td className="py-4 px-6 text-indigo-600 dark:text-indigo-400 font-semibold">
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

export default LocationSecCode;