"use client";
import { useState } from "react";

type Answers = Record<string, string | string[]>;

interface Step {
  id: string; title: string; subtitle?: string;
  type: "cards" | "pills" | "item_detail" | "input" | "success";
  multi?: boolean;
  options?: { value: string; label: string; sub?: string; icon?: string }[];
  showIf?: (a: Answers) => boolean;
}

const STEPS: Step[] = [
  {
    id: "situation", title: "What best describes your situation?",
    subtitle: "This helps us personalize your experience.", type: "cards", multi: false,
    options: [
      { value: "widow",      label: "Widow / Widower",        sub: "Settling a spouse's estate",      icon: "🕊"  },
      { value: "executor",   label: "Estate Executor",         sub: "Managing an estate collection",   icon: "📋" },
      { value: "divorce",    label: "Divorce Settlement",      sub: "Dividing or liquidating assets",  icon: "⚖"  },
      { value: "inherited",  label: "Inherited Jewelry",       sub: "Pieces passed down to me",        icon: "💎" },
      { value: "downsizing", label: "Downsizing",              sub: "Simplifying & freeing up value",  icon: "🏠" },
      { value: "collection", label: "Selling a Collection",    sub: "Multiple pieces to sell",         icon: "✦"  },
    ],
  },
  {
    id: "category", title: "What would you like to sell?",
    subtitle: "Select all that apply.", type: "cards", multi: true,
    options: [
      { value: "diamonds", label: "Diamond Jewelry",        sub: "Rings, earrings, pendants",         icon: "◆" },
      { value: "gold",     label: "Gold & Platinum",        sub: "Any karat, any condition",          icon: "⬡" },
      { value: "watches",  label: "Luxury Watches",         sub: "Rolex, Patek, Cartier…",            icon: "◎" },
      { value: "designer", label: "Designer Jewelry",       sub: "Cartier, Tiffany, Van Cleef…",      icon: "✦" },
      { value: "antique",  label: "Antique & Vintage",      sub: "Art Deco, Victorian, Edwardian",    icon: "❖" },
      { value: "estate",   label: "Full Estate Collection", sub: "Multiple pieces or entire estate",  icon: "⬢" },
    ],
  },
  {
    id: "diamonds_detail", title: "Diamond size range?",
    subtitle: "Helps us prepare a more accurate offer.", type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("diamonds"),
    options: [
      { value: "u1",    label: "Under 1 ct" },
      { value: "1_2",   label: "1–2 cts"    },
      { value: "2_5",   label: "2–5 cts"    },
      { value: "5p",    label: "5+ cts"     },
      { value: "multi", label: "Multiple"   },
      { value: "ns",    label: "Not sure"   },
    ],
  },
  {
    id: "watches_detail", title: "Watch brand(s)?",
    subtitle: "Designer brands command premium prices.", type: "pills",
    showIf: (a) => !!(a.category as string[])?.includes("watches"),
    options: [
      { value: "rolex",   label: "Rolex"           },
      { value: "patek",   label: "Patek Philippe"  },
      { value: "cartier", label: "Cartier"         },
      { value: "ap",      label: "Audemars Piguet" },
      { value: "iwc",     label: "IWC"             },
      { value: "other",   label: "Other brand"     },
    ],
  },
  {
    id: "item_detail", title: "Tell us about your piece",
    subtitle: "The more detail, the more accurate your offer.",
    type: "item_detail",
  },
  {
    id: "timeline", title: "How soon are you looking to sell?",
    subtitle: "We offer same-day evaluations.", type: "cards", multi: false,
    options: [
      { value: "asap", label: "As Soon As Possible", sub: "I need to sell quickly",    icon: "⚡" },
      { value: "1_3m", label: "Within 1–3 Months",   sub: "Planning ahead",            icon: "◷" },
      { value: "exp",  label: "Just Exploring",       sub: "Want to understand value",  icon: "◉" },
    ],
  },
  {
    id: "value", title: "Approximate total value?",
    subtitle: "Rough estimate — no pressure.", type: "cards", multi: false,
    options: [
      { value: "u2500",    label: "Under $2,500",       icon: "◇"  },
      { value: "2500_10k", label: "$2,500 – $10,000",   icon: "◈"  },
      { value: "10_50k",   label: "$10,000 – $50,000",  icon: "◆"  },
      { value: "50kp",     label: "$50,000+",           sub: "Eligible for house call",     icon: "❋" },
      { value: "ns",       label: "Not Sure",           sub: "That's what we're here for",  icon: "?" },
    ],
  },
  {
    id: "contact", title: "Where should we send your offer?",
    subtitle: "We'll reach out within 1 business hour.", type: "input",
  },
  { id: "success", title: "", type: "success" },
];

