"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

/* ─── System Prompt ──────────────────────────────────────── */
const SYSTEM_PROMPT = `You are "Redneck Ai", the AI-powered loan assistant for Speedy Loan Finance Services — a trusted loan DSA firm based in Pune, Maharashtra, India.

## About Speedy Loan Finance Services
- Owner: Shashikant Anil Shelke
- Office: Office No. P-227, 2nd Floor, Mayur Trade Center, Near Chinchwad Railway Station, Chinchwad, Pimpri-Chinchwad, Pune - 411019
- Phone: 73500 05590
- Email: loanspeedy@gmail.com
- Hours: Monday–Saturday, 9:00 AM – 7:00 PM
- Andromeda Partner: 200+ banks and NBFCs

## Loan Products
1. Personal Loan: ₹50K–₹40L at 10.5%–24% p.a., 12–60 months. Docs: Aadhaar, PAN, 3mo salary slips, 6mo bank statement, Form 16.
2. Home Loan: Up to ₹5 Crore at 8.40%–12% p.a., up to 30 years. Docs: KYC, income proof, property docs, 12mo bank statement.
3. Business Loan: ₹2L–₹2 Crore at 12%–26% p.a., 12–48 months. Docs: GST registration, ITR (2-3 yrs), 12mo bank statement, KYC.
4. MSME Loan: ₹1L–₹5 Crore at 9%–18% p.a. Under MUDRA, CGTMSE, PMEGP. Needs Udyam registration.
5. Loan Against Property: Up to 65% of property value at 9%–14% p.a., up to 20 years.
6. Balance Transfer: Switch high-interest loans to lower rates + top-up option.
7. Car Loan: Up to 100% on-road price at 7.5%–12% p.a., up to 7 years.
8. Education Loan: Up to ₹1.5 Crore at 8.5%–13% p.a. for India/abroad.
9. Working Capital: Cash Credit, Overdraft facilities.
10. Insurance & Investment: Life, health insurance, mutual funds, SIP.
11. Lease Rental Discounting, Project Funding, Loan Against Shares.

## Eligibility
- Salaried: Min ₹15,000/month, 2+ years employment, CIBIL 700+, age 21-60
- Self-Employed: Min 2-3 years business, ITR filed, CIBIL 700+, age 21-65

## EMI Examples
- ₹10L @ 12% for 5 yrs = ~₹22,244/month
- ₹50L @ 8.5% for 20 yrs = ~₹43,391/month

## Banks
HDFC, ICICI, Axis, SBI, Kotak, Bajaj Finance, IDFC First, AU Small Finance, Tata Capital, L&T Finance, Aditya Birla Finance + 200 more.

## Response Rules
- Be a senior financial advisor — expert, concise, helpful.
- Always include loan amount, rate, tenure, eligibility, docs for any loan query.
- ALWAYS end every response with exactly: [WHATSAPP_BTN]
- Format with bullet points and bold headers.
- Only answer finance/loan/company related questions.
- For eligibility questions, ask follow-up: income, employment type, CIBIL, loan amount.`;

/* ─── Quick Reply Chips ─────────────────────────────────── */
const QUICK_REPLIES = [
  { label: "💼 Personal Loan", text: "Tell me about personal loan eligibility and rates" },
  { label: "🏠 Home Loan", text: "What are home loan interest rates and process?" },
  { label: "🏢 Business Loan", text: "I need a business loan for expansion" },
  { label: "📊 Check Eligibility", text: "How do I check my loan eligibility?" },
  { label: "📋 Documents Required", text: "What documents are required for a loan?" },
  { label: "📞 Contact Us", text: "How can I contact Speedy Loan Finance?" },
];

