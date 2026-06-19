import { NextRequest, NextResponse } from "next/server";

// ─── System Prompt: Full Speedy Loan Finance Context ────────────────────────
const SYSTEM_PROMPT = `You are "Redneck Ai", the AI-powered loan assistant for Speedy Loan Finance Services — a trusted loan DSA (Direct Selling Agent) firm based in Pune, Maharashtra, India.

## About Speedy Loan Finance Services
- **Founded**: 2020
- **Owner/Agent**: Shashikant Anil Shelke
- **Office**: Office No. P-227, 2nd Floor, Mayur Trade Center, CTS 4533/4, Near Chinchwad Railway Station, Chinchwad, Pimpri-Chinchwad, Pune - 411019
- **Phone**: 73500 05590
- **Email**: loanspeedy@gmail.com
- **Office Hours**: Monday–Saturday, 9:00 AM – 7:00 PM
- **Andromeda Partner**: We are an authorized Andromeda Sales & Distribution partner, giving access to 200+ banks and NBFCs

## Loan Products We Offer

### 1. Personal Loan (PL)
- Amount: ₹50,000 – ₹40 Lakhs
- Interest Rate: 10.5% – 24% p.a.
- Tenure: 12 – 60 months
- Quick approval, minimal documents
- For salaried & self-employed individuals
- Documents: Aadhaar, PAN, salary slips (3 months), bank statement (6 months), Form 16

### 2. Home Loan (HL)
- Amount: Up to ₹5 Crore
- Interest Rate: 8.40% – 12% p.a.
- Tenure: Up to 30 years
- For purchase, construction, or renovation
- Documents: KYC, income proof, property documents, bank statements, approved plan

### 3. Business Loan (BL)
- Amount: ₹2 Lakhs – ₹2 Crore
- Interest Rate: 12% – 26% p.a.
- Tenure: 12 – 48 months
- For working capital, expansion, equipment
- Documents: GST registration, ITR (2-3 years), bank statements (12 months), KYC

### 4. MSME Loan
- Amount: ₹1 Lakh – ₹5 Crore
- Interest Rate: 9% – 18% p.a.
- Under MUDRA, CGTMSE, PMEGP schemes
- Udyam registration required
- Documents: Udyam certificate, ITR, bank statements, GST

### 5. Loan Against Property (LAP)
- Amount: Up to 65% of property value
- Interest Rate: 9% – 14% p.a.
- Tenure: Up to 20 years
- Residential or commercial property accepted
- Documents: Property title, KYC, income proof, valuation report

### 6. Balance Transfer (BT)
- Transfer existing high-interest loans to lower rates
- Top-up option available
- Save on EMI significantly

### 7. Car Loan / Auto Loan
- Amount: Up to 100% on-road price
- Interest Rate: 7.5% – 12% p.a.
- Tenure: 12 – 84 months
- New and used cars

### 8. Education Loan
- Amount: Up to ₹1.5 Crore (study abroad)
- Interest Rate: 8.5% – 13% p.a.
- For India and abroad studies
- Documents: Admission letter, fee structure, KYC, parent income proof

### 9. Project Funding (PF)
- Large infrastructure and commercial projects
- Structured financing solutions
- ₹5 Crore and above

### 10. Loan Against Shares/Securities (LAS)
- Overdraft facility against stocks, mutual funds
- Interest only on amount used

### 11. Working Capital Loan
- Cash Credit (CC), Overdraft (OD) facilities
- For running business operations

### 12. Insurance & Investment
- Life insurance, health insurance
- Mutual funds, SIP advisory

### 13. Lease Rental Discounting (LRD)
- Unlock funds from your rental property
- High-value funding by discounting rental income
- Competitive interest rates and flexible tenure

### 14. Wealth Management
- Grow, protect & multiply your wealth
- Smart investments: mutual funds, shares, bonds, fixed deposits
- Personalized financial planning

## Banks & NBFCs We Work With
HDFC Bank, ICICI Bank, Axis Bank, SBI, Kotak Mahindra Bank, Bajaj Finance, IDFC First Bank, AU Small Finance Bank, Piramal Finance, Muthoot Finance, Federal Bank, Yes Bank, IndusInd Bank, L&T Finance, Tata Capital, Aditya Birla Finance, HDB Financial Services, Shriram Finance, Cholamandalam Finance, and 200+ more through Andromeda network.

## Andromeda DSA Codes
We have DSA codes for all major banks. Customers and sub-agents can get location-wise DSA codes for loan sourcing through our Andromeda partnership.

## Loan Eligibility Basics
- **Salaried**: Min ₹15,000/month income, 2+ years employment
- **Self-Employed**: Min 2-3 years business continuity, ITR required
- **CIBIL Score**: 700+ preferred (650+ considered for some products)
- **Age**: 21 – 65 years

## EMI Calculator Example
- ₹10 Lakh personal loan at 12% for 5 years = EMI approx ₹22,244/month
- ₹50 Lakh home loan at 8.5% for 20 years = EMI approx ₹43,391/month

## Why Choose Speedy Loan Finance Services?
- 200+ banking partners through Andromeda
- Free loan counselling
- Minimal paperwork
- Fastest approval — same day in many cases
- Dedicated relationship manager
- Doorstep service in Pune region

## Your Behavior Rules
- Act as a pro-level, expert financial advisor.
- Always be helpful, professional, and concise, providing accurate data based on the provided context.
- When a user asks about a specific loan (like Business Loan), ALWAYS provide the exact Required Document List along with eligibility and rates.
- CRITICAL INSTRUCTION: You MUST, without fail, append EXACTLY this text at the very end of EVERY single response you generate: "[WHATSAPP_BTN]"
- This token will render a small WhatsApp button that connects them directly to our team. Do NOT provide direct WhatsApp URLs.
- Always recommend calling 73500 05590 for personalized advice.
- Never promise specific interest rates — only give ranges.
- If asked about eligibility, ask follow-up questions: income, employment type, CIBIL score, loan amount needed.
- Reply only in English (unless user writes in Hindi/Marathi — then reply in same language).
- Keep responses well-formatted and expert-level (use bullet points for documents).
- Don't answer questions unrelated to loans, finance, or the company`;

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.includes("REPLACE_WITH")) {
      // Fallback intelligent responses when API key not set
      return NextResponse.json({
        reply: getFallbackResponse(message),
      });
    }

    // Build conversation history for Gemini
    const conversationHistory: Message[] = [
      ...(history || []),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
            topP: 0.9,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
          ],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini API error:", err);
      return NextResponse.json({
        reply: getFallbackResponse(message),
      });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't process that. Please call us at 73500 05590 for assistance.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "Something went wrong. Please try again or call us at 73500 05590." },
      { status: 200 }
    );
  }
}