const situationMap: Record<string,string> = { widow:"Widow / Widower",executor:"Estate Executor",divorce:"Divorce Settlement",inherited:"Inherited Jewelry",downsizing:"Downsizing",collection:"Selling a Collection" };
const catMap:       Record<string,string> = { diamonds:"Diamond Jewelry",gold:"Gold & Platinum",watches:"Luxury Watches",designer:"Designer Jewelry",antique:"Antique & Vintage",estate:"Full Estate Collection" };
const timelineMap:  Record<string,string> = { asap:"As Soon As Possible","1_3m":"Within 1–3 Months",exp:"Just Exploring" };
const valueMap:     Record<string,string> = { u2500:"Under $2,500","2500_10k":"$2,500–$10,000","10_50k":"$10,000–$50,000","50kp":"$50,000+",ns:"Not Sure" };

const PIECE_TYPES = ["Ring","Necklace","Bracelet","Earrings","Pendant","Brooch","Bangle","Watch","Coins / Bullion","Other"];
const METAL_TYPES = ["Yellow Gold","White Gold","Rose Gold","Platinum","Silver","Two-Tone","Not Sure"];
const CONDITIONS  = ["Excellent – like new","Good – minor wear","Fair – visible wear","Damaged / needs repair","Not Sure"];

function toggle(arr: string[], val: string) { return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]; }

