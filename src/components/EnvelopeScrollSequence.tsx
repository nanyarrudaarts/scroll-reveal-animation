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

const FRAMES = [f01, f02, f03, f04, f05, f06, f07, f08, f09, f10, f11].map((a) => a.url);

export function EnvelopeScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const currentRef = useRef(-1);
  const [ready, setReady] = useState(false);

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
      const next = Math.min(FRAMES.length - 1, Math.round(progress * (FRAMES.length - 1)));
      if (next === currentRef.current) return;
      const prev = imgRefs.current[currentRef.current];
      if (prev) prev.style.opacity = "0";
      const node = imgRefs.current[next];
      if (node) node.style.opacity = "1";
      currentRef.current = next;
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

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
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
