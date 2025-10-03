"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react"
import { client } from "@/sanity/lib/client";
import Image from 'next/image';
import { partnersQuery } from "@/sanity/lib/queries";
import styles from "@/src/styles/scss/modules/components/PartnerSlider.module.scss";

interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
}

export default function PartnerSlider() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(partnersQuery);
      setPartners(data);
    }
    fetchData();
  }, []);

  if (!partners.length) return null;

  return (
    <div className={styles.logoSlider}>
      <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Connect with brands
        </motion.h2>
      <div className={styles.partners}>
        {/* Row 1 - scroll left */}
        <div className={`${styles.track} ${styles.left}`}>
          {[...Array(2)].map((_, dupIndex) =>
            partners.map((partner) => (
              <a
                key={`${partner._id}-top-${dupIndex}`}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoWrap}
              >
                <Image src={partner.logo} alt={partner.name} width={400} height={400} />
              </a>
            ))
          )}
        </div>

        {/* Row 2 - scroll right */}
        <div className={`${styles.track} ${styles.right}`}>
          {[...Array(2)].map((_, dupIndex) =>
            partners.map((partner) => (
              <a
                key={`${partner._id}-bottom-${dupIndex}`}
                href={partner.website || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.logoWrap}
              >
                <Image src={partner.logo} alt={partner.name} width={400} height={400} />
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
