"use client";
import { useState } from "react";

type Answers = Record<string, string | string[]>;

interface Step {
  id: string; title: string; subtitle?: string;
  type: "cards" | "pills" | "input" | "success";
  multi?: boolean;
  options?: { value: string; label: string; sub?: string; icon?: string }[];
  showIf?: (a: Answers) => boolean;
}

const STEPS: Step[] = [
  { id: "situation", title: "What best describes your situation?", subtitle: "This helps us personalize your experience.", type: "cards", multi: false,
    options: [
      { value: "widow", label: "Widow / Widower", sub: "Settling a spouse's estate", icon: "🕊" },
      { value: "executor", label: "Estate Executor", sub: "Managing an estate collection", icon: "📋" },
      { value: "divorce", label: "Divorce Settlement", sub: "Dividing or liquidating assets", icon: "⚖" },
      { value: "inherited", label: "Inherited Jewelry", sub: "Pieces passed down to me", icon: "💎" },
      { value: "downsizing", label: "Downsizing", sub: "Simplifying & freeing up value", icon: "🏠" },
      { value: "collection", label: "Selling a Collection", sub: "Multiple pieces to sell", icon: "✦" },
    ],
  },
  { id: "category", title: "What would you like to sell?", subtitle: "Select all that apply.", type: "cards", multi: true,
    options: [
      { value: "diamonds", label: "Diamond Jewelry", sub: "Rings, earrings, pendants", icon: "◆" },
      { value: "gold", label: "Gold & Platinum", sub: "Any karat, any condition", icon: "⬡" },
      { value: "watches", label: "Luxury Watches", sub: "Rolex, Patek, Cartier…", icon: "◎" },
      { value: "designer", label: "Designer Jewelry", sub: "Cartier, Tiffany, Van Cleef…", icon: "✦" },
      { value: "antique", label: "Antique & Vintage", sub: "Art Deco, Victorian, Edwardian", icon: "❖" },
      { value: "estate", label: "Full Estate Collection", sub: "Multiple pieces or entire estate", icon: "⬢" },
    ],
  },
  { id: "diamonds_detail", title: "Diamond size range?", subtitle: "Helps us prepare a more accurate offer.", type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("diamonds"),
    options: [{ value: "u1", label: "Under 1 ct" }, { value: "1_2", label: "1–2 cts" }, { value: "2_5", label: "2–5 cts" }, { value: "5p", label: "5+ cts" }, { value: "multi", label: "Multiple" }, { value: "ns", label: "Not sure" }],
  },
  { id: "watches_detail", title: "Watch brand(s)?", subtitle: "Designer brands command premium prices.", type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("watches"),
    options: [{ value: "rolex", label: "Rolex" }, { value: "patek", label: "Patek Philippe" }, { value: "cartier", label: "Cartier" }, { value: "ap", label: "Audemars Piguet" }, { value: "iwc", label: "IWC" }, { value: "other", label: "Other brand" }],
  },
  { id: "timeline", title: "How soon are you looking to sell?", subtitle: "We offer same-day evaluations.", type: "cards", multi: false,
    options: [{ value: "asap", label: "As Soon As Possible", sub: "I need to sell quickly", icon: "⚡" }, { value: "1_3m", label: "Within 1–3 Months", sub: "Planning ahead", icon: "◷" }, { value: "exp", label: "Just Exploring", sub: "Want to understand value", icon: "◉" }],
  },
  { id: "value", title: "Approximate total value?", subtitle: "Rough estimate — no pressure.", type: "cards", multi: false,
    options: [{ value: "u2500", label: "Under $2,500", icon: "◇" }, { value: "2500_10k", label: "$2,500 – $10,000", icon: "◈" }, { value: "10_50k", label: "$10,000 – $50,000", icon: "◆" }, { value: "50kp", label: "$50,000+", sub: "Eligible for house call", icon: "❋" }, { value: "ns", label: "Not Sure", sub: "That's what we're here for", icon: "?" }],
  },
  { id: "contact", title: "Where should we send your offer?", subtitle: "We'll reach out within 1 business hour.", type: "input" },
  { id: "success", title: "", type: "success" },
];

