import { useEffect, useRef, useState } from "react";

export const easings = {
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  linear: (t: number) => t,
} as const;

export type EasingName = keyof typeof easings;

export interface UseCountUpOptions {
  /** Target number to count up to */
  end: number;
  /** Starting number (default: 0) */
  start?: number;
  /** Animation duration in ms (default: 1800) */
  duration?: number;
  /** Decimal places (default: 0) */
  decimals?: number;
  /** Add locale thousands separator, e.g. 25000 → "25,000" (default: false) */
  separator?: boolean;
  /** Easing preset name or custom function (default: "easeOutExpo") */
  easing?: EasingName | ((t: number) => number);
  /** IntersectionObserver threshold 0–1 (default: 0.3) */
  threshold?: number;
  /** Delay in ms before animation starts after entering viewport (default: 0) */
  delay?: number;
  /** Re-trigger animation every time element enters viewport (default: false) */
  repeat?: boolean;

  suffix?: string;
}

// ─── Return value ─────────────────────────────────────────────────────────────

export interface UseCountUpReturn {
  /** Formatted string value to render */
  value: string;
  /** Raw numeric value (useful for aria-label etc.) */
  raw: number;
  /** Whether the animation has completed at least once */
  completed: boolean;
  /** Ref to attach to the element that triggers the animation on scroll */
  ref: React.RefObject<HTMLElement | null>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCountUp({
  end,
  start = 0,
  duration = 1800,
  decimals = 0,
  separator = false,
  easing = "easeOutExpo",
  threshold = 0.3,
  delay = 0,
  repeat = false,
}: UseCountUpOptions): UseCountUpReturn {
  const ref = useRef<HTMLElement>(null);
  const [raw, setRaw] = useState<number>(start);
  const [completed, setCompleted] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);
  const triggered = useRef(false);

  const easingFn = typeof easing === "function" ? easing : easings[easing];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runAnimation = () => {
      // Cancel any in-progress animation
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startTsRef.current = null;
      setRaw(start);
      setCompleted(false);

      const tick = (timestamp: number) => {
        if (!startTsRef.current) startTsRef.current = timestamp;
        const elapsed = timestamp - startTsRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easingFn(progress);
        const current = start + eased * (end - start);

        setRaw(parseFloat(current.toFixed(decimals)));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setRaw(end);
          setCompleted(true);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (triggered.current && !repeat) return;
        triggered.current = true;

        if (delay > 0) {
          setTimeout(runAnimation, delay);
        } else {
          runAnimation();
        }
      },
      { threshold },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, start, duration, decimals, easing, threshold, delay, repeat]);

  // ── Format ────────────────────────────────────────────────────────────────
  const formatted = (() => {
    const floored = Math.floor(raw);
    if (decimals > 0) {
      const str = raw.toFixed(decimals);
      if (separator) {
        const [int, dec] = str.split(".");
        return `${parseInt(int).toLocaleString("en-IN")}.${dec}`;
      }
      return str;
    }
    return separator ? floored.toLocaleString("en-IN") : String(floored);
  })();

  return { value: formatted, raw, completed, ref };
}
