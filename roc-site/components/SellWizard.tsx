"use client";
import { useState } from "react";

/* ── Types ── */
type Answers = Record<string, string | string[]>;

interface Step {
  id: string;
  title: string;
  subtitle?: string;
  type: "cards" | "pills" | "input" | "success";
  options?: { value: string; label: string; sub?: string; icon?: string }[];
  fields?: { name: string; label: string; type: string; placeholder: string; required?: boolean }[];
  showIf?: (a: Answers) => boolean;
}

/* ── Steps definition ── */
const STEPS: Step[] = [
  {
    id: "category",
    title: "What would you like to sell?",
    subtitle: "Select all categories that apply — we buy everything.",
    type: "cards",
    options: [
      { value: "diamonds", label: "Diamond Jewelry", sub: "Rings, earrings, pendants", icon: "◆" },
      { value: "gold", label: "Gold & Platinum", sub: "Any karat, any condition", icon: "⬡" },
      { value: "watches", label: "Luxury Watches", sub: "Rolex, Patek, Cartier…", icon: "◎" },
      { value: "designer", label: "Designer Jewelry", sub: "Cartier, Tiffany, Van Cleef…", icon: "✦" },
      { value: "antique", label: "Antique & Vintage", sub: "Art Deco, Victorian, Edwardian", icon: "❖" },
      { value: "estate", label: "Full Estate Collection", sub: "Multiple pieces or an entire estate", icon: "⬢" },
    ],
  },
  {
    id: "diamonds_detail",
    title: "Tell us about your diamonds",
    subtitle: "This helps us prepare the most accurate offer before your appointment.",
    type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("diamonds"),
    options: [
      { value: "under_1ct", label: "Under 1 carat" },
      { value: "1_2ct", label: "1 – 2 carats" },
      { value: "2_5ct", label: "2 – 5 carats" },
      { value: "over_5ct", label: "5+ carats" },
      { value: "multiple", label: "Multiple pieces" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "watches_detail",
    title: "Which watch brand(s) do you have?",
    subtitle: "Designer brands command premium market prices.",
    type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("watches"),
    options: [
      { value: "rolex", label: "Rolex" },
      { value: "patek", label: "Patek Philippe" },
      { value: "cartier_w", label: "Cartier" },
      { value: "ap", label: "Audemars Piguet" },
      { value: "iwc", label: "IWC" },
      { value: "other_watch", label: "Other luxury brand" },
    ],
  },
  {
    id: "timeline",
    title: "How soon are you looking to sell?",
    subtitle: "We offer same-day evaluations and same-day payment.",
    type: "cards",
    options: [
      { value: "asap", label: "As Soon As Possible", sub: "I need to sell quickly", icon: "⚡" },
      { value: "1_3months", label: "Within 1–3 Months", sub: "I'm planning ahead", icon: "◷" },
      { value: "exploring", label: "Just Exploring Options", sub: "No rush — I want to understand value", icon: "◉" },
    ],
  },
  {
    id: "value",
    title: "Approximate total value?",
    subtitle: "A rough estimate helps us prepare and offer house calls for larger collections.",
    type: "cards",
    options: [
      { value: "under_2500", label: "Under $2,500", icon: "◇" },
      { value: "2500_10k", label: "$2,500 – $10,000", icon: "◈" },
      { value: "10k_50k", label: "$10,000 – $50,000", icon: "◆" },
      { value: "over_50k", label: "$50,000+", sub: "Eligible for house call", icon: "❋" },
      { value: "unknown", label: "I'm Not Sure", sub: "That's what we're here for", icon: "?" },
    ],
  },
  {
    id: "contact",
    title: "Where should we send your offer?",
    subtitle: "We'll reach out within 1 business hour to confirm your appointment.",
    type: "input",
    fields: [
      { name: "firstName", label: "First Name", type: "text", placeholder: "Jane", required: true },
      { name: "lastName", label: "Last Name", type: "text", placeholder: "Smith", required: true },
      { name: "email", label: "Email Address", type: "email", placeholder: "jane@email.com", required: true },
      { name: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000", required: true },
      {
        name: "apptType",
        label: "Preferred Appointment Type",
        type: "select",
        placeholder: "In-person at our gallery",
        required: false,
      },
    ],
  },
  {
    id: "success",
    title: "You're All Set!",
    type: "success",
  },
];

const APPT_OPTIONS = [
  "In-person at our gallery",
  "Phone / Video consultation",
  "House call (for large collections)",
];

/* ── Helper ── */
function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function SellWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ category: [] });
  const [contact, setContact] = useState<Record<string, string>>({});
  const [animKey, setAnimKey] = useState(0);

  /* Filter visible steps */
  const visibleSteps = STEPS.filter((s) => !s.showIf || s.showIf(answers));
  const current = visibleSteps[stepIndex];
  const total = visibleSteps.length;
  const progress = ((stepIndex) / (total - 2)) * 100; // exclude success

  function nextStep() {
    setAnimKey((k) => k + 1);
    setStepIndex((i) => Math.min(i + 1, total - 1));
  }
  function prevStep() {
    setAnimKey((k) => k + 1);
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function handleCardSelect(val: string) {
    if (current.id === "category") {
      const arr = toggle(answers.category as string[], val);
      setAnswers((a) => ({ ...a, category: arr }));
    } else {
      setAnswers((a) => ({ ...a, [current.id]: val }));
      setTimeout(nextStep, 300);
    }
  }

  function handlePillToggle(val: string) {
    const arr = toggle((answers[current.id] as string[]) || [], val);
    setAnswers((a) => ({ ...a, [current.id]: arr }));
  }

  function canContinue(): boolean {
    if (current.type === "cards" && current.id === "category") {
      return ((answers.category as string[]) || []).length > 0;
    }
    if (current.type === "pills") return true;
    if (current.type === "input") {
      return !!(contact.firstName && contact.lastName && contact.email && contact.phone);
    }
    return true;
  }

  function handleSubmit() {
    nextStep();
  }

  /* ── Render ── */
  return (
    <section id="sell" className="bg-[#111111] py-28 px-8 md:px-16 border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: copy */}
        <div className="reveal lg:sticky lg:top-28">
          <span
            className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-5"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Free Jewelry Evaluation
          </span>
          <h2
            className="text-[clamp(34px,4vw,58px)] font-light leading-[1.1] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Book Your <em className="italic text-[#E8C97A]">VIP Appointment</em>
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mb-8" />
          <p
            className="text-[13px] font-light text-white/45 leading-relaxed mb-10 max-w-sm"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Answer a few quick questions and we'll prepare a tailored offer before you arrive. 
            Completely free, zero obligation, 100% confidential.
          </p>

          {/* Benefits */}
          {[
            "Same-day offer — no waiting",
            "Immediate payment upon acceptance",
            "GIA-certified evaluation included",
            "Confidential & secure process",
            "House calls for large estates",
          ].map((b) => (
            <div key={b} className="flex items-center gap-3 mb-4">
              <span className="text-[#C9A84C] text-xs">◆</span>
              <span
                className="text-[12px] font-light text-white/55"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {b}
              </span>
            </div>
          ))}

          {/* Trust badge */}
          <div className="mt-10 p-5 border border-[#C9A84C]/20 bg-[#C9A84C]/3">
            <p
              className="text-[18px] font-light italic text-[#E8C97A] mb-1"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              "We paid top dollar and the process was effortless."
            </p>
            <p
              className="text-[11px] text-white/35 font-light"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              — Verified Client, Estate Sale, New York
            </p>
          </div>
        </div>

        {/* Right: wizard */}
        <div className="reveal">
          <div className="bg-[#0D0D0D] border-t-[3px] border-[#C9A84C]">
            {/* Progress */}
            {current.type !== "success" && (
              <div className="border-b border-[#C9A84C]/10">
                <div className="flex items-center justify-between px-8 pt-7 pb-5">
                  <span
                    className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C]"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    Step {stepIndex + 1} of {total - 1}
                  </span>
                  <span
                    className="text-[10px] text-white/30 font-light"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    Free Evaluation
                  </span>
                </div>
                <div className="h-[2px] bg-[#1A1A1A] mx-8 mb-0">
                  <div
                    className="h-full bg-[#C9A84C] transition-all duration-500"
                    style={{ width: `${Math.max(progress, 4)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Step content */}
            <div key={animKey} className="step-enter p-8 md:p-10">
              {current.type === "success" ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <polyline points="5,14 11,20 23,8" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    className="text-[clamp(28px,3vw,40px)] font-light text-white mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Request Received!
                  </h3>
                  <p
                    className="text-[13px] font-light text-white/45 leading-relaxed max-w-sm mx-auto mb-8"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    One of our estate jewelry specialists will contact you within 1 business hour to confirm your appointment and begin preparing your evaluation.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {[
                      { icon: "◆", label: "Expert evaluation prepared" },
                      { icon: "◷", label: "Confirmed within 1 hour" },
                      { icon: "❖", label: "100% confidential" },
                    ].map((b) => (
                      <div key={b.label} className="p-4 border border-[#C9A84C]/15 text-center">
                        <span className="text-[#C9A84C] text-lg block mb-2">{b.icon}</span>
                        <span
                          className="text-[11px] font-light text-white/50"
                          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                        >
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h3
                    className="text-[clamp(22px,2.5vw,30px)] font-light text-white mb-2 leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {current.title}
                  </h3>
                  {current.subtitle && (
                    <p
                      className="text-[12px] font-light text-white/40 mb-8 leading-relaxed"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      {current.subtitle}
                    </p>
                  )}

                  {/* CARDS */}
                  {current.type === "cards" && (
                    <div className={`grid gap-3 ${current.options!.length <= 3 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {current.options!.map((opt) => {
                        const sel =
                          current.id === "category"
                            ? (answers.category as string[])?.includes(opt.value)
                            : answers[current.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleCardSelect(opt.value)}
                            className={`group flex items-center gap-4 p-4 border text-left transition-all duration-200 ${
                              sel
                                ? "border-[#C9A84C] bg-[#C9A84C]/8"
                                : "border-white/8 hover:border-[#C9A84C]/40 hover:bg-white/2"
                            }`}
                          >
                            <span className={`text-xl flex-shrink-0 ${sel ? "text-[#C9A84C]" : "text-white/20 group-hover:text-[#C9A84C]/50"} transition-colors`}>
                              {opt.icon}
                            </span>
                            <div className="min-w-0">
                              <span
                                className={`block text-[14px] font-light ${sel ? "text-white" : "text-white/60"}`}
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px" }}
                              >
                                {opt.label}
                              </span>
                              {opt.sub && (
                                <span
                                  className="block text-[11px] font-light text-white/30 mt-0.5"
                                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                                >
                                  {opt.sub}
                                </span>
                              )}
                            </div>
                            {sel && (
                              <span className="ml-auto flex-shrink-0 w-4 h-4 border border-[#C9A84C] bg-[#C9A84C] flex items-center justify-center">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <polyline points="2,5 4,7 8,3" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* PILLS */}
                  {current.type === "pills" && (
                    <div className="flex flex-wrap gap-3">
                      {current.options!.map((opt) => {
                        const arr = (answers[current.id] as string[]) || [];
                        const sel = arr.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handlePillToggle(opt.value)}
                            className={`px-5 py-3 border text-[12px] font-light transition-all duration-200 ${
                              sel
                                ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/8"
                                : "border-white/10 text-white/50 hover:border-[#C9A84C]/40 hover:text-white/70"
                            }`}
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* INPUT */}
                  {current.type === "input" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                            First Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Jane"
                            value={contact.firstName || ""}
                            onChange={(e) => setContact((c) => ({ ...c, firstName: e.target.value }))}
                            className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] focus:bg-[#C9A84C]/3 text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20"
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                            Last Name *
                          </label>
                          <input
                            type="text"
                            placeholder="Smith"
                            value={contact.lastName || ""}
                            onChange={(e) => setContact((c) => ({ ...c, lastName: e.target.value }))}
                            className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] focus:bg-[#C9A84C]/3 text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20"
                            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="jane@email.com"
                          value={contact.email || ""}
                          onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                          className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] focus:bg-[#C9A84C]/3 text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20"
                          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={contact.phone || ""}
                          onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                          className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] focus:bg-[#C9A84C]/3 text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all duration-200 placeholder:text-white/20"
                          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
                          Preferred Appointment Type
                        </label>
                        <select
                          value={contact.apptType || ""}
                          onChange={(e) => setContact((c) => ({ ...c, apptType: e.target.value }))}
                          className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] text-white/60 text-[13px] font-light px-4 py-3 outline-none transition-all duration-200 appearance-none"
                          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                        >
                          <option value="">Select an option…</option>
                          {APPT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    {stepIndex > 0 ? (
                      <button
                        onClick={prevStep}
                        className="text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        ← Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {current.type === "input" ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!canContinue()}
                        className="text-[11px] font-semibold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#E8C97A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        Submit & Get My Offer →
                      </button>
                    ) : current.type === "cards" && current.id === "category" ? (
                      <button
                        onClick={nextStep}
                        disabled={!canContinue()}
                        className="text-[11px] font-semibold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#E8C97A] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        Continue →
                      </button>
                    ) : current.type === "pills" ? (
                      <button
                        onClick={nextStep}
                        className="text-[11px] font-semibold tracking-[2.5px] uppercase border border-[#C9A84C] text-[#C9A84C] px-8 py-4 hover:bg-[#C9A84C] hover:text-black transition-all duration-300"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        Continue →
                      </button>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
