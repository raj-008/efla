"use client";

import Link from "next/link";

function AnimatedTruck() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 52 }}>
      {/* Dashed road */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 2,
          background: "repeating-linear-gradient(90deg, #c8bfa0 0px, #c8bfa0 18px, transparent 18px, transparent 36px)",
        }}
      />
      {/* Truck */}
      <div
        style={{
          position: "absolute",
          bottom: 3,
          left: 0,
          animation: "driveTruck 7s linear infinite",
        }}
      >
        <svg width="72" height="40" viewBox="0 0 80 44" fill="none">
          <rect x="2" y="10" width="44" height="26" rx="3" fill="#111111" />
          <rect x="6" y="14" width="36" height="18" rx="2" fill="#1e1e1e" />
          <path d="M46 20 L46 36 L72 36 L72 26 L62 16 L46 16 Z" fill="#111111" />
          <rect x="52" y="20" width="16" height="10" rx="2" fill="#F8D166" opacity="0.75" />
          <circle cx="16" cy="38" r="6" fill="#2e2e2e" stroke="#444" strokeWidth="1.5" />
          <circle cx="16" cy="38" r="2.5" fill="#555" />
          <circle cx="60" cy="38" r="6" fill="#2e2e2e" stroke="#444" strokeWidth="1.5" />
          <circle cx="60" cy="38" r="2.5" fill="#555" />
          <ellipse cx="72" cy="28" rx="2" ry="3" fill="#F8D166" />
        </svg>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 shrink-0">
      <img
        src="/assets/logo.png"
        alt="Efla Logo"
        className="object-contain transition-all duration-300"
        style={{
          height: "42px",
          width: "auto",
        }}
      />
      <span
        style={{
          fontSize: "1.5rem",
          color: "#000000",
          letterSpacing: "0.03em",
          lineHeight: 1,
          fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700,
        }}
      >
        Efla
      </span>
    </Link>
  );
}

export default function ComingSoonPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cs-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          min-height: 100dvh;
          background: #f3f1ef;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Dot-grid background */
        .cs-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle, #111111 1px, transparent 1px);
          background-size: 34px 34px;
          opacity: 0.04;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Scrollable content wrapper ─────────────────────────── */
        .cs-scroll {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: clamp(56px, 10vw, 80px) clamp(16px, 5vw, 32px) clamp(32px, 6vw, 56px);
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 4vw, 32px);
        }

        /* Sora for display text */
        .sora { font-family: 'Sora', sans-serif; }

        /* ── Keyframes ────────────────────────────────────────── */
        
        @keyframes driveTruck {
          0%   { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 40px)); }
        }

        @keyframes spinGear {
          to { transform: rotate(360deg); }
        }

        @keyframes highlightReveal {
          from { opacity: 0; width: 0; }
          to   { opacity: 1; width: calc(100% + 8px); }
        }
      
      `}</style>

      <div className="cs-root">
        <div className="cs-scroll">
          <div className="flex items-center gap-3">
            <Logo />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-full" style={{ background: "#111111", padding: "6px 14px 6px  8px" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F8D166"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: "spinGear 3s linear infinite", transformOrigin: "center", flexShrink: 0 }}
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span style={{ fontSize: "clamp(0.62rem, 1.8vw, 0.72rem)", fontWeight: 700, color: "white", letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  Under Construction
                </span>
              </div>
            </div>

            <h1
              className="sora"
              style={{
                fontSize: "clamp(2.2rem, 9vw, 4rem)",
                fontWeight: 900,
                color: "#111111",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
              }}
            >
              Coming
              <span style={{ position: "relative", display: "inline-block", marginLeft: "10px" }}>
                <span style={{ position: "relative", zIndex: 1 }}>Soon!</span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: -4,
                    height: "38%",
                    background: "#F8D166",
                    zIndex: 0,
                    borderRadius: 3,
                    animation: "highlightReveal 0.5s ease both 0.85s",
                    width: 0,
                    opacity: 0,
                  }}
                />
              </span>
            </h1>
          </div>

          <p
            style={{
              fontSize: "clamp(0.875rem, 2.2vw, 1rem)",
              color: "#7a7060",
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            We&apos;re currently building the most seamless Logistics, E-commerce &amp; Printing service platform. All our services will be available soon. Stay tuned for updates!
          </p>

            <AnimatedTruck />
        </div>
      </div>
    </>
  );
}
