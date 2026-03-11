"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

interface HoverSplitButtonProps {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function HoverSplitButton({
  label = "Get Instant Rates",
  onClick,
  type = "submit",
  className = "",
}: HoverSplitButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const splitRef = useRef<SplitText | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  // Build SplitText once on mount
  useGSAP(
    () => {
      if (!textRef.current) return;

      splitRef.current = new SplitText(textRef.current, {
        type: "chars",
        charsClass: "split-char",
      });

      // Set initial state — chars visible, ready to animate
      gsap.set(splitRef.current.chars, { y: 0, opacity: 1 });

      return () => {
        splitRef.current?.revert();
      };
    },
    { scope: btnRef }
  );

  const handleMouseEnter = () => {
    if (!splitRef.current?.chars?.length) return;
    if (isAnimating.current) {
      tlRef.current?.kill();
    }

    isAnimating.current = true;
    const chars = splitRef.current.chars;

    tlRef.current = gsap
      .timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      })
      // Phase 1: chars exit upward
      .to(chars, {
        y: -18,
        opacity: 0,
        duration: 0.10,
        ease: "power2.in",
        stagger: 0.025,
      })
      // Phase 2: reset to below
      .set(chars, { y: 18, opacity: 0 })
      // Phase 3: chars enter from below
      .to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.28,
        ease: "power3.out",
        stagger: 0.025,
      });
  };

  const handleMouseLeave = () => {
    // Ensure chars are fully visible when mouse leaves mid-animation
    if (!splitRef.current?.chars?.length) return;
    gsap.to(splitRef.current.chars, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
      stagger: 0.015,
      overwrite: true,
    });
    isAnimating.current = false;
  };

  return (
    <>
      <style>{`
        .hover-split-btn .split-char {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>

      <button
        ref={btnRef}
        type={type}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`hover-split-btn mx-auto cta-btn px-10 flex-1 sm:flex-none sm:px-8 py-3 rounded-2xl text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer overflow-hidden ${className}`}
        style={{ background: "#F8D166", color: "#111111" }}
      >
        {/* Search icon — static */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        {/* Animated text */}
        <span ref={textRef} className="inline-block overflow-hidden leading-none py-0.5">
          {label}
        </span>
      </button>
    </>
  );
}