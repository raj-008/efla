"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type MainCategory = "logistics" | "ecommerce" | "printing";

interface SubService {
  id: string;
  label: string;
}

interface AddressForm {
  pincode: string;
  name: string;
  address: string;
  state: string;
  city: string;
  contact: string;
}

interface PackageForm {
  weight: string;
  length: string;
  width: string;
  height: string;
}

interface RateResult {
  base: number;
  gst: number;
  total: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOGISTICS_SUBS: SubService[] = [
  { id: "road", label: "Surface  Courier" },
  { id: "express", label: "Express Courier" },
  { id: "air", label: "Air Courier" },
];

const ECOMMERCE_SUBS: SubService[] = [
  { id: "cod", label: "Cash on Delivery" },
  { id: "returns", label: "Returns" },
  { id: "b2b", label: "B2B Shipping" },
  { id: "sameday", label: "Same Day" },
  { id: "nextday", label: "Next Day" },
  { id: "hyperlocal", label: "Hyperlocal" },
  { id: "fulfillment", label: "Fulfillment" },
  { id: "international", label: "International" },
];

const PRINTING_SUBS: SubService[] = [
  { id: "cards", label: "Business Cards" },
  { id: "brochures", label: "Brochures" },
  { id: "banners", label: "Banners" },
  { id: "packaging", label: "Packaging" },
  { id: "labels", label: "Labels" },
  { id: "stickers", label: "Stickers" },
  { id: "books", label: "Books" },
  { id: "catalogs", label: "Catalogs" },
];

const SUB_SERVICES: Record<MainCategory, SubService[]> = {
  logistics: LOGISTICS_SUBS,
  ecommerce: ECOMMERCE_SUBS,
  printing: PRINTING_SUBS,
};

const MIN_VISIBLE = Math.min(...Object.values(SUB_SERVICES).map((arr) => arr.length));

const DELIVERY_ESTIMATES: Record<string, { time: string }> = {
  air: { time: "1–2 Business Days" },
  road: { time: "3–7 Days" },
  express: { time: "2–3 Days" },
};

// Slider placeholder images — replace with your own
const SLIDER_IMAGES = [
  { src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop", alt: "Logistics network" },
  { src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80&auto=format&fit=crop", alt: "Shipping & delivery" },
  { src: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80&auto=format&fit=crop", alt: "Last mile delivery" },
];

const MAIN_SERVICES: { id: MainCategory; label: string; color: string }[] = [
  { id: "logistics", label: "Logistics", color: "#F8D166" },
  { id: "ecommerce", label: "E-Commerce", color: "#111111" },
  { id: "printing", label: "Printing", color: "#ca020c" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const emptyAddress = (): AddressForm => ({ pincode: "", name: "", address: "", state: "", city: "", contact: "" });

function calcRate(weight: number, length: number, width: number, height: number): RateResult {
  const volWeight = (length * width * height) / 5000;
  const chargeableWeight = Math.max(weight, volWeight, 0.5);
  const base = Math.max(50, +(chargeableWeight * 12 + 80).toFixed(2));
  const gst = +(base * 0.18).toFixed(2);
  return { base, gst, total: +(base + gst).toFixed(2) };
}

function canAutoCalculate(fromPincode: string, toPincode: string, pkg: PackageForm): boolean {
  return fromPincode.trim().length === 6 && toPincode.trim().length === 6 && parseFloat(pkg.weight) > 0 && parseFloat(pkg.length) > 0 && parseFloat(pkg.width) > 0 && parseFloat(pkg.height) > 0;
}

// ─── Image Slider ─────────────────────────────────────────────────────────────

function ImageSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [go]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Slide frame — height reduced 25% (was clamp(180,28vw,320) → clamp(135,21vw,240)) */}
      <div className="relative w-full overflow-hidden rounded-2xl" style={{ height: "clamp(135px, 21vw, 240px)" }}>
        {/* Slides */}
        {SLIDER_IMAGES.map((img, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}>
            <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.35) 100%)" }} />
          </div>
        ))}

        {/* Left arrow — vertically centered, inside left edge */}
        <button
          onClick={() => go(-1)}
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", color: "#111111", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right arrow — vertically centered, inside right edge */}
        <button
          onClick={() => go(1)}
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(4px)", color: "#111111", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot indicators — bottom center, inside frame */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {SLIDER_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === index ? 18 : 6,
                height: 6,
                background: i === index ? "#F8D166" : "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  isSelected,
  onSelect,
  onSubSelect,
  selectedSub,
}: {
  service: (typeof MAIN_SERVICES)[number];
  isSelected: boolean;
  onSelect: () => void;
  onSubSelect: (id: string) => void;
  selectedSub: string | null;
}) {
  const subs = SUB_SERVICES[service.id];
  const visibleSubs = subs.slice(0, MIN_VISIBLE);
  const hiddenCount = subs.length - MIN_VISIBLE;
  const isLogistics = service.id === "logistics";

  return (
    <div
      className="flex flex-col gap-4 rounded-2xl p-5 cursor-pointer transition-all duration-200"
      style={{
        background: isSelected ? service.color : "white",
        border: isSelected ? `2px solid ${service.color}` : "1.5px solid #e0d8c8",
        boxShadow: isSelected ? "0 8px 24px rgba(0,0,0,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
        color: isSelected && (service.id === "ecommerce" || service.id === "printing") ? "white" : "#111111",
      }}
      onClick={onSelect}
    >
      {/* Title with underline */}
      <div className="relative w-fit">
        <h3 style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.01em", lineHeight: 1 }}>{service.label}</h3>
        {/* Yellow brush underline */}
        {isSelected && isLogistics ? (
          <svg className="absolute w-full" style={{ bottom: -5, left: 0 }} viewBox="0 0 120 6" fill="none" preserveAspectRatio="none">
            <path d="M1 4 Q30 1 60 4 Q90 7 119 3" stroke="#111111" strokeWidth="3" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="absolute w-full" style={{ bottom: -5, left: 0 }} viewBox="0 0 120 6" fill="none" preserveAspectRatio="none">
            <path d="M1 4 Q30 1 60 4 Q90 7 119 3" stroke="#F8D166" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Sub-service list */}
      <ul className="flex flex-col gap-1.5 mt-1">
        {visibleSubs.map((s) => (
          <li key={s.id}>
            <button
              className="text-left w-full transition-all duration-150"
              style={{
                fontSize: "0.8rem",
                fontWeight: selectedSub === s.id ? 700 : 500,
                color:
                  isSelected && service.id === "ecommerce"
                    ? selectedSub === s.id
                      ? "#F8D166"
                      : "rgba(255,255,255,0.7)"
                    : isSelected && service.id === "printing"
                      ? selectedSub === s.id
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.9)"
                      : selectedSub === s.id
                        ? "#111111"
                        : "#7a7060",

                textDecoration: "none",
                textUnderlineOffset: "3px",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          </li>
        ))}
        {hiddenCount > 0 && (
          <li>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                color: isSelected && (service.id === "ecommerce" || service.id === "printing") ? "rgba(255,255,255,0.8)" : "#b0a888",
              }}
            >
              +{hiddenCount} more
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

// ─── Address Fields ───────────────────────────────────────────────────────────

function AddressSection({ title, icon, values, onChange }: { title: string; icon: React.ReactNode; values: AddressForm; onChange: (field: keyof AddressForm, val: string) => void }) {
  const fields: { key: keyof AddressForm; label: string; ph: string; type?: string }[] = [
    { key: "pincode", label: "Pincode", ph: "400001" },
    { key: "name", label: "Name", ph: "Full Name / Company Name " },
    { key: "address", label: "Address", ph: "Street, Building, Area" },
    { key: "state", label: "State", ph: "Maharashtra" },
    { key: "city", label: "City", ph: "Mumbai" },
    { key: "contact", label: "Contact", ph: "9876543210", type: "tel" },
  ];

  return (
    <div className="flex flex-col gap-3 flex-1">
      {/* Section header */}
      <div className="flex items-center gap-2 pb-1" style={{ borderBottom: "1.5px solid #eee8d5" }}>
        <span style={{ color: "#F8D166" }}>{icon}</span>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#111111", letterSpacing: "0.04em", textTransform: "uppercase" }}>{title}</span>
      </div>
      {fields.map(({ key, label, ph, type }) => (
        <div key={key} className="flex flex-col gap-1">
          <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9a9080", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
          <input type={type || "text"} value={values[key]} onChange={(e) => onChange(key, e.target.value)} placeholder={ph} className="input-field" />
        </div>
      ))}
    </div>
  );
}

// ─── Rate Display ─────────────────────────────────────────────────────────────

function RateDisplay({ rate, onBook }: { rate: RateResult; onBook: () => void }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4" style={{ background: "#111111" }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Rate</span>
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>Subject to volumetric weight</span>
      </div>
      <div className="flex flex-col gap-2">
        {[
          { label: "Base Rate", val: rate.base },
          { label: "GST (18%)", val: rate.gst },
        ].map(({ label, val }) => (
          <div key={label} className="flex items-center justify-between">
            <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: "0.85rem", color: "white", fontWeight: 600 }}>₹ {val.toFixed(2)}</span>
          </div>
        ))}
        <div className="h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#F8D166" }}>Total</span>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#F8D166" }}>₹ {rate.total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onBook}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200"
        style={{ background: "#F8D166", color: "#111111", boxShadow: "0 4px 14px rgba(248,209,102,0.45)" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5c840")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#F8D166")}
      >
        Book Order
      </button>
    </div>
  );
}


