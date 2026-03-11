"use client";

// ─── Logo Marquee — Logistics Partners ────────────────────────────────────────
// Matches reference: left label + infinite auto-scrolling logo strip
// Pure CSS animation — no JS, no deps, fully responsive

const LOGOS = [
  {
    id: "delhivery",
    name: "Delhivery",
    svg: (
      <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="0" y="6" width="20" height="20" rx="3" fill="currentColor" opacity="0.85" />
        <path d="M4 16 L10 10 L16 16 L10 22 Z" fill="white" opacity="0.9" />
        <text x="26" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" fill="currentColor">
          Delhivery
        </text>
      </svg>
    ),
  },
  {
    id: "dtdc",
    name: "DTDC",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="0" y="4" width="24" height="24" rx="12" fill="currentColor" opacity="0.15" />
        <text x="4" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="800" fill="currentColor" opacity="0.9">
          DT
        </text>
        <text x="28" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="15" fontWeight="800" fill="currentColor" letterSpacing="2">
          DTDC
        </text>
      </svg>
    ),
  },
  {
    id: "ecom",
    name: "Ecom Express",
    svg: (
      <svg viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <circle cx="12" cy="16" r="10" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 16 L12 12 L16 16 L12 20 Z" fill="currentColor" opacity="0.7" />
        <text x="28" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          Ecom{" "}
          <tspan fontWeight="400" opacity="0.7">
            Express
          </tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "xpressbees",
    name: "XpressBees",
    svg: (
      <svg viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M2 8 L14 16 L2 24 Z" fill="currentColor" opacity="0.8" />
        <path d="M10 8 L22 16 L10 24 Z" fill="currentColor" opacity="0.4" />
        <text x="28" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          XpressBees
        </text>
      </svg>
    ),
  },
  {
    id: "bluedart",
    name: "Blue Dart",
    svg: (
      <svg viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M2 24 L12 4 L22 24 L12 20 Z" fill="currentColor" opacity="0.75" stroke="currentColor" strokeWidth="0.5" />
        <text x="28" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          Blue <tspan fontWeight="400">Dart</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "fedex",
    name: "FedEx",
    svg: (
      <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="0" y="8" width="14" height="16" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 14 L10 14 M4 18 L10 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <text x="20" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="16" fontWeight="800" fill="currentColor" letterSpacing="-0.5">
          FedEx
        </text>
      </svg>
    ),
  },
  {
    id: "shadowfax",
    name: "Shadowfax",
    svg: (
      <svg viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M2 22 Q12 4 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M6 22 Q12 10 18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
        <text x="28" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          Shadowfax
        </text>
      </svg>
    ),
  },
  {
    id: "ekart",
    name: "Ekart",
    svg: (
      <svg viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="0" y="8" width="20" height="16" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 16 L15 16 M10 11 L15 16 L10 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
        <text x="26" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" fill="currentColor">
          Ekart
        </text>
      </svg>
    ),
  },
  {
    id: "amazon",
    name: "Amazon Shipping",
    svg: (
      <svg viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M2 14 Q12 6 22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M2 14 Q12 22 22 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
        <text x="28" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          Amazon{" "}
          <tspan fontWeight="400" opacity="0.7">
            Shipping
          </tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "shiprocket",
    name: "Shiprocket",
    svg: (
      <svg viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M12 2 L18 10 L14 10 L14 28 L10 28 L10 10 L6 10 Z" fill="currentColor" opacity="0.75" />
        <circle cx="12" cy="4" r="3" fill="currentColor" opacity="0.4" />
        <text x="26" y="21" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="13" fontWeight="700" fill="currentColor">
          Shiprocket
        </text>
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const TRACK = [...LOGOS, ...LOGOS];

export default function LogoMarquee() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .marquee-font { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 0;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-wrapper {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      <section className="marquee-font w-full" style={{ borderBottom: "1px dashed #cccccc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 py-5 sm:py-0" style={{ minHeight: 125 }}>
            {/* ── Left label ─────────────────────────────────────────────── */}
            <div
              className="shrink-0 pr-6 mr-2 flex flex-col justify-center"
              style={{
                // borderRight: "1px solid #cccccc",
                minWidth: 160,
                paddingRight: 24,
              }}
            >
              <span className="hidden sm:block" style={{ fontSize: "1rem", fontWeight: 500, color: "#111111", lineHeight: 1.4 }}>
                50+ carrier partners
              </span>
              <span className="hidden sm:block" style={{ fontSize: "1rem", fontWeight: 500, lineHeight: 1.4 }}>
                already integrated
              </span>
              <span className="block sm:hidden py-3 text-center" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#111111" }}>
                50+ carrier partners already integrated
              </span>
            </div>

            <div className="marquee-wrapper flex-1 min-w-0">
              <div className="marquee-track">
                {TRACK.map((logo, i) => (
                  <div key={`${logo.id}-${i}`} className="shrink-0 flex items-center justify-center px-8" style={{ color: "#000000" }}>
                    {logo.svg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
