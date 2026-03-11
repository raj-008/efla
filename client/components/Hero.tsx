"use client";

import { useState, useRef, useEffect } from "react";
import HoverSplitButton from "./Hoversplitbutton";

// ─── Service Data ─────────────────────────────────────────────────────────────

type MainCategory = "logistics" | "ecommerce";

interface SubService {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const LOGISTICS_SERVICES: SubService[] = [
  {
    id: "air",
    label: "Air Freight",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-1 0-1.5.5-3.5 2.5L8 8 .8 6.2l-.4.4 7 3.1L5 12l-2-.5-.4.4L5 14l2 4 .4-.4L7 16l3-2 3.1 7 .4-.4z" />
      </svg>
    ),
  },
  {
    id: "sea",
    label: "Sea Freight",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1" />
        <path d="M4 18V6l8-3 8 3v12" />
        <path d="M12 3v15" />
        <path d="M4 12h16" />
      </svg>
    ),
  },
  {
    id: "road",
    label: "Road Transport",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "rail",
    label: "Rail Freight",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="16" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m16 19 2 3" />
        <circle cx="9" cy="15" r="1" />
        <circle cx="15" cy="15" r="1" />
      </svg>
    ),
  },
  {
    id: "express",
    label: "Express Courier",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "warehouse",
    label: "Warehousing",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "lastmile",
    label: "Last Mile",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    id: "customs",
    label: "Customs Clearance",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const ECOMMERCE_SERVICES: SubService[] = [
  {
    id: "sameday",
    label: "Same Day",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 13 9 20 9" />
        <path d="M21 6L13 2 3 6v12l10 4 10-4V6z" />
      </svg>
    ),
  },
  {
    id: "nextday",
    label: "Next Day",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: "returns",
    label: "Returns",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.53" />
      </svg>
    ),
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "hyperlocal",
    label: "Hyperlocal",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C12.95 21.5 20 15.4 20 10a8 8 0 0 0-8-8z" />
      </svg>
    ),
  },
  {
    id: "b2b",
    label: "B2B Shipping",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "fulfillment",
    label: "Fulfillment",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12" />
        <path d="M22 7H2v5h20V7z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    id: "international",
    label: "International",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

// ─── SVG Vehicles ─────────────────────────────────────────────────────────────

function TruckSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="18" width="72" height="32" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M74 30 L74 50 L98 50 L98 36 L88 22 L74 22 Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M88 22 L98 36 L74 36 L74 22 Z" fill="currentColor" opacity="0.2" />
      <rect x="80" y="27" width="14" height="8" rx="1.5" fill="currentColor" opacity="0.35" />
      <circle cx="20" cy="52" r="7" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="52" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="88" cy="52" r="7" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="88" cy="52" r="3" fill="currentColor" opacity="0.4" />
      <rect x="2" y="30" width="10" height="12" rx="2" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function AirplaneSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 35 L75 20 Q90 18 92 28 Q94 38 80 42 L10 35Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M75 20 L92 28 L80 42 Z" fill="currentColor" opacity="0.22" />
      <path d="M25 35 L45 15 L55 18 L40 38 Z" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1" />
      <path d="M35 35 L48 55 L56 52 L48 37 Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1" />
      <circle cx="83" cy="30" r="5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function BikeSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="42" r="14" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="42" r="5" fill="currentColor" opacity="0.25" />
      <circle cx="72" cy="42" r="14" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="72" cy="42" r="5" fill="currentColor" opacity="0.25" />
      <path d="M18 42 L38 18 L55 18 L72 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M38 18 L45 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <path d="M55 18 L55 10 L65 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <rect x="32" y="10" width="18" height="10" rx="3" fill="currentColor" opacity="0.18" />
    </svg>
  );
}

function TempoSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 65" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="22" width="55" height="32" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <path d="M57 28 L57 54 L100 54 L100 38 L88 24 L57 24 Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <rect x="62" y="28" width="22" height="14" rx="2" fill="currentColor" opacity="0.22" />
      <circle cx="20" cy="56" r="7" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="56" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="85" cy="56" r="7" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="85" cy="56" r="3" fill="currentColor" opacity="0.35" />
      <rect x="8" y="30" width="30" height="16" rx="2" fill="currentColor" opacity="0.08" />
      <line x1="8" y1="38" x2="38" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function BackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none">
        {/* <path d="M -80 120 Q 360 -40 720 180 Q 1080 400 1520 260" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" /> */}
        <path d="M -60 340 Q 280 140 600 300 Q 920 460 1300 320 Q 1420 280 1540 300" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" />
        {/* <path d="M 0 520 Q 400 380 760 500 Q 1100 620 1480 480" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" /> */}
        {/* <path d="M 200 -20 Q 400 200 260 400 Q 120 600 340 720" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" /> */}
        {/* <path d="M 900 -20 Q 1100 150 1000 380 Q 900 600 1120 720" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.2" /> */}
        {/* {[
          [720, 180],
          [1080, 400],
          [360, 0],
          [600, 300],
          [920, 460],
          [280, 140],
          [760, 500],
          [400, 380],
          [1100, 620],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#F8D166" opacity="0.6" />
        ))} */}
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => <circle key={`${row}-${col}`} cx={col * 80 + 40} cy={row * 65 + 30} r="1.5" fill="#1a1a1a" opacity="0.05" />),
        )}
      </svg>
      {/* <div className="absolute top-10 right-12 text-gray-800 opacity-20 w-28 hidden md:block">
        <AirplaneSVG className="w-full h-full" />
      </div>
      <div className="absolute top-[38%] left-6 text-gray-800 opacity-[0.18] w-32 hidden lg:block">
        <TruckSVG className="w-full h-full" />
      </div>
      <div className="absolute bottom-16 left-[14%] text-gray-800 opacity-[0.18] w-20 hidden md:block">
        <BikeSVG className="w-full h-full" />
      </div>
      <div className="absolute bottom-10 right-[10%] text-gray-800 opacity-[0.18] w-28 hidden md:block">
        <TempoSVG className="w-full h-full" />
      </div>
      <div className="absolute top-[60%] right-[20%] text-gray-700 opacity-[0.15] w-16 hidden lg:block">
        <AirplaneSVG className="w-full h-full" />
      </div> */}
    </div>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1.5px solid #e8e2cc" }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#F8D166" }}>
        <span style={{ color: "#111111" }}>{icon}</span>
      </div>
      <div>
        <div className="text-base font-bold leading-tight" style={{ color: "#111111" }}>
          {value}
        </div>
        <div className="text-xs leading-tight" style={{ color: "#7a7060" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

// ─── Service Selector ─────────────────────────────────────────────────────────

function ServiceSelector({
  activeMain,
  setActiveMain,
  activeSubId,
  setActiveSubId,
}: {
  activeMain: MainCategory;
  setActiveMain: (c: MainCategory) => void;
  activeSubId: string;
  setActiveSubId: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const primaryServices = activeMain === "logistics" ? LOGISTICS_SERVICES : ECOMMERCE_SERVICES;
  const secondaryServices = activeMain === "logistics" ? ECOMMERCE_SERVICES : LOGISTICS_SERVICES;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft, moved: false };
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragState.current.isDown) return;
    const x = e.pageX - el.offsetLeft;
    const delta = x - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const onMouseUpOrLeave = () => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "grab";
    el.style.userSelect = "";
  };

  useEffect(() => {
    setActiveSubId(primaryServices[0].id);
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeMain]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main toggle */}
      <div className="mx-auto flex items-center gap-1 p-1 rounded-2xl w-fit" style={{ background: "#f3f1ef" }}>
        {(["logistics", "ecommerce"] as MainCategory[]).map((cat) => {
          const isActive = activeMain === cat;
          const cfg = {
            logistics: {
              label: "Logistics",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3h15v13H1z" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              ),
            },
            ecommerce: {
              label: "E-Commerce",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              ),
            },
          }[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveMain(cat)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-250 whitespace-nowrap"
              style={isActive ? { background: "#F8D166", color: "#111111" } : { background: "transparent", color: "#7a7060" }}
            >
              {cfg.icon}
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Sub scroll */}
      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none rounded-r-xl" style={{ background: "linear-gradient(to left, white, transparent)" }} />
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 pr-8"
          style={{ scrollbarWidth: "none" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          {primaryServices.map((s) => {
            const isSel = activeSubId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (!dragState.current.moved) setActiveSubId(s.id);
                }}
                className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border"
                style={isSel ? { background: "#111111", color: "white", borderColor: "#111111" } : { background: "white", color: "#3a3530", borderColor: "#ddd6be" }}
              >
                {s.icon}
                {s.label}
              </button>
            );
          })}
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: "#ddd6be" }} />
          {secondaryServices.map((s) => (
            <button
              key={s.id}
              className="cursor-pointer flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border opacity-40 hover:opacity-60"
              style={{ background: "#f0ece0", color: "#6b6450", borderColor: "#ddd6be" }}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeMain, setActiveMain] = useState<MainCategory>("logistics");
  const [activeSubId, setActiveSubId] = useState<string>("air");
  const [form, setForm] = useState({ from: "", to: "", weight: "", length: "", width: "", height: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Estimate:", { category: activeMain, service: activeSubId, ...form });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        .hero-font { font-family: 'Plus Jakarta Sans', sans-serif; }
        div::-webkit-scrollbar { display: none; }
        .input-field {
          width: 100%; background: white; border: 1.5px solid #ddd6be;
          border-radius: 12px; padding: 10px 14px; font-size: 0.875rem;
          color: #111111; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .input-field::placeholder { color: #b0a888; }
        .input-field:focus { border-color: #F8D166; }
        .cta-btn:hover { background: #f5c840 !important; }
        
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>

      <section className="hero-font relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-4" style={{ background: "#f3f1ef" }}>
        <BackgroundPaths />

        {/* Warm glow */}
        {/* <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl" style={{background:"radial-gradient(ellipse, rgba(248,209,102,0.15) 0%, transparent 70%)"}}/>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl" style={{background:"radial-gradient(ellipse, rgba(248,209,102,0.1) 0%, transparent 70%)"}}/>
        </div> */}

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.1] tracking-tight max-w-3xl" style={{ color: "#111111" }}>
            Ship Anywhere,
            <span className="relative inline-block">
              <span className="relative z-10" style={{ color: "#111111" }}>
                Effortlessly
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 14" fill="none">
                <path d="M2 10 Q75 3 150 9 Q225 15 298 7" stroke="#F8D166" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-base sm:text-lg max-w-xl leading-relaxed font-medium" style={{ color: "#7a7060" }}>
            Get instant rate estimates for your shipment. Compare carriers, track in real-time, and deliver with confidence door to door
          </p>

          {/* Card */}
          <div
            className="w-full max-w-4xl rounded-3xl shadow-xl p-5 sm:p-7 mt-2 text-left"
            style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1.5px solid #e8e2cc" }}
          >
            <ServiceSelector activeMain={activeMain} setActiveMain={setActiveMain} activeSubId={activeSubId} setActiveSubId={setActiveSubId} />

            <div className="h-px my-5" style={{ background: "#eee8d5" }} />

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Pincodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    name: "from",
                    label: "From Pincode",
                    ph: "400001",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      </svg>
                    ),
                  },
                  {
                    name: "to",
                    label: "To Pincode",
                    ph: "110001",
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                    ),
                  },
                ].map(({ name, label, ph, icon }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9a9080" }}>
                      {label}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#b0a060" }}>
                        {icon}
                      </span>
                      <input
                        type="text"
                        name={name}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={ph}
                        maxLength={6}
                        className="input-field"
                        style={{ paddingLeft: "2.25rem" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "#eee8d5" }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9a9080" }}>
                  Package Details
                </span>
                <div className="h-px flex-1" style={{ background: "#eee8d5" }} />
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "weight", label: "Weight", unit: "kg", ph: "0.0" },
                  { name: "length", label: "Length", unit: "cm", ph: "0" },
                  { name: "width", label: "Width", unit: "cm", ph: "0" },
                  { name: "height", label: "Height", unit: "cm", ph: "0" },
                ].map(({ name, label, unit, ph }) => (
                  <div key={name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#9a9080" }}>
                      {label}
                    </label>
                    <div className="relative">
                      <input type="number" name={name} value={form[name as keyof typeof form]} onChange={handleChange} placeholder={ph} min="0" className="input-field text-center pr-10" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold pointer-events-none" style={{ color: "#b0a888" }}>
                        {unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="mx-autoflex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
               <HoverSplitButton type="submit"/>
              </div>
            </form>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl mt-2">
            <StatBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3h15v13H1z" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              }
              value="25,000+"
              label="Pincodes covered"
            />
            <StatBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
              value="2M+"
              label="Happy sellers"
            />
            <StatBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
              value="99.8%"
              label="Delivery success"
            />
            <StatBadge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              value="Same Day"
              label="Express delivery"
            />
          </div> */}
        </div>
      </section>
    </>
  );
}
