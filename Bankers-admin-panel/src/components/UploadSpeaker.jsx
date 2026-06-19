import axios from "axios";
import { useState } from "react";
import { supabase } from "../lib/supabase";
const banks = [
  "Aadhar Housing",
  "Aavas",
  "Abhiloans",
  "Aditya Birla Capital",
  "Aditya Birla Finance",
  "Aditya Birla Housing",
  "Aeon Credit",
  "Agrim Housing",
  "Ambit Finvest",
  "Anand Rathi",
  "Arka",
  "Art Housing",
  "Arthan Finance",
  "Ashv Finance",
  "AU Small Finance Bank",
  "Auxillo Finserve",
  "Avanse",
  "Axis Bank",
  "Axis Finance",
  "Bajaj Finance",
  "Bajaj Finserv",
  "Bajaj Housing",
  "Bandhan Bank",
  "Bank Of Baroda",
  "Bank Of India",
  "Bluebear Technologies",
  "Capital India Finance",
  "Capital India Home",
  "Capri Global Capital",
  "Capri Global Housing",
  "CSB Bank",
  "Cent Bank Home Finance",
  "Central Bank Of India",
  "Centrum Housing",
  "Chola",
  "Clix Capital",
  "DBS Bank",
  "DCB Bank",
  "Deutsche Bank",
  "DMI Finance",
  "Easy Home",
  "Edelweiss Housing Finance",
  "Edelweiss Retail Finance",
  "Epimoney",
  "ESAF Small Finance Bank",
  "Fedbank Financial Services",
  "Federal Bank",
  "Finnable",
  "Fintree",
  "GIC Housing",
  "Godrej Capital",
  "Godrej Housing Finance",
  "Gosree Finance",
  "Grihum Housing",
  "Growth Source",
  "HDB Financial Services",
  "HDFC Bank",
  "HDFC Credila",
  "Hero Fincorp",
  "Hero Housing",
  "Hinduja Housing",
  "Hinduja Leyland Finance",
  "HSBC",
  "ICICI Bank",
  "ICICI Home Finance",
  "IDBI Bank",
  "IDFC First Bank",
  "IKF Finance",
  "InCred",
  "IIFL",
  "Indiabulls",
  "Indian Bank",
  "Indifi",
  "Indostar",
  "IndusInd Bank",
  "ITI Finance",
  "Jana Small Finance Bank",
  "Jio Finance",
  "JM Financial",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "Kisetsu Saison",
  "Kotak Mahindra Bank",
  "Kotak Mahindra Prime",
  "KrazyBee",
  "KreditBee",
  "L&T Housing Finance",
  "Lendingkart",
  "Mahindra Finance",
  "Mahindra Rural Housing Finance",
  "Manba Finance",
  "Mangal Credit",
  "MAS Financial",
  "Mirae Asset Financial Services",
  "Mizuho Capsave Finance",
  "Moneywise",
  "Motilal",
  "Muthoot Finance",
  "Muthoot Fincorp",
  "Muthoot Home Finance",
  "Muthoot Housing",
  "NeoGrowth",
  "Nido Home",
  "Niwas Housing",
  "Nomisma",
  "Orix",
  "PaySense",
  "Piramal Finance",
  "Punjab National Bank",
  "PNB Housing Finance",
  "Poonawalla Fincorp",
  "Profectus",
  "Protium",
  "Purple Finance",
  "Ratnakar Bank",
  "Repco Home Finance",
  "Sammaan Capital",
  "Sammaan Finserve",
  "Saraswat Bank",
  "Satin Housing Finance",
  "State Bank Of India",
  "SBM Bank",
  "SC Capital",
  "Shinhan Bank",
  "Shriram Finance",
  "Shriram Housing Finance",
  "Shubham Housing",
  "Singularity Creditworld",
  "SMFG",
  "SMFG Home Finance",
  "South Indian Bank",
  "Standard Chartered Bank",
  "Sundaram Finance",
  "Suryoday Small Finance Bank",
  "Svakarma Finance",
  "SVC Bank",
  "Tata Capital",
  "Tata Housing Finance",
  "TruCap Finance",
  "Tyger Capital",
  "Union Bank Of India",
  "Ugro Capital",
  "Ujjivan Small Finance Bank",
  "Unity Small Finance Bank",
  "Utkarsh Small Finance Bank",
  "Vastu Housing Finance",
  "Vistaar Finance",
  "YES Bank",
];

export default function UploadSpeaker({ refresh }) {
  const [bank, setBank] = useState("");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "bank_upload");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/damkh4h87/image/upload",
      formData
    );

    return {
      url: res.data.secure_url,
      public_id: res.data.public_id,
    };
  };

  const uploadSpeaker = async () => {
    if (!bank || !logo || !preview) {
      alert("Select bank and upload both images");
      return;
    }

    try {
      const logoData = await uploadToCloudinary(logo);
      const bannerData = await uploadToCloudinary(preview);

      console.log("Logo URL:", logoData.url);
      console.log("Banner URL:", bannerData.url);

      const { data, error } = await supabase.from("speakers").insert([
        {
          name: bank,
          src: logoData.url,
          preview: bannerData.url,
          logo_public_id: logoData.public_id,
          banner_public_id: bannerData.public_id,
          alt: "work class speakers",
          designation: "",
        },
      ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        alert("Database insert failed");
        return;
      }

      alert("Uploaded Successfully");

      refresh();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2
          className="upload-title"
          style={{ color: "rgb(82,3,99)", fontSize: "25px" }}
        >
          ADD YOUR BANKS ONE PAGER
        </h2>

        <div className="form-group">
          <label>Select Bank</label>

          <select value={bank} onChange={(e) => setBank(e.target.value)}>
            <option>Select Bank</option>

            {banks
              .slice()
              .sort()
              .map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Upload Bank Logo</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Upload One Pager of Bank</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPreview(e.target.files[0])}
          />
        </div>

        <button className="upload-btn" onClick={uploadSpeaker}>
          Upload Bank
        </button>
      </div>
    </div>
  );
}