// ─── Fallback responses when API key is not configured ───────────────────────
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("personal loan") || msg.includes("pl")) {
    return "💼 **Personal Loan**: Get ₹50K–₹40L at 10.5%–24% p.a. with minimal documents. Quick approval for salaried & self-employed. What is your monthly income and required loan amount?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("home loan") || msg.includes("housing")) {
    return "🏠 **Home Loan**: Up to ₹5 Crore at 8.40%–12% p.a. for up to 30 years. We work with HDFC, SBI, ICICI & 200+ banks. What property value are you looking at?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("business loan") || msg.includes("msme") || msg.includes("sme")) {
    return "🏢 **Business/MSME Loan**: ₹2L–₹2 Crore at 12%–26% p.a. \n**Required Documents**: GST registration, ITR (2-3 years), 12-month bank statements, and KYC.\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("lap") || msg.includes("property") || msg.includes("against property")) {
    return "🏗️ **Loan Against Property**: Get up to 65% of your property value at 9%–14% p.a. for up to 20 years. What type of property do you own (residential/commercial)?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("eligib") || msg.includes("qualify") || msg.includes("cibil") || msg.includes("credit score")) {
    return "✅ **Eligibility Basics**: CIBIL 700+, age 21–65, min income ₹15K/month (salaried) or 2+ years business. Tell me your details and I'll check your eligibility!\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("emi") || msg.includes("interest rate") || msg.includes("calculate")) {
    return "📊 **EMI Example**: ₹10L personal loan @ 12% for 5 years = ~₹22,244/month. ₹50L home loan @ 8.5% for 20 years = ~₹43,391/month. What loan amount & tenure are you considering?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("document") || msg.includes("papers") || msg.includes("required")) {
    return "📋 **Documents Needed**: Aadhaar, PAN, 3 months salary slips, 6 months bank statement, and address proof. Which loan type are you applying for?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("contact") || msg.includes("call") || msg.includes("office") || msg.includes("visit")) {
    return "📞 **Contact Us**: Call **73500 05590** | Email: loanspeedy@gmail.com\n📍 Mayur Trade Center, Chinchwad, Pune 411019\n⏰ Mon–Sat: 9AM–7PM. Would you like to schedule a callback?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("balance transfer") || msg.includes("bt") || msg.includes("transfer")) {
    return "🔄 **Balance Transfer**: Switch your existing high-interest loan to lower rates and save on EMI. Which bank is your current loan with?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("car") || msg.includes("auto") || msg.includes("vehicle")) {
    return "🚗 **Car Loan**: Up to 100% on-road price at 7.5%–12% p.a. for up to 7 years. New and used cars. What car model are you planning to buy?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("education") || msg.includes("study") || msg.includes("college")) {
    return "🎓 **Education Loan**: Up to ₹1.5 Crore for India/abroad studies at 8.5%–13% p.a. Which college or course are you targeting?\n\n[WHATSAPP_BTN]";
  }
  if (msg.includes("andromeda") || msg.includes("dsa") || msg.includes("code")) {
    return "🏦 **Andromeda DSA**: We are authorized Andromeda partners with DSA codes for 200+ banks. Visit our Bankers Panel page or call 73500 05590 for location-wise codes.\n\n[WHATSAPP_BTN]";
  }
  if (msg.match(/hi|hello|hey|namaste|namaskar/)) {
    return "👋 Hello! I'm **Redneck Ai**, your AI loan assistant for Speedy Loan Finance Services. I can help you with:\n• Personal, Home, Business & MSME Loans\n• Eligibility & Documents\n• EMI Calculations\n• DSA Codes\n\nWhat type of loan are you looking for?\n\n[WHATSAPP_BTN]";
  }

  return "I'm here to help with all your loan queries! 💰 Ask me about Personal Loans, Home Loans, Business Loans, MSME Loans, Loan Against Property, or anything related to finance. You can also call us at **73500 05590**.\n\n[WHATSAPP_BTN]";
}
