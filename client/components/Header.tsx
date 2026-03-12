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

function Logo({ compact }: { compact: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-1 shrink-0">
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

function DropdownMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-dropdown mt-3">
      <div className="absolute -top-3 left-0 right-0 h-3" />
      {items.map((item) => (
        <Link key={item.label} href={item.href} className="block px-4 py-2 text-sm text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors duration-150">
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function NavItemComponent({ item, scrolled }: { item: NavItem; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Delay timer ref so closing is debounced
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

  // Clean up on unmount
  useEffect(() => () => cancelClose(), [cancelClose]);

  const textClass = `relative text-sm font-medium transition-colors duration-200 group ${scrolled ? "text-gray-700 hover:text-gray-900" : "text-gray-800 hover:text-gray-900"}`;

  const underline = <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#f8d166] rounded-full group-hover:w-full transition-all duration-300 ease-out" />;

  if (!item.hasDropdown) {
    return (
      <Link href={item.href} className={textClass}>
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
      <button className={`flex items-center gap-1 ${textClass}`} aria-expanded={open} aria-haspopup="true">
        {item.label}
        <ChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {underline}
      </button>

      {open && item.children && <DropdownMenu items={item.children} />}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,opsz,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
      `}</style>
      <div className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={onClose} />

      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="font-bold text-gray-900 text-lg">Efla</span>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L14 14M14 2L2 14" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-[#f8d166]/20 font-medium text-sm transition-colors"
                onClick={onClose}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown />}
              </Link>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 space-y-3">
          <Link
            href="/sign-in"
            className="block text-center py-2.5 px-4 rounded-full border-2 border-[#000000] text-gray-800 font-medium text-sm hover:bg-[#f8d166] hover:border-none transition-all duration-200"
            onClick={onClose}
          >
            Log In
          </Link>
          <Link href="/sign-up" className="block text-center py-2.5 px-4 rounded-full bg-[#f8d166] text-gray-900 font-medium text-sm hover:bg-[#f5c840] transition-all duration-200" onClick={onClose}>
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

  useEffect(() => {
    const THRESHOLD = 60;
    const handleScroll = () => setScrolled(window.scrollY > THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  const isPill = scrolled; // for lg+ screens

  return (
    <>
      <style>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateX(-40px) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-40px) translateY(0);    }
        }
        .animate-dropdown { animation: dropdown 0.18s ease-out forwards; }
      `}</style>

      <header
        className="fixed top-3 lg:top-0 left-0 right-0 z-30 transition-all duration-300"
        style={{
          paddingTop: scrolled ? "10px" : "0px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        <div
          className={`
            mx-auto transition-all duration-500
            
            max-w-6xl bg-white rounded-3xl shadow-lg px-5 py-3
            ${isPill ? "" : "lg:max-w-none lg:bg-transparent lg:rounded-none lg:shadow-none lg:px-6 lg:py-4"}
          `}
        >
          <div className="flex items-center justify-between gap-6">
            <Logo scrolled={scrolled} />

            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {NAV_ITEMS.map((item) => (
                <NavItemComponent key={item.label} item={item} scrolled={isPill} />
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <Link href="/sign-in" className="px-4 py-2 rounded-full text-sm font-medium border-2 border-[#000000] text-gray-800 hover:bg-[#f8d166] transition-all duration-200">
                Log In
              </Link>
            </div>

            <button
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
              <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
              <span className="block h-[3px] w-5 rounded-full bg-gray-800" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
