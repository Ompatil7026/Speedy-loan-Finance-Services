"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────────── */
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

/* ─── Quick Reply Chips ─────────────────────────────────── */
const QUICK_REPLIES = [
  { label: "💼 Personal Loan", text: "Tell me about personal loan eligibility and rates" },
  { label: "🏠 Home Loan", text: "What are home loan interest rates and process?" },
  { label: "🏢 Business Loan", text: "I need a business loan for expansion" },
  { label: "📊 Check Eligibility", text: "How do I check my loan eligibility?" },
  { label: "📋 Documents Required", text: "What documents are required for a loan?" },
  { label: "📞 Contact Us", text: "How can I contact Speedy Loan Finance?" },
];

/* ─── Markdown-like formatter (bold, newlines, buttons) ──────────── */
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
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.546 1.875 14.07 .843 11.435.841 5.996.841 1.572 5.261 1.568 10.7c-.001 1.708.452 3.376 1.312 4.86l-.995 3.633 3.762-.986zM17.487 14.39c-.3-.15-1.774-.875-2.046-.975-.273-.1-.472-.15-.672.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.205-1.075-1.73-2.146-1.92-2.436-.19-.3-.02-.45.13-.6.13-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.62-1.046-2.52-.363-.878-.73-.76-.975-.76-.2-.01-.43-.01-.67-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.28 3.48 1.46 3.71.18.23 2.52 3.85 6.1 5.39.85.37 1.52.59 2.03.76.86.27 1.64.23 2.26.14.69-.1 2.04-.83 2.33-1.63.29-.8.29-1.49.2-1.63-.09-.13-.29-.21-.59-.36z" /></svg>
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

