"use client";
import { useState } from "react";

type Answers = Record<string, string | string[]>;

interface Step {
  id: string;
  title: string;
  subtitle?: string;
  type: "cards" | "pills" | "input" | "success";
  multi?: boolean;
  options?: { value: string; label: string; sub?: string; icon?: string }[];
  showIf?: (a: Answers) => boolean;
}

const STEPS: Step[] = [
  {
    id: "situation",
    title: "What best describes your situation?",
    subtitle: "This helps us personalize your experience.",
    type: "cards",
    multi: false,
    options: [
      { value: "widow", label: "Widow / Widower", sub: "Settling a spouse's estate", icon: "🕊" },
      { value: "executor", label: "Estate Executor", sub: "Managing an estate collection", icon: "📋" },
      { value: "divorce", label: "Divorce Settlement", sub: "Dividing or liquidating assets", icon: "⚖" },
      { value: "inherited", label: "Inherited Jewelry", sub: "Pieces passed down to me", icon: "💎" },
      { value: "downsizing", label: "Downsizing", sub: "Simplifying & freeing up value", icon: "🏠" },
      { value: "collection", label: "Selling a Collection", sub: "Multiple pieces to sell", icon: "✦" },
    ],
  },
  {
    id: "category",
    title: "What would you like to sell?",
    subtitle: "Select all categories that apply.",
    type: "cards",
    multi: true,
    options: [
      { value: "diamonds", label: "Diamond Jewelry", sub: "Rings, earrings, pendants", icon: "◆" },
      { value: "gold", label: "Gold & Platinum", sub: "Any karat, any condition", icon: "⬡" },
      { value: "watches", label: "Luxury Watches", sub: "Rolex, Patek, Cartier…", icon: "◎" },
      { value: "designer", label: "Designer Jewelry", sub: "Cartier, Tiffany, Van Cleef…", icon: "✦" },
      { value: "antique", label: "Antique & Vintage", sub: "Art Deco, Victorian, Edwardian", icon: "❖" },
      { value: "estate", label: "Full Estate Collection", sub: "Multiple pieces or entire estate", icon: "⬢" },
    ],
  },
  {
    id: "diamonds_detail",
    title: "Diamond size range?",
    subtitle: "Helps us prepare a more accurate offer.",
    type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("diamonds"),
    options: [
      { value: "u1", label: "Under 1 ct" }, { value: "1_2", label: "1–2 cts" },
      { value: "2_5", label: "2–5 cts" }, { value: "5p", label: "5+ cts" },
      { value: "multi", label: "Multiple" }, { value: "ns", label: "Not sure" },
    ],
  },
  {
    id: "watches_detail",
    title: "Watch brand(s)?",
    subtitle: "Designer brands command premium prices.",
    type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("watches"),
    options: [
      { value: "rolex", label: "Rolex" }, { value: "patek", label: "Patek Philippe" },
      { value: "cartier", label: "Cartier" }, { value: "ap", label: "Audemars Piguet" },
      { value: "iwc", label: "IWC" }, { value: "other", label: "Other brand" },
    ],
  },
  {
    id: "timeline",
    title: "How soon are you looking to sell?",
    subtitle: "We offer same-day evaluations.",
    type: "cards",
    multi: false,
    options: [
      { value: "asap", label: "As Soon As Possible", sub: "I need to sell quickly", icon: "⚡" },
      { value: "1_3m", label: "Within 1–3 Months", sub: "Planning ahead", icon: "◷" },
      { value: "exp", label: "Just Exploring", sub: "Want to understand value", icon: "◉" },
    ],
  },
  {
    id: "value",
    title: "Approximate total value?",
    subtitle: "Rough estimate — no pressure.",
    type: "cards",
    multi: false,
    options: [
      { value: "u2500", label: "Under $2,500", icon: "◇" },
      { value: "2500_10k", label: "$2,500 – $10,000", icon: "◈" },
      { value: "10_50k", label: "$10,000 – $50,000", icon: "◆" },
      { value: "50kp", label: "$50,000+", sub: "Eligible for house call", icon: "❋" },
      { value: "ns", label: "Not Sure", sub: "That's what we're here for", icon: "?" },
    ],
  },
  { id: "contact", title: "Where should we send your offer?", subtitle: "We'll reach out within 1 business hour.", type: "input" },
  { id: "success", title: "", type: "success" },
];

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

