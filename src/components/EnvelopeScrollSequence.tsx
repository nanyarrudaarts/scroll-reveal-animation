import { useEffect, useRef, useState } from "react";

import f1 from "@/assets/frame-002.png.asset.json";
import f2 from "@/assets/frame-003.png.asset.json";
import f3 from "@/assets/frame-004.png.asset.json";
import f4 from "@/assets/frame-007.png.asset.json";
import f5 from "@/assets/frame-011.png.asset.json";
import f6 from "@/assets/frame-013.png.asset.json";

const FRAMES = [f1.url, f2.url, f3.url, f4.url, f5.url, f6.url];

export function EnvelopeScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let done = 0;
    FRAMES.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done += 1;
        if (done === FRAMES.length) setLoaded(true);
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
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const next = Math.min(FRAMES.length - 1, Math.floor(progress * FRAMES.length));
      setIndex(next);
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
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[450vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {FRAMES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Art Mail Club envelope frame ${i + 1}`}
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-150"
              style={{ opacity: loaded && i === index ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
