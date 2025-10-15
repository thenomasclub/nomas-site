"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/src/styles/scss/pages/static/ScrollJourney.module.scss";
import Link from "next/link";
import { MoveDown, SquareArrowRight } from "lucide-react";

export default function ScrollJourney() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const hasLockedRef = useRef(false);

  // --- Scroll lock observer ---
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting, intersectionRatio, boundingClientRect } = entry;
          const vh = window.innerHeight;
          const fullyInView =
            boundingClientRect.top >= 0 && boundingClientRect.bottom <= vh;

          // Lock and enable inner scroll when 70% visible
          if (!hasLockedRef.current && intersectionRatio >= 0.6 && !fullyInView) {
            hasLockedRef.current = true;
            section.scrollIntoView({ behavior: "smooth" });

            // Enable inner scroll slightly after snap
            setTimeout(() => {
              setScrollEnabled(true);
              hasLockedRef.current = false;
            }, 700);
          }

          // Disable scroll when section exits viewport
          if (!isIntersecting) {
            setScrollEnabled(false);
          }
        });
      },
      { threshold: [0, 0.5, 0.7, 1] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // --- Track which slide is active ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = slidesRef.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActive(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    slidesRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const slides = [
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
          <p>Struggled to find friends or connections with the same ambitions as you?</p>
        </>
      ),
    },
    {
      id: 3,
      content: (
        <>
          <h5>Are you…</h5>
          <p>Trying to work from anywhere and live a life of freedom &amp; purpose?</p>
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

  const handleDotClick = (i: number) => {
    slidesRef.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className={styles.scrollJourney}>
      <div
        className={`${styles.carousel} ${
          scrollEnabled ? styles.carouselEnabled : styles.carouselLocked
        }`}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => {
              slidesRef.current[i] = el;
            }}
            className={styles.slide}
          >
            <div className={styles.content}>{slide.content}</div>
          </div>
        ))}
      </div>

      <nav className={styles.sideNav}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === active ? styles.navDotActive : styles.navDot}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </nav>
    </div>
  );
}