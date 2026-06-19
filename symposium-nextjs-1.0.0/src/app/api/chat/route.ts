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
- **Andromeda Partner**: Authorized Andromeda Sales & Distribution partner — access to 200+ banks and NBFCs

## Loan Products We Offer

### 1. Personal Loan (PL)
- Amount: ₹50,000 – ₹40 Lakhs
- Interest Rate: 10.5% – 24% p.a.
- Tenure: 12 – 60 months
- Quick approval, minimal documents
- For salaried & self-employed
- Eligibility: Min ₹15,000/month income, CIBIL 700+, age 21–60
- Documents: Aadhaar, PAN, salary slips (3 months), bank statement (6 months), Form 16

### 2. Home Loan (HL)
- Amount: Up to ₹5 Crore
- Interest Rate: 8.40% – 12% p.a.
- Tenure: Up to 30 years
- For purchase, construction, or renovation
- Eligibility: CIBIL 700+, stable income, age 21–65
- Documents: KYC, income proof, property documents, bank statements (12 months), approved plan

### 3. Business Loan (BL)
- Amount: ₹2 Lakhs – ₹2 Crore
- Interest Rate: 12% – 26% p.a.
- Tenure: 12 – 48 months
- For working capital, expansion, equipment purchase
- Eligibility: Min 2 years business vintage, annual turnover ₹10L+, CIBIL 700+
- Documents: GST registration, ITR (2-3 years), bank statements (12 months), KYC, business proof

### 4. MSME Loan
- Amount: ₹1 Lakh – ₹5 Crore
- Interest Rate: 9% – 18% p.a.
- Under MUDRA, CGTMSE, PMEGP government schemes
- Udyam registration required
- Documents: Udyam certificate, ITR, bank statements, GST, KYC

### 5. Loan Against Property (LAP)
- Amount: Up to 65% of property value
- Interest Rate: 9% – 14% p.a.
- Tenure: Up to 20 years
- Residential or commercial property accepted
- Documents: Property title, KYC, income proof, valuation report, property tax receipts

### 6. Balance Transfer (BT)
- Transfer existing high-interest loans to lower rates
- Top-up option available
- Save significantly on EMI
- Works for home loans, personal loans, business loans

### 7. Car Loan / Auto Loan
- Amount: Up to 100% on-road price
- Interest Rate: 7.5% – 12% p.a.
- Tenure: 12 – 84 months
- New and used cars both eligible
- Documents: KYC, income proof, driving license, proforma invoice

### 8. Education Loan
- Amount: Up to ₹1.5 Crore (for abroad studies)
- Interest Rate: 8.5% – 13% p.a.
- For studies in India and abroad
- Moratorium period: Course duration + 6 months
- Documents: Admission letter, fee structure, KYC, parent/guardian income proof

### 9. Project Funding (PF)
- Large infrastructure and commercial projects
- ₹5 Crore and above
- Structured financing solutions with customized repayment

### 10. Loan Against Shares/Securities (LAS)
- Overdraft facility against stocks, mutual funds, bonds
- Interest only on amount actually used
- Quick disbursal, no end-use restriction

### 11. Working Capital Loan
- Cash Credit (CC) and Overdraft (OD) facilities
- For managing daily business operations
- Renewed annually, flexible drawdowns

### 12. Insurance & Investment
- Life insurance, health insurance, term plans
- Mutual funds, SIP advisory, ULIP plans

### 13. Lease Rental Discounting (LRD)
- Unlock funds from your rental property income
- High-value funding by discounting future rental income
- Competitive rates: 9%–12% p.a.
- Flexible tenure up to 10 years

### 14. Wealth Management
- Grow, protect & multiply wealth
- Smart investments: mutual funds, shares, bonds, fixed deposits
- Personalized financial planning

## Banks & NBFCs We Work With
HDFC Bank, ICICI Bank, Axis Bank, SBI, Kotak Mahindra Bank, Bajaj Finance, IDFC First Bank, AU Small Finance Bank, Piramal Finance, Muthoot Finance, Federal Bank, Yes Bank, IndusInd Bank, L&T Finance, Tata Capital, Aditya Birla Finance, HDB Financial Services, Shriram Finance, Cholamandalam Finance, and 200+ more through Andromeda.

