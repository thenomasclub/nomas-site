"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react"
import styles from "@/src/styles/scss/pages/static/PricingTable.module.scss";
import { SquareArrowRight } from "lucide-react";


interface Tier {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  url: string;
  highlight?: boolean; // mark recommended tier
}

const tiers: Tier[] = [
  {
    name: "Community",
    price: "FREE",
    description: "Your pass into our growing global community.",
    features: [
      "Weekly run clubs",
      "Padel Thursdays",
      "Coffee Raves on a Sunday",
      "Access to our WhatsApp community",
    ],
    cta: "Join Community",
    url: "https://chat.whatsapp.com/D2P5NDSEVU3AOo8elVLBlc?mode=ac_c",
  },
  {
    name: "Basic",
    price: "£15 / month",
    description: "Great for those who want a few extra perks.",
    features: [
      "Everything in our free community",
      "Discounts from our partners",
      "Access to an private basic members community chat",
      "Invites to Members Only events",
    ],
    cta: "Join Basic",
    url: "https://buy.stripe.com/8x27sKdtL5Gn6GLaMnak002",
  },
  {
    name: "Exclusive",
    price: "£49 / month",
    description: "Best for professionals looking to grow & connect.",
    features: [
      "Everything in Basic Members",
      "Premium discounts from our partners",
      "3x Fitness classes per week & Power & Revive",
      "Access to an exclusive community chat",
      "Invites to all Members Only events, trips & retreats",
    ],
    cta: "Join Exclusive",
    url: "https://buy.stripe.com/9B64gy3Tb6Kre9d2fRak000",
    highlight: true, // recommended
  },
];

const PricingTable: React.FC = () => {
  return (
    <div className={styles.pricingTable}>
      <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
        <div className={`${styles.pre} pre`}>Introducing</div>
        <h2 className={styles.heading}>The Nomas Exclusive experience</h2>
        <p className={styles.subheading}>Everyone is on a different journey, we’re here to help you thrive on yours.</p>
      </motion.div>
      <div className={styles.container}>
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`${styles.card} ${tier.highlight ? styles.highlight : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.15 }} // stagger each card
          >
            <h3 className={styles.name}>{tier.name}</h3>
            <p className={styles.price}>{tier.price}</p>
            <p className={styles.description}>{tier.description}</p>

            <ul className={styles.features}>
              {tier.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
              
            <Link href={tier.url}><button className={styles.cta}>{tier.cta}<SquareArrowRight size={25} strokeWidth={3} /></button></Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
