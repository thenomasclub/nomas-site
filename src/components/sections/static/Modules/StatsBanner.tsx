"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"
import styles from "@/src/styles/scss/pages/static/Stats.module.scss";

interface Stat {
  value: number;
  label: string;
  suffix?: string; // optional: e.g. "+"
}

interface StatsBannerProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  className?: string;
  duration?: number; // animation duration in ms
}

const StatsBanner: React.FC<StatsBannerProps> = ({
  stats,
  title,
  subtitle,
  className,
  duration = 2000,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  // initialize counts from stats (defensive)
  const [counts, setCounts] = useState<number[]>(
    () => stats?.map(() => 0) ?? []
  );

  // Keep counts array length in sync if stats changes
  useEffect(() => {
    setCounts((prev) => {
      if (!stats) return [];
      if (prev.length === stats.length) return prev;
      return stats.map(() => 0);
    });
  }, [stats]);

  // IntersectionObserver to set visible
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Animate numbers once visible
  useEffect(() => {
    if (!visible) return;
    if (!stats || stats.length === 0) return;

    const rafIds: number[] = [];

    stats.forEach((stat, i) => {
      const end = Number(stat.value) || 0;
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * end);

        setCounts((prev) => {
          const copy = [...prev];
          copy[i] = current;
          return copy;
        });

        if (progress < 1) {
          const id = requestAnimationFrame(tick);
          rafIds.push(id);
        }
      };

      const id = requestAnimationFrame(tick);
      rafIds.push(id);
    });

    return () => {
      // cancel any pending RAFs on cleanup
      rafIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, [visible, stats, duration]);

  return (
    <div ref={ref} className={`${styles.banner} ${className || ""}`}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2>{title || "Our Achievements"}</h2>
          {subtitle && <p>{subtitle}</p>}
      </motion.div>

      <div className={styles.container}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stat}>
            <div className={styles.value}>
              {counts[index] ?? 0}
              {/* Show suffix only after count has reached final value */}
              {(counts[index] ?? 0) >= stat.value
                ? stat.suffix ?? (stat.value >= 100 ? "+" : "")
                : ""}
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;