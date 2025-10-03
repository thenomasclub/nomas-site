"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react"
import { Users, Globe, Brain, Star, SquareArrowRight } from "lucide-react"; // swap icons as needed
import styles from "@/src/styles/scss/pages/membership/MembershipDetails.module.scss";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Users />,
    title: "Community Access",
    description: "Connect with like-minded professionals worldwide.",
  },
  {
    icon: <Globe />,
    title: "Global Events",
    description: "Exclusive invitations to sport events, retreats & travel trips.",
  },
  {
    icon: <Brain />,
    title: "Nomas Minds",
    description: "Workshops, masterclasses, and networking opportunities.",
  },
  {
    icon: <Star />,
    title: "Premium Perks",
    description: "Partner discounts, fitness classes and more.",
  },
];

export default function MembershipDetails() {
  return (
    <div className={styles.membershipDetails}>
      <div className={styles.grid}>
        {/* Left Side */}
        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
            <h2 className={styles.heading}>What&apos;s included in your Membership</h2>
            <p className={styles.subheading}>
              Unlock access to exclusive perks, global events, and a thriving community.
            </p>
            <Link href="https://buy.stripe.com/9B64gy3Tb6Kre9d2fRak000"><button className={styles.cta}>Become a member<SquareArrowRight size={25} strokeWidth={3} /></button></Link>
        </motion.div>
        {/* Right Side */}
        <div className={styles.col}>
          <div className={styles.featuresGrid}>
            {features.map((feature, i) => (
               <motion.div
                key={i}
                className={styles.feature}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.icon}>{feature.icon}</div>
                <h3 className={styles.title}>{feature.title}</h3>
                <p className={styles.description}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