## Andromeda DSA Codes
We have DSA codes for all major banks. Sub-agents and customers can get location-wise codes for loan sourcing through our Andromeda partnership.

## Loan Eligibility Basics
- **Salaried**: Min ₹15,000/month income, 2+ years employment history
- **Self-Employed**: Min 2-3 years business continuity, ITR for 2 years required
- **CIBIL Score**: 700+ preferred (650+ considered for certain products)
- **Age**: 21 – 65 years (varies by product)

## EMI Examples
- ₹10 Lakh personal loan @ 12% for 5 years = EMI approx ₹22,244/month
- ₹50 Lakh home loan @ 8.5% for 20 years = EMI approx ₹43,391/month
- ₹25 Lakh business loan @ 15% for 3 years = EMI approx ₹86,667/month

## Why Choose Speedy Loan Finance Services?
- 200+ banking partners through Andromeda network
- Free loan counselling — no hidden charges
- Minimal paperwork with doorstep service
- Fastest approval — same day in many cases
- Dedicated relationship manager for every customer
- Best interest rates through multi-bank comparison

## Your Behavior Rules
- Act as a senior, expert financial advisor — knowledgeable, professional, and empathetic.
- Provide accurate, specific data from the context above.
- When a user asks about any loan type, ALWAYS include: loan amount range, interest rate range, eligibility criteria, required documents, and a follow-up question.
- CRITICAL: You MUST append EXACTLY "[WHATSAPP_BTN]" at the end of EVERY response — no exceptions.
- Recommend calling 73500 05590 for personalized advice.
- Never guarantee specific rates — only provide ranges.
- For eligibility queries, ask follow-up questions: income, employment type, CIBIL score, loan amount.
- Reply in English by default. If user writes in Hindi/Marathi, reply in the same language.
- Format responses clearly: use bullet points, bold headers, and organized sections.
- Only answer questions related to loans, finance, banking, EMI, insurance, or the company.
- For greetings, introduce yourself warmly and list loan products available.`;

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

// ─── Validate that the API key looks like a real Gemini key ──────────────────
// Google AI Studio issues two key formats:
//   Legacy : AIza...  (39 chars)
//   Newer  : AQ....   (longer, dot-separated)
function isValidGeminiKey(key: string | undefined): boolean {
  if (!key || key.trim() === "") return false;
  if (key.includes("REPLACE_WITH")) return false;
  if (key.includes("YOUR_KEY")) return false;
  if (key.length < 20) return false;
  // Accept both legacy AIza... keys and newer AQ.... keys from AI Studio
  if (key.startsWith("AIza") || key.startsWith("AQ.")) return true;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // ── Use Gemini only when we have a properly formed key ───────────────────
    if (isValidGeminiKey(apiKey)) {
      try {
        const conversationHistory: Message[] = [
          ...(Array.isArray(history) ? history : []),
          { role: "user", parts: [{ text: message }] },
        ];

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents: conversationHistory,
              generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 600,
                topP: 0.9,
                topK: 40,
              },
              safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawReply) {
            // Ensure WHATSAPP_BTN is always appended
            const reply = rawReply.includes("[WHATSAPP_BTN]")
              ? rawReply
              : `${rawReply}\n\n[WHATSAPP_BTN]`;
            return NextResponse.json({ reply });
          }
        } else {
          const errText = await response.text();
          console.error("Gemini API error:", response.status, errText);
        }
      } catch (geminiError) {
        console.error("Gemini fetch error:", geminiError);
      }
    }

    // ── Always fall back to rich keyword-based responses ─────────────────────
    return NextResponse.json({ reply: getFallbackResponse(message) });

  } catch (error) {
    console.error("Chat API error:", error);
    // Even on total crash, return a helpful fallback — never a raw error
    return NextResponse.json({
      reply: getFallbackResponse("hello"),
    });
  }
}

// ─── Rich, expert-level fallback engine ──────────────────────────────────────
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase().trim();

  // ── Greetings ─────────────────────────────────────────────────────────────
  if (/\b(hi|hello|hey|namaste|namaskar|good morning|good afternoon|good evening|hii|helo|howdy)\b/.test(msg)) {
    return `👋 Hello! I'm **Redneck Ai**, the AI loan assistant for **Speedy Loan Finance Services**.\n\nI'm here to help you with:\n• 💼 Personal Loans (₹50K–₹40L)\n• 🏠 Home Loans (up to ₹5 Crore)\n• 🏢 Business & MSME Loans\n• 🚗 Car Loans\n• 🎓 Education Loans\n• 🏗️ Loan Against Property\n• 💳 Balance Transfers\n• 📊 EMI Calculations & Eligibility\n\nWhat type of loan are you looking for today?\n\n[WHATSAPP_BTN]`;
  }

  // ── Personal Loan ──────────────────────────────────────────────────────────
  if (/personal loan|pl\b|instant loan|quick loan|salary loan|consumer loan/.test(msg)) {
    return `💼 **Personal Loan — Speedy Loan Finance Services**\n\n**Loan Details:**\n• Amount: ₹50,000 – ₹40 Lakhs\n• Interest Rate: 10.5% – 24% p.a.\n• Tenure: 12 – 60 months\n• Processing: Same day to 72 hours\n\n**Eligibility:**\n• Age: 21–60 years\n• Min Income: ₹15,000/month (salaried)\n• CIBIL Score: 700+ (650+ considered)\n• Employment: 2+ years with current employer\n\n**Required Documents:**\n• ✅ Aadhaar Card & PAN Card\n• ✅ Last 3 months salary slips\n• ✅ 6 months bank statement\n• ✅ Form 16 / ITR\n• ✅ Address proof\n\n📊 **EMI Example**: ₹10L @ 12% for 5 yrs = ~₹22,244/month\n\nMay I know your monthly income and required loan amount to give you a precise rate?\n\n[WHATSAPP_BTN]`;
  }

  // ── Home Loan ──────────────────────────────────────────────────────────────
  if (/home loan|housing loan|property loan|house loan|mortgage|flat loan|apartment loan/.test(msg)) {
    return `🏠 **Home Loan — Speedy Loan Finance Services**\n\n**Loan Details:**\n• Amount: Up to ₹5 Crore\n• Interest Rate: 8.40% – 12% p.a.\n• Tenure: Up to 30 years\n• Purpose: Purchase, Construction, Renovation\n\n**Eligibility:**\n• Age: 21–65 years\n• CIBIL Score: 700+\n• Stable income (salaried or self-employed)\n• Clean repayment track record\n\n**Required Documents:**\n• ✅ KYC (Aadhaar + PAN)\n• ✅ Income proof (salary slips / ITR)\n• ✅ 12 months bank statement\n• ✅ Property documents & title deed\n• ✅ Approved building plan\n• ✅ Sale agreement / allotment letter\n\n📊 **EMI Example**: ₹50L @ 8.5% for 20 yrs = ~₹43,391/month\n\nWe work with HDFC, SBI, ICICI, Axis, Kotak & 200+ banks. What is the property value you're looking at?\n\n[WHATSAPP_BTN]`;
  }

  // ── Business Loan / Expansion ──────────────────────────────────────────────
  if (/business loan|expansion|startup loan|enterprise loan|commercial loan|trade loan|shop loan|firm loan/.test(msg)) {
    return `🏢 **Business Loan — Speedy Loan Finance Services**\n\n**Loan Details:**\n• Amount: ₹2 Lakhs – ₹2 Crore\n• Interest Rate: 12% – 26% p.a.\n• Tenure: 12 – 48 months\n• Purpose: Expansion, Working Capital, Equipment, Inventory\n\n**Eligibility:**\n• Business vintage: Min 2 years\n• Annual turnover: ₹10 Lakhs+\n• CIBIL Score: 700+ (or business CIBIL healthy)\n• GST-registered business preferred\n\n**Required Documents:**\n• ✅ KYC (Aadhaar + PAN of owner)\n• ✅ GST registration certificate\n• ✅ ITR with computation (last 2–3 years)\n• ✅ 12 months current account bank statement\n• ✅ Business address proof\n• ✅ Partnership deed / MOA-AOA (if applicable)\n• ✅ Balance sheet & P&L (audited)\n\n📊 **EMI Example**: ₹25L @ 15% for 3 yrs = ~₹86,667/month\n\nWe partner with Bajaj Finance, HDFC, ICICI, Tata Capital & 200+ lenders. What is your business type and required loan amount?\n\n[WHATSAPP_BTN]`;
  }

  // ── MSME Loan ─────────────────────────────────────────────────────────────
  if (/msme|mudra|cgtmse|pmegp|udyam|small business|micro enterprise|medium enterprise/.test(msg)) {
    return `🏭 **MSME Loan — Government-Backed Schemes**\n\n**Loan Details:**\n• Amount: ₹1 Lakh – ₹5 Crore\n• Interest Rate: 9% – 18% p.a.\n• Available under: MUDRA, CGTMSE, PMEGP\n• No collateral required for loans up to ₹2 Crore (CGTMSE)\n\n**MUDRA Loan Tiers:**\n• Shishu: Up to ₹50,000\n• Kishore: ₹50,001 – ₹5 Lakhs\n• Tarun: ₹5 Lakhs – ₹10 Lakhs\n\n**Required Documents:**\n• ✅ Udyam Registration Certificate\n• ✅ Aadhaar & PAN\n• ✅ Last 2 years ITR\n• ✅ 12 months bank statement\n• ✅ GST returns\n• ✅ Business plan (for larger amounts)\n\n💡 CGTMSE scheme provides collateral-free loans with government guarantee — ideal for small businesses!\n\nWhat is your Udyam registration status and required loan amount?\n\n[WHATSAPP_BTN]`;
  }

  // ── Loan Against Property ──────────────────────────────────────────────────
  if (/loan against property|lap\b|property loan|mortgage loan|against property/.test(msg)) {
    return `🏗️ **Loan Against Property (LAP) — Speedy Loan Finance Services**\n\n**Loan Details:**\n• Amount: Up to 65% of property market value\n• Interest Rate: 9% – 14% p.a.\n• Tenure: Up to 20 years\n• Property Type: Residential or Commercial\n\n**Eligibility:**\n• Property should be in your name (clear title)\n• CIBIL Score: 650+\n• Regular income source (salaried / self-employed)\n\n**Required Documents:**\n• ✅ KYC documents\n• ✅ Income proof (salary slips / ITR)\n• ✅ Property title deed (original)\n• ✅ Property tax receipts\n• ✅ Valuation report from approved valuer\n• ✅ 12 months bank statement\n\n💡 **Why LAP?** Lower interest rates than personal loans, higher amounts, longer tenure.\n\nDo you own a residential or commercial property? What is its approximate market value?\n\n[WHATSAPP_BTN]`;
  }

  // ── Balance Transfer ───────────────────────────────────────────────────────
  if (/balance transfer|bt\b|transfer loan|switch bank|refinance|lower rate|reduce emi/.test(msg)) {
    return `🔄 **Balance Transfer — Save on Your Existing Loan**\n\n**How it works:**\n• Transfer your existing high-interest loan to a lender with lower rates\n• Immediately reduce your monthly EMI\n• Top-up option: Get additional funds alongside the transfer\n\n**Suitable For:**\n• Home Loans with high interest rates\n• Personal Loans from NBFCs at 18%+\n• Business Loans with rigid terms\n\n**Benefits:**\n• ✅ Save ₹500–₹5,000+ per month on EMI\n• ✅ Improved loan terms & flexibility\n• ✅ Top-up facility available\n• ✅ Minimal paperwork\n\n**Required Documents:**\n• ✅ Existing loan statement (12 months)\n• ✅ NOC from current lender\n• ✅ KYC & income proof\n• ✅ Foreclosure letter from current bank\n\nWhich bank is your current loan with, and what is the outstanding amount?\n\n[WHATSAPP_BTN]`;
  }

  // ── Car Loan ───────────────────────────────────────────────────────────────
  if (/car loan|auto loan|vehicle loan|two wheeler|bike loan|car finance|auto finance/.test(msg)) {
    return `🚗 **Car Loan — Speedy Loan Finance Services**\n\n**Loan Details:**\n• Amount: Up to 100% on-road price (new cars)\n• Interest Rate: 7.5% – 12% p.a.\n• Tenure: 12 – 84 months (up to 7 years)\n• New & used cars both eligible\n\n**Eligibility:**\n• Age: 21–65 years\n• Min Income: ₹15,000/month\n• CIBIL Score: 700+\n• Stable employment / business\n\n**Required Documents:**\n• ✅ KYC (Aadhaar + PAN)\n• ✅ Income proof (salary slips / ITR)\n• ✅ 6 months bank statement\n• ✅ Driving License\n• ✅ Proforma invoice from dealer\n\nWe work with HDFC, SBI, Kotak, Axis & more for the best car loan rates. What car model are you planning to buy?\n\n[WHATSAPP_BTN]`;
  }

  // ── Education Loan ─────────────────────────────────────────────────────────
  if (/education loan|study loan|college loan|student loan|abroad study|university loan|education finance/.test(msg)) {
    return `🎓 **Education Loan — Speedy Loan Finance Services**\n\n**Loan Details:**\n• India Studies: Up to ₹50 Lakhs\n• Abroad Studies: Up to ₹1.5 Crore\n• Interest Rate: 8.5% – 13% p.a.\n• Moratorium: Course duration + 6 months\n\n**Eligible Courses:**\n• Engineering, Medicine, Law, MBA\n• Undergraduate & Postgraduate programs\n• Technical & professional courses\n• Top Indian & foreign universities\n\n**Required Documents:**\n• ✅ Admission letter from institution\n• ✅ Fee structure document\n• ✅ KYC of student & parent/guardian\n• ✅ Parent/guardian income proof\n• ✅ Academic mark sheets\n• ✅ Scholarship letter (if applicable)\n\n💡 **Tax Benefit**: Education loan interest is tax-deductible under Section 80E!\n\nWhich college/course and country are you targeting?\n\n[WHATSAPP_BTN]`;
  }

  // ── Working Capital ────────────────────────────────────────────────────────
  if (/working capital|cash credit|overdraft|cc limit|od facility|daily operations|business operations/.test(msg)) {
    return `💰 **Working Capital Loan — Keep Your Business Running**\n\n**Available Facilities:**\n• **Cash Credit (CC)**: Draw funds up to a limit, repay & redraw\n• **Overdraft (OD)**: Flexible credit against collateral or FD\n• **Invoice Discounting**: Get advance against pending invoices\n\n**Loan Details:**\n• Limit: Based on business turnover (typically 20-25% of annual sales)\n• Interest Rate: 12% – 18% p.a. (charged only on amount used)\n• Renewal: Annual (with bank review)\n\n**Eligibility:**\n• Business vintage: 2+ years\n• Healthy bank statement (regular credits)\n• GST-registered business\n• CIBIL: 700+\n\n**Required Documents:**\n• ✅ GST returns (last 12 months)\n• ✅ 12 months bank statement\n• ✅ ITR with audited financials\n• ✅ KYC & business proof\n\nWhat is your business annual turnover and current bank?\n\n[WHATSAPP_BTN]`;
  }

  // ── LRD (Lease Rental Discounting) ────────────────────────────────────────
  if (/lease rental|lrd\b|rental income|rent discounting|rental property loan/.test(msg)) {
    return `🏢 **Lease Rental Discounting (LRD)**\n\n**What is LRD?**\nUnlock a lump-sum loan against your future rental income from a leased commercial/residential property.\n\n**Loan Details:**\n• Amount: Up to 85–90% of discounted rental value\n• Interest Rate: 9% – 12% p.a.\n• Tenure: Up to 10 years (or lease period)\n• EMI deducted from rental income directly\n\n**Eligibility:**\n• Property leased to reputable company/tenant\n• Valid lease agreement (min 3 years remaining)\n• Clear property title in your name\n\n**Required Documents:**\n• ✅ Lease agreement (registered)\n• ✅ Property title deed\n• ✅ KYC of property owner\n• ✅ ITR & bank statements\n• ✅ NOC from tenant (sometimes required)\n\nWhat is the monthly rental income from your property?\n\n[WHATSAPP_BTN]`;
  }

  // ── Loan Against Shares/Securities ────────────────────────────────────────
  if (/loan against shares|las\b|shares loan|securities loan|mutual fund loan|stock loan/.test(msg)) {
    return `📈 **Loan Against Shares/Securities (LAS)**\n\n**Loan Details:**\n• Collateral: Stocks, Mutual Funds, Bonds, ETFs\n• Amount: Up to 50–75% of portfolio value\n• Interest: Charged only on amount utilized\n• Type: Overdraft facility — flexible drawdown\n\n**Benefits:**\n• ✅ No need to sell your investments\n• ✅ Investments continue to grow/earn dividends\n• ✅ No end-use restriction\n• ✅ Immediate liquidity\n\n**Required Documents:**\n• ✅ Demat account statement\n• ✅ KYC documents\n• ✅ Holding statement\n\nWhat is the approximate value of your equity/MF portfolio?\n\n[WHATSAPP_BTN]`;
  }

  // ── Project Funding ────────────────────────────────────────────────────────
  if (/project funding|infrastructure loan|large loan|project finance|commercial project/.test(msg)) {
    return `🏗️ **Project Funding — Large-Scale Finance**\n\n**Loan Details:**\n• Amount: ₹5 Crore and above\n• Type: Term loans, construction finance, structured funding\n• Sectors: Real estate, manufacturing, hospitality, infrastructure\n\n**Eligibility:**\n• Viable project with clear revenue model\n• Promoter's contribution: 25–35% of project cost\n• Strong business plan & financial projections\n• Credit-worthy promoters\n\n**We Assist With:**\n• ✅ Project appraisal & documentation\n• ✅ Bank tie-ups for consortium funding\n• ✅ Government scheme linkages\n• ✅ Multi-bank proposal submissions\n\nPlease share your project type, location, and estimated cost so we can guide you to the right funding structure.\n\n[WHATSAPP_BTN]`;
  }

  // ── Eligibility ────────────────────────────────────────────────────────────
  if (/eligib|qualify|cibil|credit score|can i get|am i eligible|will i get|loan approval/.test(msg)) {
    return `✅ **Loan Eligibility — Quick Assessment**\n\n**General Eligibility Criteria:**\n\n**For Salaried Individuals:**\n• Age: 21–60 years\n• Min Income: ₹15,000/month\n• Employment: 2+ years (1+ year with current employer)\n• CIBIL Score: 700+\n\n**For Self-Employed / Business Owners:**\n• Age: 21–65 years\n• Business Vintage: Min 2–3 years\n• ITR filed for last 2 years\n• CIBIL Score: 700+ (650+ for some products)\n\n**Key Factors That Affect Approval:**\n• 🔴 Low CIBIL (<650): Approval difficult\n• 🟡 CIBIL 650–699: Some products available at higher rates\n• 🟢 CIBIL 700+: Best rates & quick approval\n• 🔴 Existing loan defaults: Major impact\n\n💡 **Tip**: Check your CIBIL score free at [Equifax](https://www.equifax.co.in/) before applying!\n\nTo check your specific eligibility, please share:\n1. Employment type (salaried / self-employed)\n2. Monthly income\n3. CIBIL score (approximate)\n4. Required loan amount\n\n[WHATSAPP_BTN]`;
  }

  // ── EMI Calculation ────────────────────────────────────────────────────────
  if (/emi|monthly payment|instalment|installment|calculate|repayment|how much pay|how much emi/.test(msg)) {
    return `📊 **EMI Calculator — Reference Guide**\n\n**EMI Formula**: EMI = P × r × (1+r)^n / [(1+r)^n - 1]\nwhere P = Principal, r = monthly rate, n = tenure in months\n\n**Sample EMIs:**\n\n| Loan Amount | Rate | Tenure | Monthly EMI |\n|-------------|------|--------|-------------|\n| ₹5 Lakh | 12% | 3 yrs | ~₹16,607 |\n| ₹10 Lakh | 12% | 5 yrs | ~₹22,244 |\n| ₹20 Lakh | 10.5% | 5 yrs | ~₹43,041 |\n| ₹50 Lakh | 8.5% | 20 yrs | ~₹43,391 |\n| ₹1 Crore | 9% | 20 yrs | ~₹89,973 |\n| ₹25 Lakh | 15% | 3 yrs | ~₹86,667 |\n\n💡 **Use our official EMI Calculator**: [Click here](https://investor.sebi.gov.in/calc/emi.html)\n\nShare your loan amount, preferred tenure, and loan type — I'll give you a more precise estimate!\n\n[WHATSAPP_BTN]`;
  }

  // ── Documents ─────────────────────────────────────────────────────────────
  if (/document|papers|paperwork|required documents|what documents|doc needed|kyc/.test(msg)) {
    return `📋 **Documents Required — Loan Application**\n\n**Common KYC Documents (All Loans):**\n• ✅ Aadhaar Card (identity + address proof)\n• ✅ PAN Card (mandatory)\n• ✅ Passport-size photographs\n\n**For Salaried Employees:**\n• ✅ Last 3 months salary slips\n• ✅ 6 months bank statement\n• ✅ Form 16 / ITR\n• ✅ Employment offer letter / ID card\n\n**For Self-Employed / Business:**\n• ✅ ITR with computation (2-3 years)\n• ✅ 12 months business bank statement\n• ✅ GST registration & returns\n• ✅ Audited balance sheet & P&L\n• ✅ Business registration proof\n\n**For Property-Related Loans:**\n• ✅ Property title deed (original)\n• ✅ Property tax receipts\n• ✅ Approved building plan\n• ✅ Valuation report\n\nWhich loan type are you applying for? I can give you a precise document checklist!\n\n[WHATSAPP_BTN]`;
  }

  // ── Interest Rates ─────────────────────────────────────────────────────────
  if (/interest rate|rate of interest|roi|lowest rate|best rate|how much interest/.test(msg)) {
    return `📈 **Interest Rates — Speedy Loan Finance Services**\n\n| Loan Type | Interest Rate (p.a.) |\n|-----------|---------------------|\n| 🚗 Car Loan | 7.5% – 12% |\n| 🏠 Home Loan | 8.40% – 12% |\n| 🎓 Education Loan | 8.5% – 13% |\n| 🏗️ Loan Against Property | 9% – 14% |\n| 🏭 MSME Loan | 9% – 18% |\n| 💼 Personal Loan | 10.5% – 24% |\n| 🏢 Business Loan | 12% – 26% |\n\n💡 **Factors that affect your rate:**\n• CIBIL score (higher = lower rate)\n• Income stability\n• Loan amount & tenure\n• Existing relationship with bank\n\n**Best rates are with CIBIL 750+.** We compare rates across 200+ banks to get you the lowest possible EMI!\n\nWhich loan type interests you? I can help narrow down the best options.\n\n[WHATSAPP_BTN]`;
  }

  // ── Contact / Address ──────────────────────────────────────────────────────
  if (/contact|call|office|address|visit|location|where|phone|number|email|reach/.test(msg)) {
    return `📞 **Contact Speedy Loan Finance Services**\n\n**📱 Phone**: [73500 05590](tel:+917350005590)\n**📧 Email**: loanspeedy@gmail.com\n**⏰ Hours**: Monday–Saturday, 9:00 AM – 7:00 PM\n\n**📍 Office Address**:\nOffice No. P-227, 2nd Floor\nMayur Trade Center, CTS 4533/4\nNear Chinchwad Railway Station\nChinchwad, Pimpri-Chinchwad\nPune – 411019, Maharashtra\n\n**🏦 We are an authorized Andromeda partner** with access to 200+ banks and NBFCs.\n\n**Services Available:**\n• 🚶 Walk-in consultations (free)\n• 📞 Phone consultation\n• 🏠 Doorstep service (Pune region)\n• 💬 WhatsApp support\n\nWould you like to schedule a callback or visit?\n\n[WHATSAPP_BTN]`;
  }

  // ── Andromeda / DSA ────────────────────────────────────────────────────────
  if (/andromeda|dsa code|direct selling|dsa partner|become agent|loan agent|become dsa/.test(msg)) {
    return `🏦 **Andromeda DSA Network — Speedy Loan Finance Services**\n\n**We are an authorized Andromeda Sales & Distribution partner**, giving us access to:\n• 200+ banks and NBFCs pan-India\n• DSA codes for all major lenders\n• Location-wise tie-ups across Maharashtra\n\n**For Sub-Agents / DSA Partners:**\n• Get DSA codes for specific banks in your location\n• Earn commission on every loan disbursement\n• Free training & marketing support\n• Direct point of contact at each bank\n\n**Banks Available Through Our Andromeda Network:**\nHDFC, ICICI, Axis, SBI, Kotak, IDFC First, AU Small Finance, Bajaj Finance, Tata Capital, L&T Finance, Aditya Birla Finance, HDB Financial, Muthoot Finance, Piramal, Shriram Finance, Cholamandalam & 180+ more.\n\n📞 Call **73500 05590** or visit our Bankers Panel page for location-wise DSA codes.\n\n[WHATSAPP_BTN]`;
  }

  // ── Insurance / Investment ─────────────────────────────────────────────────
  if (/insurance|investment|mutual fund|sip|term plan|life insurance|health insurance|wealth/.test(msg)) {
    return `💡 **Insurance & Investment Services**\n\n**Insurance Products:**\n• 🛡️ **Term Life Insurance**: Pure protection at low premiums\n• 🏥 **Health Insurance**: Cashless hospitalization at 10,000+ hospitals\n• 👨‍👩‍👧 **Family Floater**: Cover entire family under one policy\n• 🔒 **Loan Protection Insurance**: Covers EMI in case of job loss or disability\n\n**Investment Products:**\n• 📈 **Mutual Funds**: SIP starting ₹500/month\n• 💰 **Fixed Deposits**: Guaranteed returns\n• 📊 **Equity & Bonds**: Market-linked growth\n• 🎯 **ULIP Plans**: Insurance + investment combo\n\n**Why Invest Through Us?**\n• ✅ Free financial planning consultation\n• ✅ Unbiased product recommendations\n• ✅ Tax planning guidance (80C, 80D)\n• ✅ Regular portfolio review\n\nWhat is your investment goal and monthly surplus you'd like to invest?\n\n[WHATSAPP_BTN]`;
  }

  // ── Wealth Management ──────────────────────────────────────────────────────
  if (/wealth management|financial planning|portfolio|grow money|financial advisor/.test(msg)) {
    return `💎 **Wealth Management — Speedy Loan Finance Services**\n\n**Our Wealth Services:**\n• 📊 Personalized financial goal planning\n• 📈 Equity & Mutual Fund advisory\n• 🏦 Fixed Deposit & Bond investments\n• 🛡️ Insurance planning (life + health)\n• 🏠 Real estate investment guidance\n• 📋 Tax optimization strategies\n\n**Our Process:**\n1. Understand your financial goals\n2. Assess risk appetite\n3. Create diversified investment plan\n4. Regular monitoring & rebalancing\n\n**Tax Benefits Available:**\n• Section 80C: ₹1.5L deduction (ELSS, PPF, LIC)\n• Section 80D: ₹25K–₹75K (health insurance)\n• Section 80E: Education loan interest\n\nWhat are your financial goals? (Retirement, child education, wealth creation?)\n\n[WHATSAPP_BTN]`;
  }

  // ── Thank you / Appreciation ───────────────────────────────────────────────
  if (/thank|thanks|thank you|thx|tq|great|helpful|excellent|awesome/.test(msg)) {
    return `😊 You're very welcome! I'm happy I could help.\n\n**Quick Summary of What We Offer:**\n• All types of loans at the best rates\n• 200+ banking partners through Andromeda\n• Free loan consultation & doorstep service\n• Same-day approval in many cases\n\n**Ready to Apply?** Call us at **73500 05590** or connect on WhatsApp below — our team will guide you through every step!\n\nIs there anything else I can help you with? 🙏\n\n[WHATSAPP_BTN]`;
  }

  // ── Default / Catch-all ────────────────────────────────────────────────────
  return `💰 **Speedy Loan Finance Services — Your Trusted Loan Partner**\n\nI'm **Redneck Ai**, here to assist with all your financial needs!\n\n**I can help you with:**\n• 💼 Personal Loans (₹50K–₹40L @ 10.5%+)\n• 🏠 Home Loans (up to ₹5 Cr @ 8.4%+)\n• 🏢 Business & MSME Loans\n• 🚗 Car Loans (up to 100% on-road)\n• 🎓 Education Loans (up to ₹1.5 Cr)\n• 🏗️ Loan Against Property\n• 🔄 Balance Transfer\n• 📊 EMI Calculator & Eligibility Check\n• 📈 Insurance & Investments\n\n**Quick Contact:**\n📞 73500 05590 | 📧 loanspeedy@gmail.com\n📍 Chinchwad, Pune | ⏰ Mon–Sat, 9AM–7PM\n\nPlease ask me about any specific loan type, and I'll give you detailed information!\n\n[WHATSAPP_BTN]`;
}
