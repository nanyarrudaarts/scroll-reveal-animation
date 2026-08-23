import { useEffect, useRef, useState } from "react";

import f01 from "@/assets/frame-002.png.asset.json";
import f02 from "@/assets/frame-003.png.asset.json";
import f03 from "@/assets/frame-004.png.asset.json";
import f04 from "@/assets/frame-005.png.asset.json";
import f05 from "@/assets/frame-006.png.asset.json";
import f06 from "@/assets/frame-007.png.asset.json";
import f07 from "@/assets/frame-008.png.asset.json";
import f08 from "@/assets/frame-009.png.asset.json";
import f09 from "@/assets/frame-010.png.asset.json";
import f10 from "@/assets/frame-011.png.asset.json";
import f11 from "@/assets/frame-013.png.asset.json";

import h01 from "@/assets/hover-015.png.asset.json";
import h02 from "@/assets/hover-018.png.asset.json";
import h03 from "@/assets/hover-020.png.asset.json";
import h04 from "@/assets/hover-022.png.asset.json";
import h05 from "@/assets/hover-024.png.asset.json";
import h06 from "@/assets/hover-026.png.asset.json";
import h07 from "@/assets/hover-028.png.asset.json";
import h08 from "@/assets/hover-029.png.asset.json";
import h09 from "@/assets/hover-030.png.asset.json";
import h10 from "@/assets/hover-031.png.asset.json";

const SCROLL_FRAMES = [f01, f02, f03, f04, f05, f06, f07, f08, f09, f10, f11].map((a) => a.url);
const HOVER_FRAMES = [h01, h02, h03, h04, h05, h06, h07, h08, h09, h10].map((a) => a.url);
const FRAMES = [...SCROLL_FRAMES, ...HOVER_FRAMES];
const LAST_SCROLL = SCROLL_FRAMES.length - 1;
const HOVER_FRAME_MS = 70;

export function EnvelopeScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const currentRef = useRef(-1);
  const hoverPlayedRef = useRef(false);
  const hoverTimerRef = useRef<number | null>(null);
  const atEndRef = useRef(false);
  const [ready, setReady] = useState(false);

  const show = (index: number) => {
    if (index === currentRef.current) return;
    const prev = imgRefs.current[currentRef.current];
    if (prev) prev.style.opacity = "0";
    const node = imgRefs.current[index];
    if (node) node.style.opacity = "1";
    currentRef.current = index;
  };

  useEffect(() => {
    let done = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done += 1;
        if (done === FRAMES.length) setReady(true);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -el.getBoundingClientRect().top;
      const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      const next = Math.min(LAST_SCROLL, Math.round(progress * LAST_SCROLL));
      atEndRef.current = next === LAST_SCROLL;
      // once the hover sequence has played, keep its final visual state
      if (hoverPlayedRef.current) return;
      show(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready]);

  const playHover = () => {
    if (hoverPlayedRef.current || !atEndRef.current || hoverTimerRef.current !== null) return;
    let i = 0;
    const step = () => {
      show(SCROLL_FRAMES.length + i);
      i += 1;
      if (i < HOVER_FRAMES.length) {
        hoverTimerRef.current = window.setTimeout(step, HOVER_FRAME_MS);
      } else {
        hoverTimerRef.current = null;
        hoverPlayedRef.current = true;
      }
    };
    step();
  };

  useEffect(() => () => {
    if (hoverTimerRef.current !== null) window.clearTimeout(hoverTimerRef.current);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        onMouseEnter={playHover}
        onPointerDown={playHover}
      >
        {FRAMES.map((src, i) => (
          <img
            key={src}
            ref={(node) => {
              imgRefs.current[i] = node;
            }}
            src={src}
            alt={i === 0 ? "Envelope Art Mail Club fechado com selo de lacre" : ""}
            aria-hidden={i !== 0}
            draggable={false}
            decoding="sync"
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{ opacity: i === 0 ? 1 : 0, willChange: "opacity", imageRendering: "-webkit-optimize-contrast" }}
          />
        ))}
      </div>
    </section>
  );
}
