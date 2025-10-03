"use client"

import React from "react";
import Link from "next/link";
import { motion } from "motion/react"
import styles from "@/src/styles/scss/pages/static/Community.module.scss";
import { SquareArrowRight } from "lucide-react";

const Community: React.FC = () => {
    return (
        <div className={styles.community}>
            <div className={styles.grid}>
                <motion.div
                    className={styles.col}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h2 className={styles.heading}>Your passport to a global private network</h2>
                    <p className={styles.subheading}>We started this community in Bali but our ambition goes far beyond that.</p>
                    <p className={styles.subheading}>Our goal is to bring together ambitious people, no matter where you are in the world.</p>
                    <Link href="/membership">
                        <button className={styles.cta}>Become a member<SquareArrowRight size={25} strokeWidth={3} /></button>
                    </Link>
                </motion.div>
                <div className={styles.c40}>
                </div>
            </div>
        </div>
    );
}
export default Community;