const situationMap: Record<string,string> = { widow:"Widow / Widower", executor:"Estate Executor", divorce:"Divorce Settlement", inherited:"Inherited Jewelry", downsizing:"Downsizing", collection:"Selling a Collection" };
const catMap: Record<string,string> = { diamonds:"Diamond Jewelry", gold:"Gold & Platinum", watches:"Luxury Watches", designer:"Designer Jewelry", antique:"Antique & Vintage", estate:"Full Estate Collection" };
const timelineMap: Record<string,string> = { asap:"As Soon As Possible", "1_3m":"Within 1–3 Months", exp:"Just Exploring" };
const valueMap: Record<string,string> = { u2500:"Under $2,500", "2500_10k":"$2,500–$10,000", "10_50k":"$10,000–$50,000", "50kp":"$50,000+", ns:"Not Sure" };

function toggle(arr: string[], val: string) { return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]; }

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
      setAnswers((a) => ({ ...a, category: toggle((a.category as string[]) || [], val) }));
    } else {
      setAnswers((a) => ({ ...a, [current.id]: val }));
      setTimeout(next, 280);
    }
  }

  function handlePill(val: string) {
    setAnswers((a) => ({ ...a, [current.id]: toggle((a[current.id] as string[]) || [], val) }));
  }

  function canNext() {
    if (current.id === "category") return ((answers.category as string[]) || []).length > 0;
    if (current.type === "input") return !!(contact.firstName && contact.lastName && contact.email && contact.phone);
    return true;
  }

  /* ── build WhatsApp URL ── */
  function buildWaUrl() {
    const cats = ((answers.category as string[]) || []).map((v) => catMap[v]).filter(Boolean);
    const lines = [
      `Hi, my name is ${contact.firstName || ""} ${contact.lastName || ""}.`,
      answers.situation ? `Situation: ${situationMap[answers.situation as string]}.` : "",
      cats.length ? `I want to sell: ${cats.join(", ")}.` : "",
      answers.value ? `Estimated value: ${valueMap[answers.value as string]}.` : "",
      answers.timeline ? `Timeline: ${timelineMap[answers.timeline as string]}.` : "",
      contact.email ? `Email: ${contact.email}` : "",
    ].filter(Boolean).join(" ");
    return `https://wa.me/13053505059?text=${encodeURIComponent(lines)}`;
  }

  /* ── summary rows ── */
  function buildSummary() {
    const cats = ((answers.category as string[]) || []).map((v) => catMap[v]).filter(Boolean);
    return [
      { label: "Situation", val: situationMap[answers.situation as string] },
      { label: "Selling", val: cats.join(", ") },
      { label: "Est. Value", val: valueMap[answers.value as string] },
      { label: "Timeline", val: timelineMap[answers.timeline as string] },
      { label: "Name", val: `${contact.firstName || ""} ${contact.lastName || ""}`.trim() },
    ].filter((r) => r.val);
  }

  const showContinue = current.multi || current.type === "pills";
  const f = (family: string) => ({ fontFamily: `'${family}', sans-serif` });

  return (
    <section id="sell" className="bg-[#111] py-28 border-t border-[#C9A84C]/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left copy */}
        <div className="lg:sticky lg:top-28">
          <span className="text-[10px] font-semibold tracking-[4px] uppercase text-[#C9A84C] block mb-5" style={f("Montserrat")}>Free Jewelry Evaluation</span>
          <h2 className="text-[clamp(28px,3.5vw,50px)] font-black uppercase leading-[1.05] mb-3" style={f("Playfair Display")}>
            Get Your <em className="not-italic text-[#C9A84C]">Free Offer</em><br />Today
          </h2>
          <div className="w-12 h-px bg-[#C9A84C] mb-8" />
          <p className="text-[13px] font-light text-white/45 leading-relaxed mb-10 max-w-sm" style={f("Montserrat")}>
            Answer a few quick questions and we'll prepare a tailored offer. Free, zero obligation, 100% confidential.
          </p>
          {["Same-day offer — no waiting", "Immediate payment upon acceptance", "GIA-certified evaluation included", "Confidential & secure process", "House calls for large estates"].map((b) => (
            <div key={b} className="flex items-center gap-3 mb-4">
              <span className="text-[#C9A84C] text-xs">◆</span>
              <span className="text-[12px] font-light text-white/55" style={f("Montserrat")}>{b}</span>
            </div>
          ))}
          <div className="mt-10 p-5 border border-[#C9A84C]/20 bg-[#C9A84C]/3">
            <p className="text-[18px] font-light italic text-[#C9A84C] mb-1" style={f("Playfair Display")}>&ldquo;We paid top dollar and the process was effortless.&rdquo;</p>
            <p className="text-[11px] text-white/35 font-light" style={f("Montserrat")}>— Verified Client, Estate Sale, Miami FL</p>
          </div>
          <div className="mt-8 pt-8 border-t border-[#C9A84C]/15 space-y-3">
            <a href="tel:3053505059" className="flex items-center gap-3 text-[13px] text-white hover:text-[#C9A84C] transition-colors" style={f("Montserrat")}>
              <span className="text-[#C9A84C]">📞</span> 305-350-5059
            </a>
            <p className="text-[12px] text-white/35 flex items-center gap-3" style={f("Montserrat")}>
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
                  <span className="text-[10px] font-semibold tracking-[3px] uppercase text-[#C9A84C]" style={f("Montserrat")}>Step {stepIndex + 1} of {total - 1}</span>
                  <span className="text-[10px] text-white/30" style={f("Montserrat")}>Free Evaluation</span>
                </div>
                <div className="h-[2px] bg-[#1A1A1A] mx-8">
                  <div className="h-full bg-[#C9A84C] transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            <div key={animKey} className="p-8 md:p-10">
              {/* ── SUCCESS SCREEN ── */}
              {current.type === "success" ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 border border-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><polyline points="5,14 11,20 23,8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <h3 className="text-[clamp(22px,3vw,32px)] font-black uppercase text-white mb-2" style={f("Playfair Display")}>
                    Ready, <span className="text-[#C9A84C]">{contact.firstName || "there"}!</span>
                  </h3>
                  <p className="text-[12px] font-light text-white/45 max-w-xs mx-auto mb-6 leading-relaxed" style={f("Montserrat")}>
                    Our specialist has your details. <strong className="text-white">Call or message us now</strong> and we'll give you the best offer immediately.
                  </p>

                  {/* Context summary */}
                  <div className="bg-white/2 border border-[#C9A84C]/15 p-4 mb-6 text-left max-w-xs mx-auto">
                    {buildSummary().map((row) => (
                      <div key={row.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-b-0">
                        <span className="text-[9px] font-bold tracking-[2px] uppercase text-white/35" style={f("Montserrat")}>{row.label}</span>
                        <span className="text-[11px] font-semibold text-white text-right max-w-[55%]" style={f("Montserrat")}>{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <a href="tel:3053505059"
                      className="flex items-center justify-center gap-3 bg-[#C9A84C] text-black text-[11px] font-bold tracking-[2px] uppercase py-4 px-6 hover:bg-[#D4AF5A] transition-all hover:-translate-y-px"
                      style={f("Montserrat")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      Call Now — 305-350-5059
                    </a>
                    <a href={buildWaUrl()} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#25D366] text-white text-[11px] font-bold tracking-[2px] uppercase py-4 px-6 hover:bg-[#20bc5a] transition-all hover:-translate-y-px"
                      style={f("Montserrat")}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                      WhatsApp Us
                    </a>
                  </div>
                  <p className="text-[10px] text-white/20 mt-5 tracking-widest" style={f("Montserrat")}>Your information is 100% private &amp; secure.</p>
                </div>

              ) : (
                <>
                  <h3 className="text-[clamp(20px,2.5vw,28px)] font-bold text-white mb-2 leading-snug" style={f("Playfair Display")}>{current.title}</h3>
                  {current.subtitle && <p className="text-[12px] font-light text-white/40 mb-7 leading-relaxed" style={f("Montserrat")}>{current.subtitle}</p>}

                  {current.type === "cards" && (
                    <div className={`grid gap-2 ${(current.options?.length ?? 0) <= 3 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {current.options!.map((opt) => {
                        const sel = current.multi ? (answers.category as string[])?.includes(opt.value) : answers[current.id] === opt.value;
                        return (
                          <button key={opt.value} onClick={() => handleCard(opt.value)}
                            className={`flex items-center gap-3 p-4 border text-left transition-all duration-200 ${sel ? "border-[#C9A84C] bg-[#C9A84C]/8" : "border-white/8 hover:border-[#C9A84C]/40 hover:bg-white/2"}`}>
                            <span className={`text-xl flex-shrink-0 ${sel ? "text-[#C9A84C]" : "text-white/20"}`}>{opt.icon}</span>
                            <div className="min-w-0">
                              <span className={`block text-[15px] font-bold ${sel ? "text-white" : "text-white/60"}`} style={f("Playfair Display")}>{opt.label}</span>
                              {opt.sub && <span className="block text-[11px] font-light text-white/30 mt-0.5" style={f("Montserrat")}>{opt.sub}</span>}
                            </div>
                            {sel && <span className="ml-auto w-4 h-4 bg-[#C9A84C] flex items-center justify-center flex-shrink-0"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
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
                            style={f("Montserrat")}>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.type === "input" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[{ k:"firstName", l:"First Name", p:"Jane", t:"text" }, { k:"lastName", l:"Last Name", p:"Smith", t:"text" }].map(({k,l,p,t}) => (
                          <div key={k}>
                            <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={f("Montserrat")}>{l} *</label>
                            <input type={t} placeholder={p} value={contact[k]||""} onChange={(e)=>setContact((c)=>({...c,[k]:e.target.value}))}
                              className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all placeholder:text-white/20" style={f("Montserrat")}/>
                          </div>
                        ))}
                      </div>
                      {[{ k:"email", l:"Email Address", p:"jane@email.com", t:"email" }, { k:"phone", l:"Phone Number", p:"+1 (305) 000-0000", t:"tel" }].map(({k,l,p,t}) => (
                        <div key={k}>
                          <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={f("Montserrat")}>{l} *</label>
                          <input type={t} placeholder={p} value={contact[k]||""} onChange={(e)=>setContact((c)=>({...c,[k]:e.target.value}))}
                            className="w-full bg-white/3 border border-white/10 focus:border-[#C9A84C] text-white/80 text-[13px] font-light px-4 py-3 outline-none transition-all placeholder:text-white/20" style={f("Montserrat")}/>
                        </div>
                      ))}
                      <div>
                        <label className="block text-[10px] tracking-[2px] uppercase text-white/40 mb-2" style={f("Montserrat")}>Preferred Appointment Type</label>
                        <select value={contact.appt||""} onChange={(e)=>setContact((c)=>({...c,appt:e.target.value}))}
                          className="w-full bg-[#0A0A0A] border border-white/10 focus:border-[#C9A84C] text-white/60 text-[13px] font-light px-4 py-3 outline-none appearance-none" style={f("Montserrat")}>
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
                      <button onClick={prev} className="text-[11px] tracking-[2px] uppercase text-white/30 hover:text-white/60 transition-colors" style={f("Montserrat")}>← Back</button>
                    ) : <div />}
                    {current.type === "input" ? (
                      <button onClick={next} disabled={!canNext()} className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#D4AF5A] disabled:opacity-30 disabled:cursor-not-allowed transition-all" style={f("Montserrat")}>
                        Submit &amp; Get My Offer →
                      </button>
                    ) : showContinue ? (
                      <button onClick={next} disabled={!canNext()} className="text-[11px] font-bold tracking-[2.5px] uppercase bg-[#C9A84C] text-black px-8 py-4 hover:bg-[#D4AF5A] disabled:opacity-30 disabled:cursor-not-allowed transition-all" style={f("Montserrat")}>
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
