"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "@/src/styles/scss/pages/static/ScrollJourney.module.scss";
import { MoveDown, SquareArrowRight } from "lucide-react";

interface Slide {
  id: string | number;
  content: React.ReactNode;
}

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);

export default function ScrollJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null); // desktop section
  const mobileScrollRef = useRef<HTMLDivElement | null>(null); // mobile scroll container
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slides: Slide[] = [
    {
      id: 1,
      content: (
        <>
          <p>Do you want to be part of something more?</p>
          <h3>Here’s why you should join</h3>
          <MoveDown className={styles.icon} size={48} strokeWidth={1.5} />
        </>
      ),
    },
    {
      id: 2,
      content: (
        <>
          <h5>Have you…</h5>
          <p>
            Struggled to find friends or connections with the same ambitions as
            you?
          </p>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <h5>Are you…</h5>
          <p>
            Trying to work from anywhere and live a life of freedom &amp; purpose?
          </p>
        </>
      ),
    },
    {
      id: 4,
      content: (
        <>
          <h5>Do you…</h5>
          <p>Want help from experts to grow your business or expand globally?</p>
        </>
      ),
    },
    {
      id: 5,
      content: (
        <>
          <h3>Join us and start moving differently</h3>
          <Link href="/membership">
            <button className={styles.ctaButton}>
              Become a member
              <SquareArrowRight size={25} strokeWidth={3} />
            </button>
          </Link>
        </>
      ),
    },
  ];

  // detect mobile (and respond to changes)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    // modern + fallback
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // behavior switch: desktop uses sticky math; mobile uses IntersectionObserver rooted to mobile scroll container
  useEffect(() => {
    if (isMobile) {
      const container = mobileScrollRef.current;
      if (!container) return;

      const slidesEls = Array.from(container.querySelectorAll(`.${styles.slide}`));
      if (!slidesEls.length) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = slidesEls.indexOf(entry.target as Element);
              if (idx !== -1) setActive((prev) => (prev === idx ? prev : idx));
            }
          });
        },
        {
          root: container,
          threshold: 0.55,
        }
      );

      slidesEls.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    } else {
      const container = sectionRef.current;
      if (!container) return;

      let ticking = false;

      function update() {
        if (!container) return;
        const viewportHeight = window.innerHeight;
        const containerTop = container.offsetTop;
        const containerHeight = container.offsetHeight;

        const scrollY = window.scrollY;
        const progress = clamp(
          (scrollY - containerTop) / (containerHeight - viewportHeight),
          0,
          1
        );

        const idx = Math.min(slides.length - 1, Math.floor(progress * slides.length));
        setActive((prev) => (prev === idx ? prev : idx));
        ticking = false;
      }

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }
  }, [isMobile, slides.length]);

  const sectionHeight = `${slides.length * 100}vh`;

  return (
    <div
      ref={sectionRef}
      className={styles.scrollJourney}
      // only apply the tall section height when NOT mobile
      style={isMobile ? undefined : { height: sectionHeight }}
      aria-roledescription="scrollytelling"
    >
      {/* Desktop pinned layout */}
      {!isMobile && (
        <div className={styles.pinned}>
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                className={`${styles.slide} ${isActive ? styles.active : ""}`}
                aria-hidden={!isActive}
              >
                <div className={styles.content}>{slide.content}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile scroll-snap layout */}
      {isMobile && (
        <div ref={mobileScrollRef} className={styles.mobileScroll}>
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                className={`${styles.slide} ${isActive ? styles.active : ""}`}
                aria-hidden={!isActive}
              >
                <div className={styles.content}>{slide.content}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}