/* ─── Markdown-like formatter ────────────────────────────── */
function formatText(text: string) {
  const parts = text.split(/(\[WHATSAPP_BTN\]|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part === "[WHATSAPP_BTN]") {
      return (
        <div key={i} className="mt-3 block">
          <p className="text-[11px] font-semibold mb-1.5 opacity-90">For further information, connect with us:</p>
          <a
            href="https://wa.me/917350005590?text=Hello%20Speedy%20Loan%20Finance%20Services,%20I%20would%20like%20to%20connect%20regarding%20my%20loan%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm transition-all hover:scale-105"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.546 1.875 14.07 .843 11.435.841 5.996.841 1.572 5.261 1.568 10.7c-.001 1.708.452 3.376 1.312 4.86l-.995 3.633 3.762-.986zM17.487 14.39c-.3-.15-1.774-.875-2.046-.975-.273-.1-.472-.15-.672.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.205-1.075-1.73-2.146-1.92-2.436-.19-.3-.02-.45.13-.6.13-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.62-1.046-2.52-.363-.878-.73-.76-.975-.76-.2-.01-.43-.01-.67-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.28 3.48 1.46 3.71.18.23 2.52 3.85 6.1 5.39.85.37 1.52.59 2.03.76.86.27 1.64.23 2.26.14.69-.1 2.04-.83 2.33-1.63.29-.8.29-1.49.2-1.63-.09-.13-.29-.21-.59-.36z" /></svg>
            Connect with me
          </a>
        </div>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split("\n").map((line, j) => (
      <React.Fragment key={`${i}-${j}`}>
        {j > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  });
}

/* ─── Rich keyword fallback (no AI needed) ──────────────── */
function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase().trim();

  if (/\b(hi|hello|hey|namaste|namaskar|good morning|good afternoon|good evening|hii)\b/.test(msg)) {
    return `👋 Hello! I'm **Redneck Ai**, your AI loan assistant for **Speedy Loan Finance Services**.\n\nI can help you with:\n• 💼 Personal Loans (₹50K–₹40L)\n• 🏠 Home Loans (up to ₹5 Crore)\n• 🏢 Business & MSME Loans\n• 🚗 Car Loans\n• 🎓 Education Loans\n• 🏗️ Loan Against Property\n• 📊 EMI Calculations & Eligibility\n\nWhat type of loan are you looking for today?\n\n[WHATSAPP_BTN]`;
  }
  if (/personal loan|instant loan|quick loan|salary loan/.test(msg)) {
    return `💼 **Personal Loan**\n\n• Amount: ₹50,000 – ₹40 Lakhs\n• Rate: 10.5% – 24% p.a.\n• Tenure: 12 – 60 months\n• CIBIL: 700+ | Min Income: ₹15,000/month\n\n**Documents:** Aadhaar, PAN, 3mo salary slips, 6mo bank statement, Form 16\n\n📊 EMI Example: ₹10L @ 12% for 5 yrs = ~₹22,244/month\n\nWhat is your monthly income and required loan amount?\n\n[WHATSAPP_BTN]`;
  }
  if (/home loan|housing loan|house loan|mortgage/.test(msg)) {
    return `🏠 **Home Loan**\n\n• Amount: Up to ₹5 Crore\n• Rate: 8.40% – 12% p.a.\n• Tenure: Up to 30 years\n• CIBIL: 700+ | Age: 21–65\n\n**Documents:** KYC, income proof, property docs, 12mo bank statement, approved plan\n\n📊 EMI Example: ₹50L @ 8.5% for 20 yrs = ~₹43,391/month\n\nWhat property value are you looking at?\n\n[WHATSAPP_BTN]`;
  }
  if (/business loan|expansion|msme|startup loan|enterprise|working capital/.test(msg)) {
    return `🏢 **Business Loan**\n\n• Amount: ₹2 Lakhs – ₹2 Crore\n• Rate: 12% – 26% p.a.\n• Tenure: 12 – 48 months\n• Business vintage: Min 2 years | CIBIL: 700+\n\n**Required Documents:**\n• ✅ KYC (Aadhaar + PAN)\n• ✅ GST registration certificate\n• ✅ ITR with computation (last 2–3 years)\n• ✅ 12 months current account bank statement\n• ✅ Business address proof\n• ✅ Audited balance sheet & P&L\n\nWhat is your business type and required loan amount?\n\n[WHATSAPP_BTN]`;
  }
  if (/loan against property|lap\b|property loan/.test(msg)) {
    return `🏗️ **Loan Against Property**\n\n• Amount: Up to 65% of property value\n• Rate: 9% – 14% p.a.\n• Tenure: Up to 20 years\n• Residential or Commercial property accepted\n\n**Documents:** Property title deed, KYC, income proof, valuation report, tax receipts\n\nDo you own residential or commercial property? What is its approximate value?\n\n[WHATSAPP_BTN]`;
  }
  if (/balance transfer|refinance|lower rate|reduce emi/.test(msg)) {
    return `🔄 **Balance Transfer**\n\n• Transfer high-interest loans to lower rates\n• Top-up option available\n• Works for Home, Personal & Business Loans\n\n**Documents:** Existing loan statement, NOC from current lender, KYC, income proof\n\nWhich bank is your current loan with, and what is the outstanding amount?\n\n[WHATSAPP_BTN]`;
  }
  if (/car loan|auto loan|vehicle loan|bike loan/.test(msg)) {
    return `🚗 **Car Loan**\n\n• Amount: Up to 100% on-road price\n• Rate: 7.5% – 12% p.a.\n• Tenure: Up to 7 years\n• New & used cars eligible\n\n**Documents:** KYC, income proof, driving license, proforma invoice\n\nWhat car model are you planning to buy?\n\n[WHATSAPP_BTN]`;
  }
  if (/education loan|study loan|student loan|abroad study/.test(msg)) {
    return `🎓 **Education Loan**\n\n• India: Up to ₹50 Lakhs\n• Abroad: Up to ₹1.5 Crore\n• Rate: 8.5% – 13% p.a.\n• Moratorium: Course duration + 6 months\n• Tax benefit under Section 80E\n\n**Documents:** Admission letter, fee structure, KYC, parent income proof\n\nWhich college/course and country are you targeting?\n\n[WHATSAPP_BTN]`;
  }
  if (/eligib|qualify|cibil|credit score|can i get|am i eligible/.test(msg)) {
    return `✅ **Loan Eligibility**\n\n**Salaried:** Min ₹15,000/month, 2+ yrs employment, CIBIL 700+, age 21–60\n**Self-Employed:** 2-3 yrs business, ITR filed, CIBIL 700+, age 21–65\n\n**CIBIL Impact:**\n• 🟢 750+: Best rates, quick approval\n• 🟡 700–749: Good, standard rates\n• 🟡 650–699: Higher rates, limited options\n• 🔴 Below 650: Difficult to approve\n\nTell me your employment type, monthly income & CIBIL score for a precise check!\n\n[WHATSAPP_BTN]`;
  }
  if (/emi|monthly payment|instalment|calculate|how much pay/.test(msg)) {
    return `📊 **EMI Reference Guide**\n\n| Loan | Rate | Tenure | EMI |\n|------|------|--------|-----|\n| ₹5L | 12% | 3 yrs | ~₹16,607 |\n| ₹10L | 12% | 5 yrs | ~₹22,244 |\n| ₹20L | 10.5% | 5 yrs | ~₹43,041 |\n| ₹50L | 8.5% | 20 yrs | ~₹43,391 |\n| ₹1Cr | 9% | 20 yrs | ~₹89,973 |\n\nShare your loan amount, tenure & loan type for a precise estimate!\n\n[WHATSAPP_BTN]`;
  }
  if (/document|papers|required documents|kyc/.test(msg)) {
    return `📋 **Documents Required**\n\n**All Loans (KYC):**\n• ✅ Aadhaar Card & PAN Card\n• ✅ Passport-size photos\n\n**Salaried:**\n• ✅ Last 3 months salary slips\n• ✅ 6 months bank statement\n• ✅ Form 16 / ITR\n\n**Self-Employed:**\n• ✅ ITR with computation (2-3 years)\n• ✅ 12 months bank statement\n• ✅ GST registration & returns\n• ✅ Audited balance sheet & P&L\n\nWhich loan type are you applying for?\n\n[WHATSAPP_BTN]`;
  }
  if (/interest rate|rate of interest|roi|lowest rate/.test(msg)) {
    return `📈 **Interest Rates**\n\n| Loan Type | Rate (p.a.) |\n|-----------|-------------|\n| 🚗 Car Loan | 7.5% – 12% |\n| 🏠 Home Loan | 8.40% – 12% |\n| 🎓 Education | 8.5% – 13% |\n| 🏗️ LAP | 9% – 14% |\n| 🏭 MSME | 9% – 18% |\n| 💼 Personal | 10.5% – 24% |\n| 🏢 Business | 12% – 26% |\n\n💡 Higher CIBIL = Lower rate. We compare 200+ banks for the best deal!\n\n[WHATSAPP_BTN]`;
  }
  if (/contact|call|office|address|visit|location|phone|email|reach/.test(msg)) {
    return `📞 **Contact Speedy Loan Finance Services**\n\n**📱 Phone:** 73500 05590\n**📧 Email:** loanspeedy@gmail.com\n**⏰ Hours:** Mon–Sat, 9:00 AM – 7:00 PM\n\n**📍 Office:**\nOffice No. P-227, 2nd Floor\nMayur Trade Center, Near Chinchwad Railway Station\nChinchwad, Pimpri-Chinchwad, Pune – 411019\n\n**Services:** Walk-in | Phone | Doorstep (Pune region) | WhatsApp\n\n[WHATSAPP_BTN]`;
  }
  if (/andromeda|dsa code|dsa partner|become agent|loan agent/.test(msg)) {
    return `🏦 **Andromeda DSA Network**\n\nWe are an **authorized Andromeda partner** with:\n• DSA codes for 200+ banks pan-India\n• Location-wise tie-ups across Maharashtra\n• Commission on every loan disbursement\n\n**Banks:** HDFC, ICICI, Axis, SBI, Kotak, Bajaj Finance, Tata Capital + 180 more\n\nCall **73500 05590** for DSA code details.\n\n[WHATSAPP_BTN]`;
  }
  if (/thank|thanks|thank you|great|helpful/.test(msg)) {
    return `😊 You're very welcome! Happy to help.\n\n**Ready to Apply?** Call **73500 05590** or connect on WhatsApp — our team will guide you through every step!\n\nAnything else I can help with? 🙏\n\n[WHATSAPP_BTN]`;
  }

  return `💰 **Speedy Loan Finance Services**\n\nI can help you with:\n• 💼 Personal Loans | 🏠 Home Loans | 🏢 Business Loans\n• 🚗 Car Loans | 🎓 Education Loans | 🏗️ Loan Against Property\n• 📊 EMI Calculator | ✅ Eligibility Check\n\n📞 **73500 05590** | 📧 loanspeedy@gmail.com\n📍 Chinchwad, Pune | ⏰ Mon–Sat, 9AM–7PM\n\nAsk me about any specific loan type!\n\n[WHATSAPP_BTN]`;
}

/* ─── Typing Indicator ──────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm p-1">
        <img src="/logo.png" alt="Speedy Loan Logo" className="w-full h-full object-contain" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-blue-400" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Chatbot Component ────────────────────────────── */
export default function LoanChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "👋 Hi! I'm **Redneck Ai**, your AI loan assistant for Speedy Loan Finance Services.\n\nI can help you with personal loans, home loans, business loans, eligibility checks, EMI calculations, and more!\n\nWhat can I help you with today?\n\n[WHATSAPP_BTN]",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  // Lazily initialise Gemini chat — only when key is available
  const chatRef = useRef<ReturnType<ReturnType<GoogleGenerativeAI["getGenerativeModel"]>["startChat"]> | null>(null);

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!hasOpened) {
      const timer = setTimeout(() => setUnreadCount(1), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasOpened]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
    setUnreadCount(0);
  };

  /* ─── Send message using Gemini SDK directly (client-side) ─ */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        text: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setShowQuickReplies(false);

      let reply = "";

      try {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

        if (apiKey && apiKey.length > 20) {
          // ── Try Gemini SDK directly from browser ────────────────
          if (!chatRef.current) {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
              model: "gemini-1.5-flash",
              systemInstruction: SYSTEM_PROMPT,
            });
            chatRef.current = model.startChat({
              generationConfig: {
                temperature: 0.65,
                maxOutputTokens: 600,
              },
            });
          }

          const result = await chatRef.current.sendMessage(text.trim());
          const rawReply = result.response.text();
          if (rawReply) {
            reply = rawReply.includes("[WHATSAPP_BTN]")
              ? rawReply
              : `${rawReply}\n\n[WHATSAPP_BTN]`;
          } else {
            reply = getFallbackResponse(text);
          }
        } else {
          // No API key — use fallback
          reply = getFallbackResponse(text);
        }
      } catch (err) {
        console.warn("Gemini error, using fallback:", err);
        // On any Gemini error reset the chat session so next message starts fresh
        chatRef.current = null;
        reply = getFallbackResponse(text);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: reply,
          timestamp: new Date(),
        },
      ]);

      if (!isOpen) setUnreadCount((n) => n + 1);
      setIsLoading(false);
    },
    [isLoading, isOpen]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    chatRef.current = null; // reset Gemini session
    setMessages([
      {
        id: "welcome",
        role: "bot",
        text: "👋 Hi! I'm **Redneck Ai**, your AI loan assistant for Speedy Loan Finance Services.\n\nI can help you with personal loans, home loans, business loans, eligibility checks, EMI calculations, and more!\n\nWhat can I help you with today?\n\n[WHATSAPP_BTN]",
        timestamp: new Date(),
      },
    ]);
    setShowQuickReplies(true);
  };

  return (
    <>
      {/* ─── Floating Buttons ─────────────────────────────────── */}
      <div
        className="fixed right-6 z-[9999] flex flex-col items-end -translate-y-1/2"
        style={{ top: "75%", gap: "40px" }}
      >
        {/* Tooltip bubble */}
        {!isOpen && !hasOpened && (
          <div className="text-sm px-4 py-2 rounded-2xl shadow-xl max-w-[200px] text-center relative bg-slate-900 text-white border border-slate-700/50">
            💬 Ask about loans!
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          aria-label="Open loan chat assistant"
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: isOpen
              ? "#374151"
              : "linear-gradient(135deg, #0B1D3E 0%, #1a3a6e 100%)",
            boxShadow: isOpen ? "" : "0 8px 32px rgba(11,29,62,0.4), 0 0 0 3px rgba(245,166,35,0.15)",
            transform: isOpen ? "scale(0.9)" : undefined,
          }}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 drop-shadow-xl" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="2" r="1.5" fill="#F5A623" />
              <path d="M2 11H4V15H2V11Z" fill="#F5A623" />
              <path d="M20 11H22V15H20V11Z" fill="#F5A623" />
              <rect x="4" y="6" width="16" height="13" rx="4" fill="url(#robotGlass)" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="11" r="2" fill="#cccccc" className="animate-pulse" style={{ animationDuration: "2s" }} />
              <circle cx="15" cy="11" r="2" fill="#cccccc" className="animate-pulse" style={{ animationDuration: "2s" }} />
              <path d="M9 15.5C9 15.5 10.5 17 12 17C13.5 17 15 15.5 15 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="robotGlass" x1="4" y1="6" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full opacity-30 animate-ping bg-orange-700" />
          )}
        </button>

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/917350005590?text=Hello%20Speedy%20Loan%20Finance%20Services,%0A%0AI%20would%20like%20to%20enquire%20about%20a%20loan.%0A%0A•%20Type%20of%20Loan:%20__________%0A•%20Loan%20Amount:%20__________%0A•%20City:%20__________%0A•%20Employment%20Type:%20Salaried%20/%20Self-Employed%0A%0APlease%20assist%20me%20with%20the%20next%20steps.%0A%0AThank%20you."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-[#25D366] to-[#128C7E]"
          style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.3), 0 0 0 3px rgba(37,211,102,0.1)" }}
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.546 1.875 14.07 .843 11.435.841 5.996.841 1.572 5.261 1.568 10.7c-.001 1.708.452 3.376 1.312 4.86l-.995 3.633 3.762-.986zM17.487 14.39c-.3-.15-1.774-.875-2.046-.975-.273-.1-.472-.15-.672.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.205-1.075-1.73-2.146-1.92-2.436-.19-.3-.02-.45.13-.6.13-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.62-1.046-2.52-.363-.878-.73-.76-.975-.76-.2-.01-.43-.01-.67-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.28 3.48 1.46 3.71.18.23 2.52 3.85 6.1 5.39.85.37 1.52.59 2.03.76.86.27 1.64.23 2.26.14.69-.1 2.04-.83 2.33-1.63.29-.8.29-1.49.2-1.63-.09-.13-.29-.21-.59-.36z" /></svg>
          <span className="absolute inset-0 rounded-full opacity-35 animate-ping bg-green-400" />
        </a>
      </div>

      {/* ─── Chat Window ─────────────────────────────────────── */}
      <div
        ref={chatWindowRef}
        className={`fixed z-[9998] flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-90 pointer-events-none"
          }`}
        style={{
          right: "80px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "min(418px, calc(100vw - 100px))",
          height: "min(560px, calc(100vh - 80px))",
          maxHeight: "calc(100vh - 40px)",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.25)",
          border: "1px solid rgba(226, 232, 240, 0.15)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-3.5 flex items-center gap-3.5 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)" }}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white/20">
            <img src="/logo.png" alt="Speedy Loan Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight text-white tracking-wide">Redneck Ai</p>
            <p className="text-[11px] text-blue-200/90 truncate font-medium">Speedy Loan Finance Services</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-white/10 px-2 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-[10px] font-semibold tracking-wide uppercase">Active</span>
          </div>
          <button
            onClick={clearChat}
            title="Clear chat"
            className="ml-1 transition-colors p-1.5 rounded text-blue-200/60 hover:text-white hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 6V4h10v2M5 6l1 14h12L19 6" />
            </svg>
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-4 py-2 flex-shrink-0 bg-blue-50/60 dark:bg-slate-900/60 border-b border-blue-100/40 dark:border-slate-800/40">
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <span>🏦</span> Ask me anything about loans, eligibility, EMIs &amp; more
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm p-1">
                  <img src="/logo.png" alt="Speedy Loan Logo" className="w-full h-full object-contain" />
                </div>
              )}
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === "user"
                  ? "rounded-br-sm bg-gradient-to-br from-blue-600 to-indigo-650 text-white shadow-blue-500/10"
                  : "rounded-bl-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800/80"
                  }`}
              >
                <div className={msg.role === "user" ? "text-white [&_strong]:text-white font-medium" : "text-slate-800 dark:text-slate-100 [&_strong]:text-slate-900 dark:[&_strong]:text-white font-normal"}>
                  {formatText(msg.text)}
                </div>
                <p className={`text-[10px] mt-1.5 font-medium tracking-wide ${msg.role === "user" ? "text-blue-200/90 text-right" : "text-slate-400 dark:text-slate-500 text-left"}`}>
                  {msg.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && <TypingIndicator />}

          {showQuickReplies && !isLoading && messages.length === 1 && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 pl-10">Quick questions:</p>
              <div className="flex flex-wrap gap-2 pl-10">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.text)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about loans..."
              disabled={isLoading}
              maxLength={500}
              className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none transition-all disabled:opacity-50 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 shadow-md disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </form>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            AI may be inaccurate. Call{" "}
            <a href="tel:+917350005590" className="underline text-blue-600 dark:text-blue-400">73500 05590</a>
            {" "}to confirm.
          </p>
        </div>
      </div>
    </>
  );
}
