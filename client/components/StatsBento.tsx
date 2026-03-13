"use client";
import { useCountUp } from "@/hooks/useCountUp";

const AVATARS = ["https://i.pravatar.cc/34?img=32", "https://i.pravatar.cc/34?img=52", "https://i.pravatar.cc/34?img=60", "https://i.pravatar.cc/34?img=36", "https://i.pravatar.cc/34?img=12"];

function AvatarStack() {
  return (
    <div className="flex items-center">
      {AVATARS.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Customer ${i + 1}`}
          className="rounded-full border-2 border-black shrink-0"
          style={{ width: 34, height: 34, marginLeft: i === 0 ? 0 : -10, zIndex: AVATARS.length - i, objectFit: "cover" }}
        />
      ))}
      <div className="rounded-full border-2 border-black flex items-center justify-center shrink-0" style={{ width: 34, height: 34, background: "#e63946", marginLeft: -10, zIndex: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
    </div>
  );
}

function DottedArc() {
  return (
    <svg viewBox="0 0 500 500" fill="none" className="absolute pointer-events-none" style={{ width: "40%", aspectRatio: "1", top: "-105%", right: "30%", opacity: 0.35 }}>
      <circle cx="250" cy="250" r="230" stroke="#676767" strokeWidth="1.2" strokeDasharray="3 6" strokeLinecap="round" />
    </svg>
  );
}

export default function StatsBento() {
  const pincodes = useCountUp({ end: 25000, separator: true, duration: 2000 });

  return (
    <>
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
          height: 580px;
        }

        .bento-yellow      { grid-column: 1 / 3; grid-row: 1; }
        .bento-bottom-left { grid-column: 1; grid-row: 2;
                             display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .bento-dark        { grid-column: 2; grid-row: 2; }

        .bento-card {
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 860px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            height: auto;
          }
          .bento-yellow       { grid-column: 1 / 3; grid-row: 1; min-height: 210px; }
          .bento-bottom-left  { grid-column: 1 / 3; grid-row: 2;
                                grid-template-columns: 1fr 1fr; min-height: 220px; }
          .bento-dark         { grid-column: 1 / 3; grid-row: 3; min-height: 220px; }
        }

        @media (max-width: 540px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-yellow       { grid-column: 1; grid-row: 1; min-height: 190px; }
          .bento-bottom-left  { grid-column: 1; grid-row: 2;
                                grid-template-columns: 1fr 1fr; min-height: 180px; }
          .bento-dark         { grid-column: 1; grid-row: 3; min-height: 200px; }
        }

        @keyframes bento-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bento-yellow  { animation: bento-in 0.5s ease both 0.05s; }
        .bento-illus   { animation: bento-in 0.5s ease both 0.20s; }
        .bento-white   { animation: bento-in 0.5s ease both 0.27s; }
        .bento-dark    { animation: bento-in 0.5s ease both 0.34s; }
      `}</style>

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-30">
            <p style={{ fontSize: "clamp(1rem, 2.3vw, 1.6rem)", fontWeight: 600, color: "#111111", lineHeight: 1.42, maxWidth: "46ch", letterSpacing: "-0.02em" }}>
              We&apos;re not just about trucks and timelines, we&apos;re about trust and responsibility. Our mission is to make every shipment smooth, secure, and stress-free from the first order
              placed to the final delivery.
            </p>
          </div>

          {/* Grid */}
          <div className="bento-grid">
            {/* Yellow stat card */}
            <div className="bento-card bento-yellow" style={{ background: "#F8D166" }}>
              <DottedArc />
              <div className="flex flex-col justify-between h-full p-7 sm:p-8 gap-4">
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(0,0,0)", letterSpacing: "0.04em" }}>Pincodes Covered</span>

                <div className="flex items-end justify-between gap-4">
                  <div className="flex flex-col gap-2.5 z-10 shrink-0">
                    <span ref={pincodes?.ref} style={{ fontSize: "clamp(1.7rem, 2.8vw, 0.78rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {pincodes?.value}+
                    </span>
                    <p style={{ fontSize: "0.84rem", fontWeight: 500, color: "rgba(0,0,0,0.56)", maxWidth: "32ch", lineHeight: 1.6 }}>
                      Whether it&apos;s a local seller or a large enterprise, we are shipping thousands of orders across every corner of India
                    </p>
                  </div>
                  <div className="shrink-0 self-end relative z-10" style={{ width: "clamp(130px, 26%, 280px)", marginBottom: -26 }}>
                    <img src="/assets/delivery-van.png" alt="Delivery vehicle" style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom-left sub-grid */}
            <div className="bento-bottom-left">
              {/*  Mascot / illustration card  */}
              <div className="bento-card bento-illus flex items-center justify-center" style={{ background: "#eceae0" }}>
                <img src="/assets/package.png" alt="Brand mascot" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              </div>

              {/*  Orders Delivered stat */}
              <div className="bento-card bento-white flex flex-col justify-between p-5 sm:p-6" style={{ background: "#f3f1ef" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#000000", letterSpacing: "0.04em" }}>Orders Delivered</span>
                <div className="flex flex-col gap-2">
                  {/*  CountUp: 0 → 10 (displayed as 10M+)  */}
                  <span style={{ fontSize: "clamp(1.7rem, 2.8vw, 0.78rem)", fontWeight: 600, color: "#111111", letterSpacing: "-0.03em", lineHeight: 1 }}>10K+</span>
                  <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "#7a7060", lineHeight: 1.6 }}>Millions of successful deliveries and counting, every single day.</p>
                </div>
              </div>
            </div>

            {/*  Dark satisfaction card */}
            <div className="bento-card bento-dark flex flex-col justify-between p-6 sm:p-7" style={{ background: "#111111" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "white", letterSpacing: "0.04em" }}>Customer satisfaction</span>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {/* ── CountUp: 0 → 98 ── */}
                  <span style={{ fontSize: "clamp(1.7rem, 2.8vw, 0.78rem)", fontWeight: 600, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>98%</span>
                  <p style={{ fontSize: "0.8rem", fontWeight: 500, color: "white", lineHeight: 1.6 }}>Our clients love us for our reliability, speed, and stress-free service</p>
                </div>
                <AvatarStack />
              </div>
            </div>
          </div>
          {/* end bento-grid */}
        </div>
      </section>
    </>
  );
}
