"use client";

const FEATURES = [
  {
    id: "clarity",
    title: "Improved Financial Clarity",
    desc: "Real-time cost breakdowns across every carrier so you always know exactly what you're paying.",
    icon: "/assets/person.png",
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    desc: "No hidden fees. Compare rates from 50+ carriers instantly and choose what works for your budget.",
    icon: "/assets/cash.png",
  },
  {
    id: "ontime",
    title: "On-Time, Every Time",
    desc: "Industry-leading SLAs backed by real-time tracking and proactive delay alerts at every milestone.",
    icon: "/assets/clock.png",
  },
  {
    id: "fullservice",
    title: "Full-Service Solutions",
    desc: "From first-mile pickup to last-mile delivery, customs, warehousing, and returns — all in one platform.",
    icon: "/assets/bulb.png",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        .wcu-card {
          background: #f3f1ef;
          border-radius: 20px;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 40px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          min-height: 210px;
        }
      `}</style>

      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:w-[35%]  flex flex-col gap-6 lg:sticky lg:top-28">
              {/* Headline */}
              <h2 style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.2, color: "#000000", letterSpacing: "-0.02em", maxWidth: "14ch" }}>Trusted partners who deliver peace of mind</h2>

              {/* Description */}
              <p style={{ fontSize: "0.9375rem", color: "#111111", lineHeight: 1.75, fontWeight: 500, maxWidth: "38ch" }}>
                We&apos;ve built the most reliable logistics network in India — combining cutting-edge technology with a carrier ecosystem trusted by over 2 million sellers.
              </p>
            </div>

            {/*  RIGHT COLUMN  */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f, i) => (
                <div key={f.id} className={`wcu-card wcu-card-${i + 1}`}>
                  {/* Icon */}
                  <img src={f.icon} alt={f.title ?? ""} style={{ width: 48, height: 48, objectFit: "contain", display: "block" }} />

                  <div className="flex flex-col gap-2">
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111111", lineHeight: 1.3 }}>{f.title}</h3>
                    <p style={{ fontSize: "0.8125rem", color: "#7a7060", lineHeight: 1.65, fontWeight: 500 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
