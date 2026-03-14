"use client";

import Link from "next/link";

const NAV_LINKS: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Press", href: "/press" },
  ],
  "Quick Links": [
    { label: "Tracking", href: "/tracking" },
    { label: "Pricing", href: "/pricing" },
    { label: "Enterprise", href: "/enterprise" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
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
    href: "https://linkedin.com",
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
    href: "https://youtube.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.965C5.12 20 12 20 12 20s6.88 0 8.59-.455a2.78 2.78 0 0 0 1.95-1.965A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg>
    ),
  },
];
function FooterLogo() {
  const height = 40;
  const width = Math.round((334 / 100) * height); // ≈ 134

  return (
    <Link href="/" className="flex items-center">
      <img
        src="/assets/logo.png"
        alt="Efla"
        width={width}
        height={height}
        style={{
          width,
          height,
          objectFit: "contain",
          display: "block",
        }}
      />
    </Link>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link {
          color: rgba(255,255,255,0.55);
          font-size: 0.8rem;
          font-weight: 400;
          line-height: 1;
          text-decoration: none;
          transition: color 0.15s;
          cursor: pointer;
        }
        .footer-link:hover { color: #F8D166; }
      `}</style>

      <footer className="w-full" style={{ background: "#111111", color: "white" }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            {/* Brand column */}
            <div className="flex flex-col gap-5 lg:w-56 shrink-0">
              {/* Single logo image */}
              <FooterLogo />

              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", width: "100%" }} />

              <div className="flex flex-col gap-3">
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Follow us on</span>
                <div className="flex items-center gap-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex items-center justify-center rounded-full transition-all duration-150"
                      style={{ width: 36, height: 36, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#F8D166";
                        e.currentTarget.style.color = "#111";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Nav link columns */}
            <div className="flex-1 flex flex-col gap-10">
              <div className="sm:ms-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
                {Object.entries(NAV_LINKS).map(([title, links]) => (
                  <div key={title} className="flex flex-col gap-4">
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>{title}</h4>
                    <div className="flex flex-col gap-3">
                      {links.map(({ label, href }) => (
                        <Link key={label} href={href} className="footer-link">
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
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
