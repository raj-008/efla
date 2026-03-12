"use client";

// ─── Footer ───────────────────────────────────────────────────────────────────

const NAV_LINKS = {
  Company: ["About Us", "Careers", "Blog", "Press"],
  "Quick Links": ["API Integrations", "Tracking", "Pricing", "Enterprise"],
  Support: ["Contact Us", "Privacy Policy", "Terms of Service", "Insurance FAQs"],
};

// ── Social icons ──────────────────────────────────────────────────────────────
const SOCIALS = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.965C5.12 20 12 20 12 20s6.88 0 8.59-.455a2.78 2.78 0 0 0 1.95-1.965A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];

// ── QR placeholder ────────────────────────────────────────────────────────────
function QRCode() {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Top-left finder */}
      <rect x="5" y="5" width="28" height="28" rx="3" fill="white" />
      <rect x="9" y="9" width="20" height="20" rx="1" fill="#111" />
      <rect x="13" y="13" width="12" height="12" rx="1" fill="white" />
      <rect x="16" y="16" width="6" height="6" fill="#111" />
      {/* Top-right finder */}
      <rect x="67" y="5" width="28" height="28" rx="3" fill="white" />
      <rect x="71" y="9" width="20" height="20" rx="1" fill="#111" />
      <rect x="75" y="13" width="12" height="12" rx="1" fill="white" />
      <rect x="78" y="16" width="6" height="6" fill="#111" />
      {/* Bottom-left finder */}
      <rect x="5" y="67" width="28" height="28" rx="3" fill="white" />
      <rect x="9" y="71" width="20" height="20" rx="1" fill="#111" />
      <rect x="13" y="75" width="12" height="12" rx="1" fill="white" />
      <rect x="16" y="78" width="6" height="6" fill="#111" />
      {/* Data modules */}
      {[
        [38, 5],
        [42, 5],
        [46, 5],
        [50, 5],
        [54, 5],
        [38, 9],
        [46, 9],
        [54, 9],
        [38, 13],
        [42, 13],
        [50, 13],
        [54, 13],
        [38, 17],
        [46, 17],
        [38, 21],
        [42, 21],
        [46, 21],
        [50, 21],
        [5, 38],
        [13, 38],
        [21, 38],
        [29, 38],
        [38, 38],
        [46, 38],
        [54, 38],
        [62, 38],
        [71, 38],
        [79, 38],
        [87, 38],
        [5, 42],
        [17, 42],
        [25, 42],
        [33, 42],
        [42, 42],
        [50, 42],
        [58, 42],
        [67, 42],
        [75, 42],
        [83, 42],
        [9, 46],
        [21, 46],
        [29, 46],
        [38, 46],
        [46, 46],
        [54, 46],
        [63, 46],
        [71, 46],
        [79, 46],
        [87, 46],
        [5, 50],
        [13, 50],
        [25, 50],
        [33, 50],
        [42, 50],
        [58, 50],
        [67, 50],
        [75, 50],
        [83, 50],
        [9, 54],
        [17, 54],
        [29, 54],
        [38, 54],
        [46, 54],
        [54, 54],
        [62, 54],
        [71, 54],
        [79, 54],
        [87, 54],
        [38, 62],
        [50, 62],
        [58, 62],
        [67, 62],
        [83, 62],
        [42, 67],
        [54, 67],
        [62, 67],
        [71, 67],
        [87, 67],
        [38, 71],
        [46, 71],
        [58, 71],
        [67, 71],
        [75, 71],
        [83, 71],
        [42, 75],
        [50, 75],
        [62, 75],
        [71, 75],
        [79, 75],
        [38, 79],
        [54, 79],
        [67, 79],
        [75, 79],
        [87, 79],
        [42, 83],
        [50, 83],
        [58, 83],
        [83, 83],
        [38, 87],
        [46, 87],
        [54, 87],
        [62, 87],
        [71, 87],
        [79, 87],
        [87, 87],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="4" fill="white" />
      ))}
    </svg>
  );
}

// ── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          color: rgba(255,255,255,0.55);
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1;
          text-decoration: none;
          transition: color 0.15s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
        }
        .footer-link:hover { color: #F8D166; }
        .footer-divider {
          border: none;
        }
      `}</style>

      <footer className="w-full" style={{ background: "#111111", color: "white" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-8">
          {/* ── Top section ──────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            {/* ── Left panel ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-5 lg:w-56 shrink-0">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <img src="/assets/logo.png" alt="EFLA Logo" style={{ height: 36, width: "auto", objectFit: "contain", display: "block" }} />
                <span style={{ fontSize: "1.4rem", letterSpacing: "0.03em", fontFamily: "'Source Sans 3', sans-serif" }} className="color-white font-semibold">
                  Efla
                </span>
              </div>

              <hr className="footer-divider" style={{ width: "100%" }} />

              {/* Social */}
              <div className="flex flex-col gap-3">
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Follow us on</span>
                <div className="flex items-center gap-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="flex items-center justify-center rounded-full transition-all duration-150"
                      style={{ width: 36, height: 36, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "#F8D166";
                        (e.currentTarget as HTMLAnchorElement).style.color = "#111";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-10">
              <div className="sm:ms-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {Object.entries(NAV_LINKS).map(([title, links]) => (
                  <div key={title} className="flex flex-col gap-4">
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>{title}</h4>
                    <div className="flex flex-col gap-3">
                      {links.map((link) => (
                        <a key={link} href="#" className="footer-link" style={{ fontSize: "0.8rem" }}>
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="flex flex-col gap-2">
              <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "white" }}>Company Information:</p>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>© 2025 Efla Group Pvt. Ltd.</p>
              <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.9 }}>
                GSTIN: 08AAJCE4820G1ZP
                <br />
                Email:{" "}
                <a href="mailto:eflagroup.india@gmail.com" className="footer-link" style={{ fontSize: "0.8rem" }}>
                  eflagroup.india@gmail.com
                </a>
                <br />
                Phone: &nbsp;+919828888763 &nbsp;|&nbsp; +919610333312
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