export default function SellWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ category: [] });
  const [contact, setContact] = useState<Record<string, string>>({});
  const [animKey, setAnimKey] = useState(0);

  const visible = STEPS.filter((s) => !s.showIf || s.showIf(answers));
  const current = visible[stepIndex];
  const total = visible.length;
  const pct = Math.max((stepIndex / (total - 2)) * 100, 4);

  function next() { setAnimKey((k) => k + 1); setStepIndex((i) => Math.min(i + 1, total - 1)); }
  function prev() { setAnimKey((k) => k + 1); setStepIndex((i) => Math.max(i - 1, 0)); }

  function handleCard(val: string) {
    if (current.multi) {
      const arr = toggle((answers.category as string[]) || [], val);
      setAnswers((a) => ({ ...a, category: arr }));
    } else {
      setAnswers((a) => ({ ...a, [current.id]: val }));
      setTimeout(next, 280);
    }
  }

  function handlePill(val: string) {
    const arr = toggle((answers[current.id] as string[]) || [], val);
    setAnswers((a) => ({ ...a, [current.id]: arr }));
  }

  function canNext() {
    if (current.id === "category") return ((answers.category as string[]) || []).length > 0;
    if (current.type === "input") return !!(contact.firstName && contact.lastName && contact.email && contact.phone);
    return true;
  }

  const showContinue = current.multi || current.type === "pills";

  return (
    <section id="sell" className="bg-[#111] py-28 border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left copy */}
        <div className="lg:sticky lg:top-28">
          <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-5" style={{ fontFamily: "'Montserrat', sans-serif" }}>Free Jewelry Evaluation</span>
          <h2 className="text-[clamp(28px,3.5vw,50px)] font-black uppercase leading-[1.05] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get Your <em className="not-italic text-[#C9A84C]">Free Offer</em><br />Today
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mb-8" />
          <p className="text-[13px] font-light text-white/45 leading-relaxed mb-10 max-w-sm" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Answer a few quick questions and we'll prepare a tailored offer. Free, zero obligation, 100% confidential.
          </p>
          {["Same-day offer — no waiting", "Immediate payment upon acceptance", "GIA-certified evaluation included", "Confidential & secure process", "House calls for large estates"].map((b) => (
            <div key={b} className="flex items-center gap-3 mb-4">
              <span className="text-[#C9A84C] text-xs">◆</span>
              <span className="text-[12px] font-light text-white/55" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b}</span>
            </div>
          ))}
          <div className="mt-10 p-5 border border-[#C9A84C]/20 bg-[#C9A84C]/3">
            <p className="text-[18px] font-light italic text-[#C9A84C] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>"We paid top dollar and the process was effortless."</p>
            <p className="text-[11px] text-white/35 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>— Verified Client, Estate Sale, Miami FL</p>
          </div>
          <div className="mt-8 pt-8 border-t border-[#C9A84C]/15 space-y-3">
            <a href="tel:3053505059" className="flex items-center gap-3 text-[13px] text-white hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span className="text-[#C9A84C]">📞</span> 305-350-5059
            </a>
            <p className="text-[12px] text-white/35 flex items-center gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <span className="text-[#C9A84C]">📍</span> 36 NE 1st St. Suite 136, Miami, FL 33132
            </p>
          </div>
        </div>

        {/* Right wizard */}
        <div>
          <div className="bg-[#0D0D0D] border-t-[3px] border-[#C9A84C]">
            {current.type !== "success" && (
              <div className="border-b border-[#C9A84C]/10">
                <div className="flex items-center justify-between px-8 pt-6 pb-4">
                  <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C]" style={{ fontFamily: "'Montserrat', sans-serif" }}>Step {stepIndex + 1} of {total - 1}</span>
                  <span className="text-[10px] text-white/30" style={{ fontFamily: "'Montserrat', sans-serif" }}>Free Evaluation</span>
                </div>
                <div className="h-[2px] bg-[#1A1A1A] mx-8 mb-0">
                  <div className="h-full bg-[#C9A84C] transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            <div key={animKey} className="p-8 md:p-10">
              {current.type === "success" ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><polyline points="5,14 11,20 23,8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="text-[clamp(26px,3vw,38px)] font-black uppercase text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Request <span className="text-[#C9A84C]">Received!</span></h3>
                  <p className="text-[13px] font-light text-white/45 leading-relaxed max-w-sm mx-auto mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    Our estate jewelry specialist will contact you within 1 business hour to confirm your appointment.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[{ icon: "◆", label: "Expert evaluation prepared" }, { icon: "⚡", label: "Confirmed within 1 hour" }, { icon: "🔒", label: "100% confidential" }].map((b) => (
                      <div key={b.label} className="p-4 border border-[#C9A84C]/15 text-center">
                        <span className="text-[#C9A84C] text-lg block mb-2">{b.icon}</span>
                        <span className="text-[11px] font-light text-white/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{current.title}</h3>
                  {current.subtitle && <p className="text-[12px] font-light text-white/40 mb-7 leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>{current.subtitle}</p>}

                  {current.type === "cards" && (
                    <div className={`grid gap-2 ${(current.options?.length ?? 0) <= 3 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {current.options!.map((opt) => {
                        const sel = current.multi
                          ? (answers.category as string[])?.includes(opt.value)
                          : answers[current.id] === opt.value;
                        return (
                          <button key={opt.value} onClick={() => handleCard(opt.value)}
                            className={`flex items-center gap-3 p-4 border text-left transition-all duration-200 ${sel ? "border-[#C9A84C] bg-[#C9A84C]/8" : "border-white/8 hover:border-[#C9A84C]/40 hover:bg-white/2"}`}>
                            <span className={`text-xl flex-shrink-0 ${sel ? "text-[#C9A84C]" : "text-white/20"}`}>{opt.icon}</span>
                            <div className="min-w-0">
                              <span className={`block text-[15px] font-bold ${sel ? "text-white" : "text-white/60"}`} style={{ fontFamily: "'Playfair Display', serif" }}>{opt.label}</span>
                              {opt.sub && <span className="block text-[11px] font-light text-white/30 mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>{opt.sub}</span>}
                            </div>
                            {sel && <span className="ml-auto w-4 h-4 bg-[#C9A84C] flex items-center justify-center flex-shrink-0"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "pills" && (
                    <div className="flex flex-wrap gap-2">
                      {current.options!.map((opt) => {
                        const sel = ((answers[current.id] as string[]) || []).includes(opt.value);
                        return (
                          <button key={opt.value} onClick={() => handlePill(opt.value)}
                            className={`px-5 py-3 border text-[12px] font-light transition-all duration-200 ${sel ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/8" : "border-white/10 text-white/50 hover:border-[#C9A84C]/40"}`}
                            style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "input" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[{ k: "firstName", l: "First Name", p: "Jane", t: "text" }, { k: "lastName", l: "Last Name", p: "Smith", t: "text" }].map(({ k, l, p, t }) => (
                          <div key={k}>
                            <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l} *</label>
                            <input type={t} placeholder={p} value={contact[k] || ""} onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                              className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all placeholder:text-white/20" style={{ fontFamily: "'Montserrat', sans-serif" }} />
                          </div>
                        ))}
                      </div>
                      {[{ k: "email", l: "Email Address", p: "jane@email.com", t: "email" }, { k: "phone", l: "Phone Number", p: "+1 (305) 000-0000", t: "tel" }].map(({ k, l, p, t }) => (
                        <div key={k}>
                          <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>{l} *</label>
                          <input type={t} placeholder={p} value={contact[k] || ""} onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                            className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all placeholder:text-white/20" style={{ fontFamily: "'Montserrat', sans-serif" }} />
                        </div>
                      ))}
                      <div>
                        <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Preferred Appointment Type</label>
                        <select value={contact.appt || ""} onChange={(e) => setContact((c) => ({ ...c, appt: e.target.value }))}
                          className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] text-white/60 text-[13px] font-light px-4 py-3 outline-none appearance-none" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          <option value="">Select…</option>
                          <option>In-person at our gallery</option>
                          <option>Phone / Video consultation</option>
                          <option>House call (large collections)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    {stepIndex > 0 ? (
                      <button onClick={prev} className="text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors" style={{ fontFamily: "'Montserrat', sans-serif" }}>← Back</button>
                    ) : <div />}
                    {current.type === "input" ? (
                      <button onClick={next} disabled={!canNext()} className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#D4AF5A] disabled:opacity-30 disabled:cursor-not-allowed transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Submit &amp; Get My Offer →
                      </button>
                    ) : showContinue ? (
                      <button onClick={next} disabled={!canNext()} className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#D4AF5A] disabled:opacity-30 disabled:cursor-not-allowed transition-all" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Continue →
                      </button>
                    ) : <div />}
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
