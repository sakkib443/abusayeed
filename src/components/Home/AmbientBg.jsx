"use client";

import React from "react";

/**
 * Subtle animated backdrop for homepage sections.
 * Two slow-drifting brand-color orbs + a faint dotted texture.
 * Purely decorative (pointer-events-none) and sits behind content —
 * give the parent `relative overflow-hidden` and the content `relative z-10`.
 */
const AmbientBg = ({ flip = false, dots = true }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 overflow-hidden ${flip ? "scale-x-[-1]" : ""}`}
  >
    <div className="absolute -top-28 -left-24 w-[420px] h-[420px] rounded-full bg-[#003ECB]/[0.07] dark:bg-[#003ECB]/[0.16] blur-[120px] animate-drift" />
    <div className="absolute -bottom-28 right-0 w-[380px] h-[380px] rounded-full bg-[#0182E6]/[0.06] dark:bg-[#0182E6]/[0.12] blur-[120px] animate-drift-slow" />
    {dots && (
      <div className="absolute inset-0 text-slate-400/[0.16] dark:text-white/[0.045] bg-dots mask-fade" />
    )}
  </div>
);

export default AmbientBg;