function ComingSoon({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center rounded-2xl" style={{ background: "rgba(248,209,102,0.08)" }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#F8D166" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111111" }}>Coming Soon</h3>
        <p style={{ fontSize: "0.875rem", color: "#7a7060", lineHeight: 1.6, maxWidth: "32ch" }}>{category} services will be available very soon. Stay tuned for updates!</p>
      </div>
    </div>
  );
}

// ─── Sub-Service Scroll Row ───────────────────────────────────────────────────

function SubServiceScroll({ services, selectedId, onSelect }: { services: SubService[]; selectedId: string | null; onSelect: (id: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

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
    const delta = e.pageX - el.offsetLeft - dragState.current.startX;
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

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none rounded-r-xl" style={{ background: "linear-gradient(to left, rgba(255,255,255,0.95), transparent)" }} />
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto pb-1 pr-8 select-none"
        style={{ scrollbarWidth: "none", cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
      >
        {services.map((s) => {
          const isSel = selectedId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                if (!dragState.current.moved) onSelect(s.id);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer"
              style={
                isSel ? { background: "#111111", color: "white", borderColor: "#111111", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" } : { background: "white", color: "#3a3530", borderColor: "#ddd6be" }
              }
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Rate Card ────────────────────────────────────────────────────────────────

function RateCard({ category, selectedSub, onSubSelect }: { category: MainCategory; selectedSub: string | null; onSubSelect: (id: string) => void }) {
  const [from, setFrom] = useState<AddressForm>(emptyAddress());
  const [to, setTo] = useState<AddressForm>(emptyAddress());
  const [pkg, setPkg] = useState<PackageForm>({ weight: "", length: "", width: "", height: "" });
  const [rate, setRate] = useState<RateResult | null>(null);
  const isLogistics = category === "logistics";

  useEffect(() => {
    if (!isLogistics) return;
    if (canAutoCalculate(from.pincode, to.pincode, pkg)) {
      setRate(calcRate(parseFloat(pkg.weight), parseFloat(pkg.length), parseFloat(pkg.width), parseFloat(pkg.height)));
    } else {
      setRate(null); // clears rate if user empties a field
    }
  }, [from.pincode, to.pincode, pkg, isLogistics]);

  const estimates = selectedSub ? DELIVERY_ESTIMATES[selectedSub] : null;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl shadow-xl text-left" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", border: "1.5px solid #e8e2cc" }}>
      {/* Sub-service scroll */}
      <div className="p-5 sm:p-6 pb-0">
        <SubServiceScroll services={SUB_SERVICES[category]} selectedId={selectedSub} onSelect={onSubSelect} />
      </div>

      {/* Content — only shows when sub selected */}
      {selectedSub && (
        <div className="p-5 sm:p-6 flex flex-col gap-5">
          {/* ── Non-logistics: Coming Soon ─────────────────────────────── */}
          {!isLogistics ? (
            <ComingSoon category={category === "ecommerce" ? "E-Commerce" : "Printing"} />
          ) : (
            <>
              {/* ── Delivery estimates ───────────────────────────────────── */}
              {estimates && (
                <div className="flex flex-col gap-2">
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9a9080", textTransform: "uppercase", letterSpacing: "0.05em" }}>Estimated Delivery Time</span>
                  <div className="flex flex-wrap gap-2">
                    <div key={estimates.time} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#f3f1ef" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F8D166" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#7a7060" }}>{estimates.time}</span>
                    </div>
                  </div>
                  {/* Rate calculation note */}
                  <p style={{ fontSize: "0.72rem", color: "#111111", lineHeight: 1.6, marginTop: 2 }}>
                    ℹ️ Rates are calculated based on actual weight or volumetric weight (L×W×H ÷ 5000), whichever is higher. Final rate may vary based on destination and declared value.
                  </p>
                </div>
              )}

              {/* <div className="h-px" style={{ background: "#eee8d5" }} /> */}

              {/* ── Address form ─────────────────────────────────────────── */}
<div className="flex flex-col gap-5">
                {/* From / To — side by side with vertical divider */}
                <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                  <AddressSection
                    title="From"
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      </svg>
                    }
                    values={from}
                    onChange={(f, v) => setFrom((p) => ({ ...p, [f]: v }))}
                  />

                  {/* Vertical divider */}
                  <div className="hidden md:flex flex-col items-center mx-5 my-6">
                    <div className="flex-1 w-px" style={{ background: "#ddd6be" }} />
                    <div className="w-8 h-8 rounded-full flex items-center justify-center my-2 shrink-0" style={{ background: "#F8D166" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="flex-1 w-px" style={{ background: "#ddd6be" }} />
                  </div>

                  {/* Horizontal divider on mobile */}
                  <div className="md:hidden h-px" style={{ background: "#ddd6be" }} />

                  <AddressSection
                    title="To"
                    icon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                      </svg>
                    }
                    values={to}
                    onChange={(f, v) => setTo((p) => ({ ...p, [f]: v }))}
                  />
                </div>

                <div className="h-px" style={{ background: "#eee8d5" }} />

                {/* Package Details */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: "#eee8d5" }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9a9080", textTransform: "uppercase", letterSpacing: "0.07em" }}>Package Details</span>
                    <div className="h-px flex-1" style={{ background: "#eee8d5" }} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { name: "weight" as const, label: "Weight", unit: "kg", ph: "0.0" },
                      { name: "length" as const, label: "Length", unit: "cm", ph: "0" },
                      { name: "width" as const, label: "Width", unit: "cm", ph: "0" },
                      { name: "height" as const, label: "Height", unit: "cm", ph: "0" },
                    ].map(({ name, label, unit, ph }) => (
                      <div key={name} className="flex flex-col gap-1">
                        <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9a9080", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={pkg[name]}
                            onChange={(e) => setPkg((p) => ({ ...p, [name]: e.target.value }))}
                            placeholder={ph}
                            min="0"
                            className="input-field text-center"
                            style={{ paddingRight: "28px" }}
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ fontSize: "0.7rem", fontWeight: 600, color: "#b0a888" }}>
                            {unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Get Rate button */}
                {!rate && (
  <p style={{ fontSize: "0.7rem", color: "#b0a888", textAlign: "center" }}>
    Enter both 6-digit pincodes + package dimensions to see rate automatically
  </p>
)}

                {/* Rate result */}
                {rate && <RateDisplay rate={rate} onBook={() => alert("Booking flow coming soon!")} />}
              </div>
            </>
          )}
        </div>
      )}

      {/* Placeholder when no sub selected */}
      {!selectedSub && (
        <div className="px-5 pb-5 pt-3">
          <p style={{ fontSize: "0.82rem", color: "#a5a39b", textAlign: "center" }}>Select a service above to get started</p>
        </div>
      )}
    </div>
  );
}

// ─── Background ───────────────────────────────────────────────────────────────

function BackgroundPaths() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M -60 340 Q 280 140 600 300 Q 920 460 1300 320 Q 1420 280 1540 300" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="3 3" opacity="0.15" />
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => <circle key={`${row}-${col}`} cx={col * 80 + 40} cy={row * 65 + 30} r="1.5" fill="#1a1a1a" opacity="0.04" />),
        )}
      </svg>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeMain, setActiveMain] = useState<MainCategory | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const rateCardRef = useRef<HTMLDivElement>(null);

  const handleMainSelect = (id: MainCategory) => {
    if (activeMain === id) {
      setActiveMain(null);
      setActiveSub(null);
    } else {
      setActiveMain(id);
      setActiveSub(null);
    }
  };
  useEffect(() => {
    if (activeMain && rateCardRef.current) {
      setTimeout(() => {
        rateCardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  }, [activeMain]);

  const handleSubSelect = (id: string) => setActiveSub(id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        .hero-font { font-family: 'Plus Jakarta Sans', sans-serif; }
        div::-webkit-scrollbar { display: none; }
        .input-field {
          width: 100%; background: white; border: 1.5px solid #ddd6be;
          border-radius: 10px; padding: 9px 12px; font-size: 0.8125rem;
          color: #111111; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .input-field::placeholder { color: #b0a888; }
        .input-field:focus { border-color: #F8D166; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}</style>

      <section className="hero-font relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-16 px-4 gap-8" style={{ background: "#f3f1ef" }}>
        <BackgroundPaths />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
          {/* ── Image Slider ──────────────────────────────────────────── */}
          <ImageSlider />

          {/* ── 3 Service Cards ───────────────────────────────────────── */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MAIN_SERVICES.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                isSelected={activeMain === svc.id}
                onSelect={() => handleMainSelect(svc.id)}
                onSubSelect={(id) => {
                  setActiveMain(svc.id);
                  handleSubSelect(id);
                }}
                selectedSub={activeMain === svc.id ? activeSub : null}
              />
            ))}
          </div>

          {/* ── Rate Card (only when main selected) ───────────────────── */}
          {activeMain && (
            <div ref={rateCardRef} className="w-full animate-in" style={{ animation: "fadeSlideIn 0.3s ease both" }}>
              <RateCard category={activeMain} selectedSub={activeSub} onSubSelect={handleSubSelect} />
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