export default function SellWizard() {
  const [stepIndex, setStepIndex]   = useState(0);
  const [answers, setAnswers]       = useState<Answers>({ category: [] });
  const [itemDetail, setItemDetail] = useState<Record<string,string>>({});
  const [contact, setContact]       = useState<Record<string,string>>({});
  const [animKey, setAnimKey]       = useState(0);

  const visible = STEPS.filter(s => !s.showIf || s.showIf(answers));
  const current = visible[stepIndex];
  const total   = visible.length;
  const pct     = Math.max((stepIndex / (total - 2)) * 100, 4);

  function next() { setAnimKey(k => k+1); setStepIndex(i => Math.min(i+1, total-1)); }
  function prev() { setAnimKey(k => k+1); setStepIndex(i => Math.max(i-1, 0)); }

  function handleCard(val: string) {
    if (current.multi) {
      setAnswers(a => ({ ...a, category: toggle((a.category as string[])||[], val) }));
    } else {
      setAnswers(a => ({ ...a, [current.id]: val }));
      setTimeout(next, 280);
    }
  }

  function handlePill(val: string) {
    setAnswers(a => ({ ...a, [current.id]: toggle((a[current.id] as string[])||[], val) }));
  }

  function canNext() {
    if (current.id === "category") return ((answers.category as string[])||[]).length > 0;
    if (current.type === "input")  return !!(contact.firstName && contact.lastName && contact.email && contact.phone);
    return true;
  }

  function buildWaUrl() {
    const cats = ((answers.category as string[])||[]).map(v => catMap[v]).filter(Boolean);
    const lines = [
      `Hi, my name is ${contact.firstName||""} ${contact.lastName||""}.`,
      answers.situation    ? `Situation: ${situationMap[answers.situation as string]}.` : "",
      cats.length          ? `I want to sell: ${cats.join(", ")}.`                      : "",
      itemDetail.pieceType ? `Piece type: ${itemDetail.pieceType}.`                     : "",
      itemDetail.brand     ? `Brand: ${itemDetail.brand}.`                              : "",
      itemDetail.metal     ? `Metal: ${itemDetail.metal}.`                              : "",
      itemDetail.weight    ? `Weight: ${itemDetail.weight}g.`                           : "",
      itemDetail.condition ? `Condition: ${itemDetail.condition}.`                      : "",
      itemDetail.notes     ? `Notes: ${itemDetail.notes}.`                              : "",
      answers.value        ? `Est. value: ${valueMap[answers.value as string]}.`        : "",
      answers.timeline     ? `Timeline: ${timelineMap[answers.timeline as string]}.`    : "",
      contact.email        ? `Email: ${contact.email}`                                  : "",
    ].filter(Boolean).join(" ");
    return `https://wa.me/13053505059?text=${encodeURIComponent(lines)}`;
  }

  function buildSummary() {
    const cats = ((answers.category as string[])||[]).map(v => catMap[v]).filter(Boolean);
    return [
      { label:"Situation",  val: situationMap[answers.situation as string] },
      { label:"Selling",    val: cats.join(", ") },
      { label:"Piece",      val: [itemDetail.pieceType, itemDetail.brand].filter(Boolean).join(" · ") },
      { label:"Metal",      val: itemDetail.metal },
      { label:"Weight",     val: itemDetail.weight ? `${itemDetail.weight} g` : "" },
      { label:"Condition",  val: itemDetail.condition },
      { label:"Est. Value", val: valueMap[answers.value as string] },
      { label:"Timeline",   val: timelineMap[answers.timeline as string] },
      { label:"Name",       val: `${contact.firstName||""} ${contact.lastName||""}`.trim() },
    ].filter(r => r.val);
  }

  const showContinue = current.multi || current.type === "pills" || current.type === "item_detail";
  const f = (fam: string) => ({ fontFamily: `'${fam}', sans-serif` });

  return (
    <>
      <style>{`
        .sw-section {
          background: linear-gradient(160deg,#0D0D0D 0%,#111 50%,#0A0A0A 100%);
          border-top: 1px solid rgba(201,168,76,0.13);
          border-bottom: 1px solid rgba(201,168,76,0.13);
          position: relative;
          overflow: hidden;
          min-height: 100svh;
        }
        .sw-topbar {
          border-bottom: 1px solid rgba(201,168,76,0.09);
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .sw-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 52px 24px 72px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media(min-width:1024px){
          .sw-topbar { padding: 18px 48px; }
          .sw-grid {
            grid-template-columns: 1fr 1.15fr;
            gap: 72px;
            padding: 72px 48px;
          }
          .sw-left { position: sticky; top: 100px; }
        }
        .sw-left-title {
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.0;
          color: #fff;
          margin-bottom: 8px;
        }
        .sw-card-grid {
          display: grid;
          gap: 8px;
        }
        .sw-card-grid.two-col { grid-template-columns: 1fr 1fr; }
        @media(max-width:500px){
          .sw-card-grid.two-col { grid-template-columns: 1fr; }
        }
        .sw-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media(max-width:500px){
          .sw-field-row { grid-template-columns: 1fr; }
        }
        .sw-input {
          width: 100%;
          background: #0A0A0A;
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.82);
          font-size: 13px;
          font-weight: 300;
          padding: 12px 14px;
          outline: none;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }
        .sw-input::placeholder { color: rgba(255,255,255,0.22); }
        .sw-input:focus { border-color: rgba(201,168,76,0.6); }
        .sw-btn-gold {
          background: #C9A84C;
          color: #000;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 16px 28px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .sw-btn-gold:disabled { background: rgba(201,168,76,0.22); color: rgba(255,255,255,0.28); cursor: not-allowed; }
      `}</style>

      <section id="sell" className="sw-section">
        {/* decorative corners */}
        <div style={{position:"absolute",top:0,left:0,width:80,height:80,borderRight:"1px solid rgba(201,168,76,0.07)",borderBottom:"1px solid rgba(201,168,76,0.07)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,right:0,width:80,height:80,borderLeft:"1px solid rgba(201,168,76,0.07)",borderTop:"1px solid rgba(201,168,76,0.07)",pointerEvents:"none"}}/>

        {/* top bar */}
        <div className="sw-topbar">
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:2,height:28,background:"#C9A84C"}}/>
            <div>
              <p style={{...f("Montserrat"),fontSize:9,fontWeight:700,letterSpacing:"4px",textTransform:"uppercase",color:"#C9A84C",margin:0,marginBottom:3}}>Free Jewelry Evaluation</p>
              <p style={{...f("Montserrat"),fontSize:10,color:"rgba(255,255,255,0.28)",margin:0}}>No obligation · Confidential · Same-day offers</p>
            </div>
          </div>
          <a href="tel:3053505059" style={{...f("Montserrat"),fontSize:12,fontWeight:700,letterSpacing:"2px",color:"#C9A84C",textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            305-350-5059
          </a>
        </div>

        <div className="sw-grid">

          {/* LEFT */}
          <div className="sw-left">
            <p style={{...f("Montserrat"),fontSize:10,fontWeight:700,letterSpacing:"4px",textTransform:"uppercase",color:"#C9A84C",marginBottom:16}}>Get Your Free Offer</p>
            <h2 className="sw-left-title" style={f("Playfair Display")}>
              Sell Your<br/><em style={{fontStyle:"normal",color:"#C9A84C"}}>Jewelry</em><br/>Today
            </h2>
            <div style={{width:44,height:2,background:"#C9A84C",marginBottom:24}}/>
            <p style={{...f("Montserrat"),fontSize:13,fontWeight:300,color:"rgba(255,255,255,0.38)",lineHeight:1.9,maxWidth:320,marginBottom:28}}>
              Answer a few quick questions and we'll prepare a tailored offer. Free, zero obligation, 100% confidential.
            </p>
            {["Same-day offer — no waiting","Immediate payment upon acceptance","GIA-certified evaluation included","Confidential & secure process","House calls for large estates"].map(b=>(
              <div key={b} style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                <span style={{color:"#C9A84C",fontSize:7}}>◆</span>
                <span style={{...f("Montserrat"),fontSize:12,fontWeight:300,color:"rgba(255,255,255,0.46)"}}>{b}</span>
              </div>
            ))}
            <div style={{marginTop:24,padding:"16px 20px",border:"1px solid rgba(201,168,76,0.16)",background:"rgba(201,168,76,0.025)"}}>
              <p style={{...f("Playfair Display"),fontSize:15,fontStyle:"italic",color:"#C9A84C",marginBottom:5}}>&ldquo;Seamless process. They beat every offer in Miami.&rdquo;</p>
              <p style={{...f("Montserrat"),fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:"1px"}}>— Verified Client · Estate Sale · Miami, FL</p>
            </div>
            <div style={{marginTop:20,paddingTop:20,borderTop:"1px solid rgba(201,168,76,0.10)"}}>
              <a href="tel:3053505059" style={{...f("Montserrat"),fontSize:13,color:"rgba(255,255,255,0.70)",textDecoration:"none",display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <span style={{color:"#C9A84C"}}>📞</span> 305-350-5059
              </a>
              <p style={{...f("Montserrat"),fontSize:12,color:"rgba(255,255,255,0.28)",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"#C9A84C"}}>📍</span> 36 NE 1st St. Suite 136, Miami, FL 33132
              </p>
            </div>
          </div>

          {/* RIGHT — wizard */}
          <div>
            <div style={{background:"#0C0C0C",borderTop:"3px solid #C9A84C",boxShadow:"0 30px 100px rgba(0,0,0,0.55)"}}>

              {current.type !== "success" && (
                <div style={{borderBottom:"1px solid rgba(201,168,76,0.08)"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px 12px"}}>
                    <span style={{...f("Montserrat"),fontSize:10,fontWeight:700,letterSpacing:"3px",textTransform:"uppercase",color:"#C9A84C"}}>
                      Step {stepIndex+1} of {total-1}
                    </span>
                    <span style={{...f("Montserrat"),fontSize:10,color:"rgba(255,255,255,0.22)"}}>Free Evaluation</span>
                  </div>
                  <div style={{height:2,background:"#1A1A1A",margin:"0 24px"}}>
                    <div style={{height:"100%",background:"#C9A84C",width:`${pct}%`,transition:"width 0.5s ease"}}/>
                  </div>
                </div>
              )}

              <div key={animKey} style={{padding:"28px 24px"}}>

                {/* SUCCESS */}
                {current.type === "success" ? (
                  <div style={{textAlign:"center",padding:"12px 0"}}>
                    <div style={{width:50,height:50,border:"1px solid #C9A84C",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
                      <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><polyline points="5,14 11,20 23,8" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <h3 style={{...f("Playfair Display"),fontSize:"clamp(20px,3vw,28px)",fontWeight:900,textTransform:"uppercase",color:"#fff",marginBottom:8}}>
                      Ready, <span style={{color:"#C9A84C"}}>{contact.firstName||"there"}!</span>
                    </h3>
                    <p style={{...f("Montserrat"),fontSize:12,fontWeight:300,color:"rgba(255,255,255,0.42)",maxWidth:280,margin:"0 auto 20px",lineHeight:1.8}}>
                      Our specialist has your details. <strong style={{color:"#fff"}}>Call or message us now</strong> for your best offer.
                    </p>
                    <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(201,168,76,0.14)",padding:14,marginBottom:20,textAlign:"left",maxWidth:300,marginLeft:"auto",marginRight:"auto"}}>
                      {buildSummary().map(row=>(
                        <div key={row.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                          <span style={{...f("Montserrat"),fontSize:9,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.28)"}}>{row.label}</span>
                          <span style={{...f("Montserrat"),fontSize:11,fontWeight:600,color:"#fff",textAlign:"right",maxWidth:"55%"}}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:10,maxWidth:300,margin:"0 auto"}}>
                      <a href="tel:3053505059" className="sw-btn-gold" style={f("Montserrat")}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                        Call Now — 305-350-5059
                      </a>
                      <a href={buildWaUrl()} target="_blank" rel="noopener noreferrer"
                        style={{...f("Montserrat"),background:"#25D366",color:"#fff",fontSize:11,fontWeight:700,letterSpacing:"2.5px",textTransform:"uppercase",padding:"16px 24px",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                        WhatsApp Us
                      </a>
                    </div>
                    <p style={{...f("Montserrat"),fontSize:10,color:"rgba(255,255,255,0.16)",marginTop:18,letterSpacing:"2px"}}>Your information is 100% private &amp; secure.</p>
                  </div>

                ) : (
                  <>
                    <h3 style={{...f("Playfair Display"),fontSize:"clamp(18px,2.4vw,25px)",fontWeight:700,color:"#fff",lineHeight:1.25,marginBottom:5}}>{current.title}</h3>
                    {current.subtitle && <p style={{...f("Montserrat"),fontSize:12,fontWeight:300,color:"rgba(255,255,255,0.35)",marginBottom:22,lineHeight:1.7}}>{current.subtitle}</p>}

                    {/* CARDS */}
                    {current.type === "cards" && (
                      <div className={`sw-card-grid${(current.options?.length??0) > 3 ? " two-col" : ""}`}>
                        {current.options!.map(opt=>{
                          const sel = current.multi ? (answers.category as string[])?.includes(opt.value) : answers[current.id]===opt.value;
                          return (
                            <button key={opt.value} onClick={()=>handleCard(opt.value)}
                              style={{display:"flex",alignItems:"center",gap:11,padding:"12px 14px",border:`1px solid ${sel?"#C9A84C":"rgba(255,255,255,0.07)"}`,background:sel?"rgba(201,168,76,0.07)":"transparent",cursor:"pointer",textAlign:"left",transition:"border-color 0.2s",width:"100%"}}>
                              <span style={{fontSize:17,flexShrink:0,opacity:sel?1:0.22}}>{opt.icon}</span>
                              <div style={{minWidth:0}}>
                                <span style={{...f("Playfair Display"),display:"block",fontSize:14,fontWeight:700,color:sel?"#fff":"rgba(255,255,255,0.52)"}}>{opt.label}</span>
                                {opt.sub&&<span style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:300,color:"rgba(255,255,255,0.26)",marginTop:2}}>{opt.sub}</span>}
                              </div>
                              {sel&&<span style={{marginLeft:"auto",width:14,height:14,background:"#C9A84C",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><svg width="9" height="9" viewBox="0 0 10 10" fill="none"><polyline points="2,5 4,7 8,3" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* PILLS */}
                    {current.type === "pills" && (
                      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                        {current.options!.map(opt=>{
                          const sel=((answers[current.id] as string[])||[]).includes(opt.value);
                          return (
                            <button key={opt.value} onClick={()=>handlePill(opt.value)}
                              style={{...f("Montserrat"),padding:"10px 16px",border:`1px solid ${sel?"#C9A84C":"rgba(255,255,255,0.09)"}`,color:sel?"#C9A84C":"rgba(255,255,255,0.46)",background:sel?"rgba(201,168,76,0.07)":"transparent",fontSize:12,fontWeight:300,cursor:"pointer",transition:"all 0.2s"}}>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* ITEM DETAIL */}
                    {current.type === "item_detail" && (
                      <div style={{display:"flex",flexDirection:"column",gap:16}}>
                        <div className="sw-field-row">
                          <div>
                            <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Tipo de prenda</label>
                            <select value={itemDetail.pieceType||""} onChange={e=>setItemDetail(d=>({...d,pieceType:e.target.value}))} className="sw-input" style={f("Montserrat")}>
                              <option value="">Select…</option>
                              {PIECE_TYPES.map(t=><option key={t}>{t}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Marca / Maker</label>
                            <input type="text" placeholder="e.g. Cartier, Tiffany…" value={itemDetail.brand||""} onChange={e=>setItemDetail(d=>({...d,brand:e.target.value}))} className="sw-input" style={f("Montserrat")}/>
                          </div>
                        </div>
                        <div className="sw-field-row">
                          <div>
                            <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Metal</label>
                            <select value={itemDetail.metal||""} onChange={e=>setItemDetail(d=>({...d,metal:e.target.value}))} className="sw-input" style={f("Montserrat")}>
                              <option value="">Select…</option>
                              {METAL_TYPES.map(m=><option key={m}>{m}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Peso aprox. (g)</label>
                            <input type="number" placeholder="e.g. 12.5" min="0" step="0.1" value={itemDetail.weight||""} onChange={e=>setItemDetail(d=>({...d,weight:e.target.value}))} className="sw-input" style={f("Montserrat")}/>
                          </div>
                        </div>
                        <div>
                          <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Condición</label>
                          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                            {CONDITIONS.map(c=>{
                              const sel=itemDetail.condition===c;
                              return (
                                <button key={c} type="button" onClick={()=>setItemDetail(d=>({...d,condition:c}))}
                                  style={{...f("Montserrat"),padding:"8px 12px",border:`1px solid ${sel?"#C9A84C":"rgba(255,255,255,0.08)"}`,color:sel?"#C9A84C":"rgba(255,255,255,0.42)",background:sel?"rgba(201,168,76,0.07)":"transparent",fontSize:11,fontWeight:300,cursor:"pointer",transition:"all 0.2s"}}>
                                  {c}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div>
                          <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>
                            Notas <span style={{color:"rgba(255,255,255,0.20)",fontWeight:300,textTransform:"none",letterSpacing:0}}>(opcional)</span>
                          </label>
                          <textarea rows={3} placeholder="Número de serie, certificados, detalles de la piedra…" value={itemDetail.notes||""} onChange={e=>setItemDetail(d=>({...d,notes:e.target.value}))}
                            className="sw-input" style={{...f("Montserrat"),resize:"vertical" as const,lineHeight:1.7}}/>
                        </div>
                      </div>
                    )}

                    {/* CONTACT */}
                    {current.type === "input" && (
                      <div style={{display:"flex",flexDirection:"column",gap:13}}>
                        <div className="sw-field-row">
                          {[{k:"firstName",l:"First Name",p:"Jane",t:"text"},{k:"lastName",l:"Last Name",p:"Smith",t:"text"}].map(({k,l,p,t})=>(
                            <div key={k}>
                              <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>{l} *</label>
                              <input type={t} placeholder={p} value={contact[k]||""} onChange={e=>setContact(c=>({...c,[k]:e.target.value}))} className="sw-input" style={f("Montserrat")}/>
                            </div>
                          ))}
                        </div>
                        {[{k:"email",l:"Email Address",p:"jane@email.com",t:"email"},{k:"phone",l:"Phone Number",p:"+1 (305) 000-0000",t:"tel"}].map(({k,l,p,t})=>(
                          <div key={k}>
                            <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>{l} *</label>
                            <input type={t} placeholder={p} value={contact[k]||""} onChange={e=>setContact(c=>({...c,[k]:e.target.value}))} className="sw-input" style={f("Montserrat")}/>
                          </div>
                        ))}
                        <div>
                          <label style={{...f("Montserrat"),display:"block",fontSize:10,fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:7}}>Preferred Appointment</label>
                          <select value={contact.appt||""} onChange={e=>setContact(c=>({...c,appt:e.target.value}))} className="sw-input" style={f("Montserrat")}>
                            <option value="">Select…</option>
                            <option>In-person at our gallery</option>
                            <option>Phone / Video consultation</option>
                            <option>House call (large collections)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* nav */}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                      {stepIndex>0
                        ? <button onClick={prev} style={{...f("Montserrat"),fontSize:11,fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",background:"none",border:"none",cursor:"pointer"}}>← Back</button>
                        : <div/>}
                      {(current.type==="input"||showContinue) && (
                        <button onClick={next} disabled={!canNext()} className="sw-btn-gold" style={f("Montserrat")}>
                          {current.type==="input" ? "Submit & Get My Offer →" : "Continue →"}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
