"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    href: "#",
    hasDropdown: true,
    children: [
      { label: "Shipping", href: "#" },
      { label: "Tracking", href: "#" },
      { label: "Warehousing", href: "#" },
    ],
  },
  {
    label: "Platform",
    href: "#",
    hasDropdown: true,
    children: [
      { label: "Integrations", href: "#" },
      { label: "Analytics", href: "#" },
    ],
  },
  { label: "Pricing", href: "#" },
  {
    label: "Partners",
    href: "#",
    hasDropdown: true,
    children: [
      { label: "Courier Partners", href: "#" },
      { label: "Tech Partners", href: "#" },
    ],
  },
  { label: "Track Order", href: "#" },
  {
    label: "Resources",
    href: "#",
    hasDropdown: true,
    children: [
      { label: "Blog", href: "#" },
      { label: "Docs", href: "#" },
      { label: "Case Studies", href: "#" },
    ],
  },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ open }: { open?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transition: "transform 0.25s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-1.5 shrink-0">
      <img src="/assets/logo.png" alt="Efla Logo" className="object-contain transition-all duration-300" style={{ height: compact ? "36px" : "42px", width: "auto" }} />
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

function DesktopDropdown({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-dropdown mt-3">
      <div className="absolute -top-3 left-0 right-0 h-3" />
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-[#f8d166]/20 transition-colors duration-150">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function DesktopNavItem({ item, scrolled }: { item: NavItem; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  }, []);
  useEffect(() => () => cancelClose(), [cancelClose]);

  const textCls = `relative text-sm font-medium transition-colors duration-200 group ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-800 hover:text-gray-900"}`;
  const underline = <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#f8d166] rounded-full group-hover:w-full transition-all duration-300 ease-out" />;

  if (!item.hasDropdown) {
    return (
      <Link href={item.href} className={textCls}>
        {item.label}
        {underline}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button className={`flex items-center gap-1 ${textCls}`} aria-expanded={open} aria-haspopup="true">
        {item.label}
        <ChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {underline}
      </button>
      {open && item.children && <DesktopDropdown items={item.children} />}
    </div>
  );
}

function MobileDropdown({ open, onClose, headerBottom }: { open: boolean; onClose: () => void; headerBottom: number }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-x-0 bottom-0 z-30 lg:hidden transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          top: 0,
          background: `linear-gradient(to bottom, transparent ${headerBottom}px, rgba(0,0,0,0.28) ${headerBottom}px)`,
        }}
        onClick={onClose}
      />

      <div
        className={`fixed left-3 right-3 z-40 lg:hidden transition-all duration-300 ease-out origin-top ${
          open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
        }`}
        style={{
          top: headerBottom + 8,
          background: "#ffffff",
          borderRadius: 20,
          boxShadow: "0 12px 48px rgba(0,0,0,0.14)",
          overflow: "hidden",
        }}
      >
        <nav className="px-2 pt-2 pb-1">
          {NAV_ITEMS.map((item, idx) => (
            <div key={item.label}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => setExpanded((p) => (p === item.label ? null : item.label))}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-800 font-medium text-sm transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    <span>{item.label}</span>
                    <ChevronRight open={expanded === item.label} />
                  </button>

                  <div
                    style={{
                      maxHeight: expanded === item.label ? `${(item.children?.length ?? 0) * 48}px` : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <div className="ml-3 mr-1 mb-1 rounded-xl overflow-hidden" style={{ background: "#faf9f6" }}>
                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={onClose}
                          className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-[#f8d166]/20 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={onClose} className="flex items-center px-4 py-3.5 rounded-xl text-gray-800 font-medium text-sm hover:bg-gray-50 transition-colors">
                  {item.label}
                </Link>
              )}
              {idx < NAV_ITEMS.length - 1 && <div className="mx-4" style={{ height: 1, background: "#f0ece0" }} />}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3 px-4 py-4" style={{ borderTop: "1.5px solid #f0ece0" }}>
          <Link
            href="/sign-in"
            onClick={onClose}
            className="flex-1 text-center py-2.5 rounded-full border-2 border-black text-gray-900 font-semibold text-sm hover:bg-[#f8d166] hover:border-[#f8d166] transition-all duration-200"
          >
            Log In
          </Link>
          <Link
            href="/sign-up"
            onClick={onClose}
            className="flex-1 text-center py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
            style={{ background: "#f8d166", color: "#111111" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5c840")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f8d166")}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerBottom, setHeaderBottom] = useState(64);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, [scrolled]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isPill = scrolled;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
        @keyframes dropdown {
          from { opacity: 0; transform: translateX(-40px) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-40px) translateY(0); }
        }
        .animate-dropdown { animation: dropdown 0.18s ease-out forwards; }
      `}</style>

      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 max-lg:pt-3 max-lg:px-3 ${mobileOpen ? "bg-[#00000047]" : ""}`}
        style={scrolled ? { paddingTop: 12, paddingLeft: 16, paddingRight: 16 } : undefined}
      >
        <div
          className={`
            mx-auto transition-all duration-500
            max-w-6xl bg-white rounded-3xl shadow-lg px-5 py-3
            ${isPill ? "" : "lg:max-w-none lg:bg-transparent lg:rounded-none lg:shadow-none lg:px-6 lg:py-4"}
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <Logo compact={true} />

            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {NAV_ITEMS.map((item) => (
                <DesktopNavItem key={item.label} item={item} scrolled={isPill} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <Link href="/sign-in" className="px-4 py-2 rounded-full text-sm font-medium border-2 border-black text-gray-800 hover:bg-[#f8d166] hover:border-[#f8d166] transition-all duration-200">
                Log In
              </Link>
            </div>

            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                /* Clean X icon */
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 2L16 16M16 2L2 16" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              ) : (
                <span className="flex flex-col items-center gap-1.5">
                  <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
                  <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
                  <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileDropdown open={mobileOpen} onClose={() => setMobileOpen(false)} headerBottom={headerBottom} />
    </>
  );
}
