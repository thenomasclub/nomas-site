"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react"
import { client } from "@/sanity/lib/client";
import { partnersQuery } from "@/sanity/lib/queries";
import Image from 'next/image';
import styles from "@/src/styles/scss/modules/components/PartnerGrid.module.scss";

interface Partner {
  _id: string;
  name: string;
  logo: string;
  discount?: string;
  website?: string;
}

export default function PartnerGrid() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [_fullHeight, setFullHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(partnersQuery);
      setPartners(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setFullHeight(contentRef.current.scrollHeight);
    }
  }, [partners]);

  if (!partners.length) return null;

  const visiblePartners = showAll ? partners : partners.slice(0, 10);

  return (
    <section className={styles.partnerGrid}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Connect with brands
        </motion.h2>
        <div
        className={`${styles.wrapper} ${showAll ? styles.expanded : ""}`}
        ref={contentRef}
        >
        <div className={styles.grid}>
            {visiblePartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.logoWrap}>
              <Image src={partner.logo} alt={partner.name} width={400} height={400} />
              <div className={styles.overlay}>
                  <h3>{partner.name}</h3>
                  {partner.discount && <p>{partner.discount}</p>}
              </div>
            </div>
            </motion.div>
            ))}
        </div>

        {!showAll && <div className={styles.fadeOverlay}></div>}
      </div>
      {partners.length > 10 && (
        <button
          className={styles.showMore}
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </section>
  );
}