/* ─── Typing Indicator ──────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      {/* Redneck Ai Avatar */}
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

  const buildHistory = useCallback((): GeminiMessage[] => {
    return messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));
  }, [messages]);

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

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            history: buildHistory(),
          }),
        });

        const data = await res.json();

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          text: data.reply || "I couldn't process that. Please try again.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        if (!isOpen) setUnreadCount((n) => n + 1);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "bot",
            text: "Sorry, something went wrong. Please call us at **73500 05590**.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, buildHistory, isOpen]
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
      {/* ─── Floating Buttons — stacked vertically */}
      <div
        className="fixed right-6 z-[9999] flex flex-col items-end -translate-y-1/2"
        style={{ top: "75%", gap: "40px" }}
      >
        {/* Tooltip bubble */}
        {!isOpen && !hasOpened && (
          <div
            className="text-sm px-4 py-2 rounded-2xl shadow-xl max-w-[200px] text-center relative bg-slate-900 text-white border border-slate-700/50"
          >
            💬 Ask about loans!
          </div>
        )}

        {/* Main FAB — custom button styling with brand logo symbol */}
        <button
          onClick={isOpen ? () => setIsOpen(false) : handleOpen}
          aria-label="Open loan chat assistant"
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-white border border-slate-200/50 dark:border-slate-800/50"
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
            <svg className="w-8 h-8 drop-shadow-xl transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="2" r="1.5" fill="#F5A623" />
              <path d="M2 11H4V15H2V11Z" fill="#F5A623" />
              <path d="M20 11H22V15H20V11Z" fill="#F5A623" />
              <rect x="4" y="6" width="16" height="13" rx="4" fill="url(#robotGlass)" stroke="white" strokeWidth="1.5" />
              <circle cx="9" cy="11" r="2" fill="#cccccc" className="animate-pulse" style={{ animationDuration: '2s' }} />
              <circle cx="15" cy="11" r="2" fill="#cccccc" className="animate-pulse" style={{ animationDuration: '2s' }} />
              <path d="M9 15.5C9 15.5 10.5 17 12 17C13.5 17 15 15.5 15 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="robotGlass" x1="4" y1="6" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {/* Unread badge */}
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}

          {/* Orange ripple ring */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full opacity-30 animate-ping bg-orange-700"
            />
          )}
        </button>

        {/* WhatsApp FAB — exactly matching the user's reference image */}
        <a
          href="https://wa.me/917350005590?text=Hello%20Speedy%20Loan%20Finance%20Services,%0A%0AI%20would%20like%20to%20enquire%20about%20a%20loan.%0A%0A•%20Type%20of%20Loan:%20__________%0A•%20Loan%20Amount:%20__________%0A•%20City:%20__________%0A•%20Employment%20Type:%20Salaried%20/%20Self-Employed%0A%0APlease%20assist%20me%20with%20the%20next%20steps.%0A%0AThank%20you."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-[#25D366] to-[#128C7E] border border-green-500/20"
          style={{
            boxShadow: "0 8px 32px rgba(37,211,102,0.3), 0 0 0 3px rgba(37,211,102,0.1)",
          }}
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.546 1.875 14.07 .843 11.435.841 5.996.841 1.572 5.261 1.568 10.7c-.001 1.708.452 3.376 1.312 4.86l-.995 3.633 3.762-.986zM17.487 14.39c-.3-.15-1.774-.875-2.046-.975-.273-.1-.472-.15-.672.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.205-1.075-1.73-2.146-1.92-2.436-.19-.3-.02-.45.13-.6.13-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.672-1.62-1.046-2.52-.363-.878-.73-.76-.975-.76-.2-.01-.43-.01-.67-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 .01 1.77 1.28 3.48 1.46 3.71.18.23 2.52 3.85 6.1 5.39.85.37 1.52.59 2.03.76.86.27 1.64.23 2.26.14.69-.1 2.04-.83 2.33-1.63.29-.8.29-1.49.2-1.63-.09-.13-.29-.21-.59-.36z" />
          </svg>

          {/* Green ripple ring */}
          <span
            className="absolute inset-0 rounded-full opacity-35 animate-ping bg-green-400"
          />
        </a>
      </div>

      {/* ─── Chat Window (Centered vertically, opening to the left of the FABs) ─── */}
      <div
        ref={chatWindowRef}
        className={`fixed z-[9998] max-w-[calc(100vw-6rem)] flex flex-col rounded-2xl overflow-hidden transition-all duration-300 origin-right -translate-y-1/2 ${isOpen
          ? "opacity-100 scale-100 pointer-events-auto w-[418px]"
          : "opacity-0 scale-90 pointer-events-none w-[380px]"
          }`}
        style={{
          right: "90px",
          top: "50%",
          height: "540px",
          maxHeight: "calc(100vh - 40px)",
          boxShadow: "0 20px 50px rgba(15, 23, 42, 0.25)",
          border: "1px solid rgba(226, 232, 240, 0.15)",
        }}
      >

        {/* ── Header: Premium Blue/Navy glassmorphism style ─────────────── */}
        <div
          className="px-4 py-3.5 flex items-center gap-3.5 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)" }}
        >
          {/* Speedy Loan Logo Ring */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 -mt-0.5 shadow-lg border-2 border-white/20">
            <img src="/logo.png" alt="Speedy Loan Logo" className="w-full h-full object-contain p-1" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight text-white tracking-wide">
              Redneck Ai
            </p>
            <p className="text-[11px] text-blue-200/90 truncate font-medium">
              Speedy Loan Finance Services
            </p>
          </div>

          {/* Online status */}
          <div className="flex items-center gap-1.5 flex-shrink-0 bg-white/10 px-2 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-[10px] font-semibold tracking-wide uppercase">Active</span>
          </div>

          {/* Clear button */}
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

        {/* ── Sub-header ─────────────────────────────────────── */}
        <div
          className="px-4 py-2 flex-shrink-0 bg-blue-50/60 dark:bg-slate-900/60 border-b border-blue-100/40 dark:border-slate-800/40"
        >
          <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <span>🏦</span> Ask me anything about loans, eligibility, EMIs &amp; more
          </p>
        </div>

        {/* ── Messages Area ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
            >
              {/* Bot logo avatar */}
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm p-1">
                  <img src="/logo.png" alt="Speedy Loan Logo" className="w-full h-full object-contain" />
                </div>
              )}

              {/* Bubble */}
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === "user"
                  ? "rounded-br-sm bg-gradient-to-br from-blue-600 to-indigo-650 text-white shadow-blue-500/10"
                  : "rounded-bl-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800/80 shadow-slate-100 dark:shadow-none"
                  }`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "text-white [&_strong]:text-white font-medium"
                      : "text-slate-800 dark:text-slate-100 [&_strong]:text-slate-900 dark:[&_strong]:text-white font-normal"
                  }
                >
                  {formatText(msg.text)}
                </div>
                <p
                  className={`text-[10px] mt-1.5 font-medium tracking-wide ${msg.role === "user" ? "text-blue-200/90 text-right" : "text-slate-400 dark:text-slate-500 text-left"
                    }`}
                >
                  {msg.timestamp.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && <TypingIndicator />}

          {/* Quick Replies */}
          {showQuickReplies && !isLoading && messages.length === 1 && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 pl-10">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-2 pl-10">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.text)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/30"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Area ──────────────────────────────────────── */}
        <div
          className="p-3 flex-shrink-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
        >
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
            {/* Blue send button */}
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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            AI may be inaccurate. Call{" "}
            <a href="tel:+917350005590" className="underline text-blue-600 dark:text-blue-400">
              73500 05590
            </a>
            {" "}to confirm.
          </p>
        </div>
      </div>
    </>
  );
}
